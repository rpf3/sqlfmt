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
	if p.curKeyword("INDEX") {
		return p.parseAlterIndex()
	}
	if p.curKeyword("TRIGGER") {
		raw, err := p.parseCreateTrigger()
		if err != nil {
			return nil, err
		}
		raw.(*CreateTriggerStmt).IsAlter = true
		return raw, nil
	}
	return nil, fmt.Errorf(
		"expected TABLE, INDEX, PROCEDURE, FUNCTION, VIEW, or TRIGGER after ALTER at %d:%d, got %s %q",
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
	if p.curKeyword("ENABLE") {
		return p.parseAlterConstraintControl(AlterEnableConstraint)
	}
	if p.curKeyword("DISABLE") {
		return p.parseAlterConstraintControl(AlterDisableConstraint)
	}
	if p.curKeyword("CHECK") {
		return p.parseAlterConstraintControl(AlterCheckConstraint)
	}
	if p.curKeyword("NOCHECK") {
		return p.parseAlterConstraintControl(AlterNocheckConstraint)
	}
	return AlterTableAction{}, fmt.Errorf(
		"expected ADD, DROP, ALTER, ENABLE, DISABLE, CHECK, or NOCHECK at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterConstraintControl handles ENABLE|DISABLE|CHECK|NOCHECK CONSTRAINT <name|ALL>.
func (p *parser) parseAlterConstraintControl(at AlterTableActionType) (AlterTableAction, error) {
	p.advance() // consume ENABLE/DISABLE/CHECK/NOCHECK
	if err := p.expectKeyword("CONSTRAINT"); err != nil {
		return AlterTableAction{}, err
	}
	var name string
	if p.curKeyword("ALL") {
		name = "all"
		p.advance()
	} else {
		nameTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		name = nameTok.Value
	}
	return AlterTableAction{Type: at, ConstraintName: name}, nil
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

// parseAlterAlter handles: ALTER COLUMN <name> <datatype> [COLLATE <name>] [NULL|NOT NULL].
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
	collate, err := p.parseCollate()
	if err != nil {
		return AlterTableAction{}, err
	}
	col := ColumnDef{
		Name:        nameTok.Value,
		DataType:    dataType,
		Collate:     collate,
		Nullability: p.parseColNullability(),
	}
	action := AlterTableAction{
		Type:   AlterAlterColumn,
		Column: &col,
	}
	return action, nil
}

// parseAlterIndex handles ALTER INDEX <name>|ALL ON <table> REBUILD|REORGANIZE|DISABLE [WITH (...)].
func (p *parser) parseAlterIndex() (Statement, error) {
	p.advance() // consume INDEX
	stmt := &AlterIndexStmt{}
	if p.curKeyword("ALL") {
		stmt.All = true
		p.advance() // consume ALL
	} else {
		name, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		stmt.Name = name
	}
	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}
	table, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt.Table = table
	switch {
	case p.curKeyword("REBUILD"):
		p.advance()
		stmt.Action = AlterIndexRebuild
	case p.curKeyword("REORGANIZE"):
		p.advance()
		stmt.Action = AlterIndexReorganize
	case p.curKeyword("DISABLE"):
		p.advance()
		stmt.Action = AlterIndexDisable
	default:
		return nil, fmt.Errorf(
			"expected REBUILD, REORGANIZE, or DISABLE at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	if p.curKeyword("WITH") {
		p.advance() // consume WITH
		opts, err := p.parseParenRaw()
		if err != nil {
			return nil, err
		}
		stmt.WithOptions = opts
	}
	p.consumeSemicolon()
	return stmt, nil
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
	case p.curKeyword("TRIGGER"):
		objType = DropTrigger
	default:
		return nil, fmt.Errorf(
			"expected TABLE, VIEW, INDEX, PROCEDURE, FUNCTION, or TRIGGER after DROP at %d:%d, got %s %q",
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

	if p.curKeyword("UNIQUE") {
		p.advance() // consume UNIQUE
		return p.parseCreateIndex(true)
	}
	if p.curKeyword("INDEX") || p.curValue("CLUSTERED") || p.curValue("NONCLUSTERED") {
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
	if p.curKeyword("TRIGGER") {
		return p.parseCreateTrigger()
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
	// Optional CLUSTERED / NONCLUSTERED before INDEX keyword.
	var clustering IndexClustering
	if p.curValue("CLUSTERED") {
		clustering = IndexClusteringClustered
		p.advance()
	} else if p.curValue("NONCLUSTERED") {
		clustering = IndexClusteringNonclustered
		p.advance()
	}

	if err := p.expectKeyword("INDEX"); err != nil {
		return nil, err
	}

	stmt := &CreateIndexStmt{Unique: unique, Clustering: clustering}

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

	// INCLUDE clause for covering indexes.
	if p.curValue("INCLUDE") {
		p.advance() // consume INCLUDE
		if _, err := p.expect(lexer.LParen); err != nil {
			return nil, err
		}
		var includeCols []string
		for !p.curIs(lexer.RParen) && p.cur.Type != lexer.EOF {
			nameTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			includeCols = append(includeCols, nameTok.Value)
			if p.curIs(lexer.Comma) {
				p.advance()
			}
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, err
		}
		stmt.Include = includeCols
	}

	// WHERE clause for filtered indexes.
	if p.curKeyword("WHERE") {
		p.advance() // consume WHERE
		var tokBuf []lexer.Token
		for !p.curKeyword("WITH") && !p.curIs(lexer.Semicolon) && p.cur.Type != lexer.EOF {
			tokBuf = append(tokBuf, p.cur)
			p.advance()
		}
		stmt.Where = joinBodyTokens(tokBuf)
	}

	// WITH options (index rebuild/creation options).
	if p.curKeyword("WITH") {
		p.advance() // consume WITH
		raw, err := p.parseParenRaw()
		if err != nil {
			return nil, err
		}
		stmt.WithOptions = raw
	}

	p.consumeSemicolon()

	return stmt, nil
}

// parseTruncate handles: TRUNCATE [TABLE] <name> [WITH (PARTITIONS (...))] [;].
func (p *parser) parseTruncate() (Statement, error) {
	p.advance() // consume TRUNCATE
	if p.curKeyword("TABLE") {
		p.advance() // consume optional TABLE
	}
	name, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &TruncateStmt{Name: name}
	if p.curKeyword("WITH") {
		p.advance() // consume WITH
		raw, err := p.parseParenRaw()
		if err != nil {
			return nil, err
		}
		stmt.Partitions = raw
	}
	p.consumeSemicolon()
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

// parseCreateTrigger handles CREATE TRIGGER and (via IsAlter) ALTER TRIGGER.
// On entry p.cur is TRIGGER.
func (p *parser) parseCreateTrigger() (Statement, error) {
	p.advance() // consume TRIGGER

	name, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}
	table, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	var timing TriggerTiming
	switch {
	case p.curKeyword("AFTER") || p.curKeyword("FOR"):
		timing = TriggerTimingAfter
		p.advance() // consume AFTER/FOR
	case p.curKeyword("INSTEAD"):
		timing = TriggerTimingInstead
		p.advance() // consume INSTEAD
		// consume OF (not a keyword; parsed as ident or keyword)
		if !p.curValue("OF") {
			return nil, fmt.Errorf(
				"expected OF after INSTEAD at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume OF
	default:
		return nil, fmt.Errorf(
			"expected AFTER, FOR, or INSTEAD OF after trigger table at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}

	var events []TriggerEvent
	for {
		switch {
		case p.curValue("INSERT"):
			events = append(events, TriggerEventInsert)
		case p.curValue("UPDATE"):
			events = append(events, TriggerEventUpdate)
		case p.curValue("DELETE"):
			events = append(events, TriggerEventDelete)
		default:
			return nil, fmt.Errorf(
				"expected INSERT, UPDATE, or DELETE in trigger event list at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance()
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}

	if err := p.expectKeyword("AS"); err != nil {
		return nil, err
	}

	body, hasBeginEnd, err := p.parseProcBody()
	if err != nil {
		return nil, err
	}

	p.consumeSemicolon()

	return &CreateTriggerStmt{
		Name:        name,
		Table:       table,
		Timing:      timing,
		Events:      events,
		Body:        body,
		HasBeginEnd: hasBeginEnd,
	}, nil
}

// parseTriggerToggle handles ENABLE TRIGGER and DISABLE TRIGGER.
// On entry p.cur is ENABLE or DISABLE.
func (p *parser) parseTriggerToggle() (Statement, error) {
	enable := p.curKeyword("ENABLE")
	p.advance() // consume ENABLE/DISABLE

	if err := p.expectKeyword("TRIGGER"); err != nil {
		return nil, err
	}

	var name string
	if p.curKeyword("ALL") {
		name = "all"
		p.advance()
	} else {
		n, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		name = n
	}

	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}

	var scope string
	if p.curKeyword("DATABASE") {
		scope = "database"
		p.advance()
	} else {
		s, err := p.parseQualifiedName()
		if err != nil {
			return nil, err
		}
		scope = s
	}

	p.consumeSemicolon()
	return &TriggerToggleStmt{Enable: enable, Name: name, Scope: scope}, nil
}
