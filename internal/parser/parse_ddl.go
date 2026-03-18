package parser

import (
	"fmt"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

func (p *parser) parseAlter() (Statement, error) {
	p.advance() // consume ALTER
	if p.curKeyword("TABLE") {
		return p.parseAlterTable()
	}
	if p.curValue("PROCEDURE") || p.curValue("PROC") {
		raw, err := p.parseCreateProc()
		if err != nil {
			return nil, err
		}
		raw.(*CreateProcStmt).IsAlter = true
		return raw, nil
	}
	if p.curValue("FUNCTION") {
		raw, err := p.parseCreateFunc()
		if err != nil {
			return nil, err
		}
		raw.(*CreateFuncStmt).IsAlter = true
		return raw, nil
	}
	if p.curKeyword("VIEW") {
		raw, err := p.parseCreateView()
		if err != nil {
			return nil, err
		}
		raw.(*CreateViewStmt).IsAlter = true
		return raw, nil
	}
	return nil, fmt.Errorf(
		"expected TABLE, PROCEDURE, FUNCTION, or VIEW after ALTER at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterTable handles ALTER TABLE <name> <action>.
func (p *parser) parseAlterTable() (Statement, error) {
	if err := p.expectKeyword("TABLE"); err != nil {
		return nil, err
	}

	name, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	action, err := p.parseAlterTableAction()
	if err != nil {
		return nil, err
	}

	p.consumeSemicolon()

	stmt := &AlterTableStmt{
		Name:   name,
		Action: action,
	}
	return stmt, nil
}

// parseAlterTableAction reads the action keyword and delegates accordingly.
func (p *parser) parseAlterTableAction() (AlterTableAction, error) {
	if p.curKeyword("ADD") {
		return p.parseAlterAdd()
	}
	if p.curKeyword("DROP") {
		return p.parseAlterDrop()
	}
	if p.curKeyword("ALTER") {
		return p.parseAlterAlter()
	}
	return AlterTableAction{}, fmt.Errorf(
		"expected ADD, DROP, or ALTER at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterAdd handles: ADD COLUMN <col_def> | ADD [CONSTRAINT ...] <constraint>.
func (p *parser) parseAlterAdd() (AlterTableAction, error) {
	p.advance() // consume ADD

	if p.curKeyword("COLUMN") {
		p.advance() // consume COLUMN
		col, err := p.parseColumnDef()
		if err != nil {
			return AlterTableAction{}, err
		}
		action := AlterTableAction{
			Type:   AlterAddColumn,
			Column: &col,
		}
		return action, nil
	}

	// ADD [CONSTRAINT <name>] PRIMARY KEY | FOREIGN KEY | UNIQUE | CHECK
	tc, err := p.parseTableConstraint()
	if err != nil {
		return AlterTableAction{}, err
	}
	action := AlterTableAction{
		Type:       AlterAddConstraint,
		Constraint: &tc,
	}
	return action, nil
}

// parseAlterDrop handles: DROP COLUMN <name> | DROP CONSTRAINT <name>.
func (p *parser) parseAlterDrop() (AlterTableAction, error) {
	p.advance() // consume DROP

	if p.curKeyword("COLUMN") {
		p.advance() // consume COLUMN
		nameTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		action := AlterTableAction{
			Type:       AlterDropColumn,
			ColumnName: nameTok.Value,
		}
		return action, nil
	}

	if p.curKeyword("CONSTRAINT") {
		p.advance() // consume CONSTRAINT
		nameTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		action := AlterTableAction{
			Type:           AlterDropConstraint,
			ConstraintName: nameTok.Value,
		}
		return action, nil
	}

	return AlterTableAction{}, fmt.Errorf(
		"expected COLUMN or CONSTRAINT after DROP at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterAlter handles: ALTER COLUMN <name> <datatype> [NULL|NOT NULL].
func (p *parser) parseAlterAlter() (AlterTableAction, error) {
	p.advance() // consume ALTER
	if err := p.expectKeyword("COLUMN"); err != nil {
		return AlterTableAction{}, err
	}
	nameTok, err := p.expectIdent()
	if err != nil {
		return AlterTableAction{}, err
	}
	dataType, err := p.parseDataType()
	if err != nil {
		return AlterTableAction{}, err
	}
	col := ColumnDef{
		Name:        nameTok.Value,
		DataType:    dataType,
		Nullability: p.parseColNullability(),
	}
	action := AlterTableAction{
		Type:   AlterAlterColumn,
		Column: &col,
	}
	return action, nil
}

// parseDrop handles DROP TABLE, DROP VIEW, and DROP INDEX.
func (p *parser) parseDrop() (Statement, error) {
	p.advance() // consume DROP

	var objType DropObjectType
	switch {
	case p.curKeyword("TABLE"):
		objType = DropTable
	case p.curKeyword("VIEW"):
		objType = DropView
	case p.curKeyword("INDEX"):
		objType = DropIndex
	case p.curValue("PROCEDURE") || p.curValue("PROC"):
		objType = DropProcedure
	case p.curValue("FUNCTION"):
		objType = DropFunction
	default:
		return nil, fmt.Errorf(
			"expected TABLE, VIEW, INDEX, PROCEDURE, or FUNCTION after DROP at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance() // consume TABLE/VIEW/INDEX/PROCEDURE/FUNCTION

	stmt := &DropStmt{Type: objType}

	if p.curKeyword("IF") {
		p.advance() // consume IF
		if err := p.expectKeyword("EXISTS"); err != nil {
			return nil, err
		}
		stmt.IfExists = true
	}

	name, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt.Name = name

	p.consumeSemicolon()

	return stmt, nil
}

// parseCreate dispatches CREATE statements by the keyword following CREATE.
func (p *parser) parseCreate() (Statement, error) {
	p.advance() // consume CREATE

	if p.curKeyword("UNIQUE") && p.peekKeyword("INDEX") {
		p.advance() // consume UNIQUE
		return p.parseCreateIndex(true)
	}
	if p.curKeyword("INDEX") {
		return p.parseCreateIndex(false)
	}
	if p.curKeyword("VIEW") {
		return p.parseCreateView()
	}
	if p.curValue("TYPE") {
		return p.parseCreateType()
	}
	if p.curKeyword("SCHEMA") {
		return p.parseCreateSchema()
	}
	if p.curValue("PROCEDURE") || p.curValue("PROC") {
		return p.parseCreateProc()
	}
	if p.curValue("FUNCTION") {
		return p.parseCreateFunc()
	}
	return p.parseCreateTable()
}

// parseCreateSchema handles: CREATE SCHEMA <name> [AUTHORIZATION <owner>] [;].
func (p *parser) parseCreateSchema() (Statement, error) {
	p.advance() // consume SCHEMA

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}

	stmt := &CreateSchemaStmt{Name: nameTok.Value}

	if p.curKeyword("AUTHORIZATION") {
		p.advance() // consume AUTHORIZATION
		ownerTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		stmt.Authorization = ownerTok.Value
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseCreateTable handles CREATE TABLE.
func (p *parser) parseCreateTable() (Statement, error) {
	if err := p.expectKeyword("TABLE"); err != nil {
		return nil, err
	}

	createTableName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}

	cols, constraints, err := p.parseColumnList()
	if err != nil {
		return nil, err
	}

	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}

	p.consumeSemicolon()

	stmt := &CreateTableStmt{
		Name:        createTableName,
		Columns:     cols,
		Constraints: constraints,
	}
	return stmt, nil
}

// parseCreateIndex handles CREATE [UNIQUE] INDEX [IF NOT EXISTS] <name> ON <table> (<cols>).
func (p *parser) parseCreateIndex(unique bool) (Statement, error) {
	if err := p.expectKeyword("INDEX"); err != nil {
		return nil, err
	}

	stmt := &CreateIndexStmt{Unique: unique}

	if p.curKeyword("IF") {
		p.advance() // consume IF
		if err := p.expectKeyword("NOT"); err != nil {
			return nil, err
		}
		if err := p.expectKeyword("EXISTS"); err != nil {
			return nil, err
		}
		stmt.IfNotExists = true
	}

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt.Name = nameTok.Value

	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}

	indexTable, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt.Table = indexTable

	cols, err := p.parseIndexColumnList()
	if err != nil {
		return nil, err
	}
	stmt.Columns = cols

	p.consumeSemicolon()

	return stmt, nil
}

// parseTruncate handles: TRUNCATE [TABLE] <name> [;].
func (p *parser) parseTruncate() (Statement, error) {
	p.advance() // consume TRUNCATE
	if p.curKeyword("TABLE") {
		p.advance() // consume optional TABLE
	}
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	stmt := &TruncateStmt{Name: nameTok.Value}
	return stmt, nil
}

// parseCreateView handles: CREATE VIEW <name> AS <select> [;].
func (p *parser) parseCreateView() (Statement, error) {
	p.advance() // consume VIEW

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}

	if err := p.expectKeyword("AS"); err != nil {
		return nil, err
	}

	var ctes []CTEDef
	if p.curKeyword("WITH") {
		var err error
		ctes, _, err = p.parseCTEDefs()
		if err != nil {
			return nil, err
		}
	}

	if !p.curKeyword("SELECT") {
		return nil, fmt.Errorf(
			"expected SELECT after CREATE VIEW ... AS at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}

	sel, err := p.parseSelectCore()
	if err != nil {
		return nil, err
	}
	sel.CTEs = ctes

	p.consumeSemicolon()

	stmt := &CreateViewStmt{Name: nameTok.Value, Select: sel}
	return stmt, nil
}
