package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

func (p *parser) parseAlter() (Statement, error) {
	p.advance() // consume ALTER
	if p.curKeyword("TABLE") {
		return p.parseAlterTable()
	}
	return nil, fmt.Errorf(
		"expected TABLE after ALTER at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterTable handles ALTER TABLE <name> <action>.
func (p *parser) parseAlterTable() (Statement, error) {
	if err := p.expectKeyword("TABLE"); err != nil {
		return nil, err
	}

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}

	action, err := p.parseAlterTableAction()
	if err != nil {
		return nil, err
	}

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	stmt := &AlterTableStmt{
		Name:   nameTok.Value,
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
	if p.curKeyword("RENAME") {
		return p.parseAlterRename()
	}
	return AlterTableAction{}, fmt.Errorf(
		"expected ADD, DROP, or RENAME at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseAlterAdd handles: ADD COLUMN <col_def> | ADD [CONSTRAINT ...] <constraint>
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

// parseAlterDrop handles: DROP COLUMN <name> | DROP CONSTRAINT <name>
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

// parseAlterRename handles: RENAME TO <new_name> | RENAME COLUMN <old> TO <new>
func (p *parser) parseAlterRename() (AlterTableAction, error) {
	p.advance() // consume RENAME

	if p.curKeyword("TO") {
		p.advance() // consume TO
		nameTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		action := AlterTableAction{
			Type:    AlterRenameTable,
			NewName: nameTok.Value,
		}
		return action, nil
	}

	if p.curKeyword("COLUMN") {
		p.advance() // consume COLUMN
		oldTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		if err := p.expectKeyword("TO"); err != nil {
			return AlterTableAction{}, err
		}
		newTok, err := p.expectIdent()
		if err != nil {
			return AlterTableAction{}, err
		}
		action := AlterTableAction{
			Type:       AlterRenameColumn,
			ColumnName: oldTok.Value,
			NewName:    newTok.Value,
		}
		return action, nil
	}

	return AlterTableAction{}, fmt.Errorf(
		"expected TO or COLUMN after RENAME at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
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
	default:
		return nil, fmt.Errorf(
			"expected TABLE, VIEW, or INDEX after DROP at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance() // consume TABLE/VIEW/INDEX

	stmt := &DropStmt{Type: objType}

	if p.curKeyword("IF") {
		p.advance() // consume IF
		if err := p.expectKeyword("EXISTS"); err != nil {
			return nil, err
		}
		stmt.IfExists = true
	}

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt.Name = nameTok.Value

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	return stmt, nil
}

// parseCreate dispatches on CREATE TABLE / CREATE [UNIQUE] INDEX.
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
	return p.parseCreateTable()
}

// parseCreateTable handles CREATE TABLE.
func (p *parser) parseCreateTable() (Statement, error) {
	if err := p.expectKeyword("TABLE"); err != nil {
		return nil, err
	}

	nameTok, err := p.expectIdent()
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

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	stmt := &CreateTableStmt{
		Name:        nameTok.Value,
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

	tableTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt.Table = tableTok.Value

	cols, err := p.parseIndexColumnList()
	if err != nil {
		return nil, err
	}
	stmt.Columns = cols

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	return stmt, nil
}

// parseIndexColumnList parses a parenthesised list of index columns with
// optional ASC/DESC direction per column.
func (p *parser) parseIndexColumnList() ([]IndexColumn, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var cols []IndexColumn
	for {
		tok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		col := IndexColumn{Name: tok.Value}
		if p.curKeyword("DESC") {
			p.advance() // consume DESC
			col.Direction = DirectionDesc
		} else if p.curKeyword("ASC") {
			p.advance() // consume ASC
			col.Direction = DirectionAsc
		}
		cols = append(cols, col)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}
	return cols, nil
}

// parseColumnList parses one or more comma-separated column definitions and
// optional table-level constraints. Columns and constraints may appear in any
// order in the source; the formatter normalises them to columns-then-constraints.
func (p *parser) parseColumnList() ([]ColumnDef, []TableConstraint, error) {
	var cols []ColumnDef
	var constraints []TableConstraint
	for {
		if p.curKeyword("PRIMARY") || p.curKeyword("UNIQUE") ||
			p.curKeyword("CHECK") || p.curKeyword("FOREIGN") ||
			p.curKeyword("CONSTRAINT") {
			tc, err := p.parseTableConstraint()
			if err != nil {
				return nil, nil, err
			}
			constraints = append(constraints, tc)
		} else {
			col, err := p.parseColumnDef()
			if err != nil {
				return nil, nil, err
			}
			cols = append(cols, col)
		}

		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return cols, constraints, nil
}

// parseTableConstraint parses a table-level constraint entry, with an
// optional leading CONSTRAINT <name> prefix.
func (p *parser) parseTableConstraint() (TableConstraint, error) {
	var tc TableConstraint

	if p.curKeyword("CONSTRAINT") {
		p.advance() // consume CONSTRAINT
		tok, err := p.expectIdent()
		if err != nil {
			return TableConstraint{}, err
		}
		tc.Name = tok.Value
	}

	if p.curKeyword("PRIMARY") && p.peekKeyword("KEY") {
		p.advance() // consume PRIMARY
		p.advance() // consume KEY
		cols, err := p.parseIdentList()
		if err != nil {
			return TableConstraint{}, err
		}
		tc.Type = ConstraintPrimaryKey
		tc.Columns = cols
		return tc, nil
	}

	if p.curKeyword("FOREIGN") && p.peekKeyword("KEY") {
		p.advance() // consume FOREIGN
		p.advance() // consume KEY
		localCols, err := p.parseIdentList()
		if err != nil {
			return TableConstraint{}, err
		}
		refTable, refCols, err := p.parseReferences()
		if err != nil {
			return TableConstraint{}, err
		}
		tc.Type = ConstraintForeignKey
		tc.Columns = localCols
		tc.RefTable = refTable
		tc.RefColumns = refCols
		return tc, nil
	}

	if p.curKeyword("UNIQUE") {
		p.advance() // consume UNIQUE
		cols, err := p.parseIdentList()
		if err != nil {
			return TableConstraint{}, err
		}
		tc.Type = ConstraintUnique
		tc.Columns = cols
		return tc, nil
	}

	if p.curKeyword("CHECK") {
		p.advance() // consume CHECK
		expr, err := p.parseCheckExpr()
		if err != nil {
			return TableConstraint{}, err
		}
		tc.Type = ConstraintCheck
		tc.Check = expr
		return tc, nil
	}

	return TableConstraint{}, fmt.Errorf(
		"expected table constraint at %d:%d, got %s %q",
		p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
	)
}

// parseCheckExpr parses the parenthesised body of a CHECK constraint and
// returns a normalised expression string (keywords lowercased, tokens
// space-joined, outer parens stripped). Nested parens are handled via a
// depth counter so expressions like CHECK (x IN (1, 2)) are captured whole.
func (p *parser) parseCheckExpr() (string, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return "", err
	}
	var parts []string
	depth := 1
	for {
		tok := p.cur
		if tok.Type == lexer.EOF {
			return "", fmt.Errorf("unterminated CHECK expression at %d:%d", tok.Line, tok.Column)
		}
		if tok.Type == lexer.RParen {
			depth--
			if depth == 0 {
				p.advance() // consume closing )
				break
			}
			parts = append(parts, ")")
		} else if tok.Type == lexer.LParen {
			depth++
			parts = append(parts, "(")
		} else {
			parts = append(parts, exprToken(tok))
		}
		p.advance()
	}
	return strings.Join(parts, " "), nil
}

// parseReferences parses: REFERENCES <table> [( <columns> )]
func (p *parser) parseReferences() (string, []string, error) {
	if err := p.expectKeyword("REFERENCES"); err != nil {
		return "", nil, err
	}
	tableTok, err := p.expectIdent()
	if err != nil {
		return "", nil, err
	}
	var columns []string
	if p.curIs(lexer.LParen) {
		columns, err = p.parseIdentList()
		if err != nil {
			return "", nil, err
		}
	}
	return tableTok.Value, columns, nil
}

// parseColumnDef parses a column definition: <name> <datatype> [constraints...].
func (p *parser) parseColumnDef() (ColumnDef, error) {
	nameTok, err := p.expectIdent()
	if err != nil {
		return ColumnDef{}, err
	}

	dataType, err := p.parseDataType()
	if err != nil {
		return ColumnDef{}, err
	}

	col := ColumnDef{
		Name:     nameTok.Value,
		DataType: dataType,
	}

	if p.curKeyword("PRIMARY") && p.peekKeyword("KEY") {
		p.advance() // consume PRIMARY
		p.advance() // consume KEY
		col.PrimaryKey = true
	}

	if p.curKeyword("CONSTRAINT") {
		p.advance() // consume CONSTRAINT
		nameTok, err := p.expectIdent()
		if err != nil {
			return ColumnDef{}, err
		}
		if !p.curKeyword("DEFAULT") {
			return ColumnDef{}, fmt.Errorf(
				"expected DEFAULT after column CONSTRAINT name at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		col.DefaultConstraint = nameTok.Value
	}

	if p.curKeyword("DEFAULT") {
		p.advance() // consume DEFAULT
		tok := p.cur
		switch tok.Type {
		case lexer.StringLit, lexer.IntLit, lexer.FloatLit, lexer.Keyword, lexer.Ident:
			col.Default = tok.Value
			p.advance()
		default:
			return ColumnDef{}, fmt.Errorf(
				"expected default value at %d:%d, got %s %q",
				tok.Line, tok.Column, tok.Type, tok.Value,
			)
		}
	}

	switch {
	case p.curKeyword("NOT") && p.peekKeyword("NULL"):
		p.advance() // consume NOT
		p.advance() // consume NULL
		col.Nullability = NullabilityNotNull
	case p.curKeyword("NULL"):
		p.advance() // consume NULL
		col.Nullability = NullabilityNull
	}

	// CONSTRAINT <name> DEFAULT may also follow nullability (canonical formatter output).
	if p.curKeyword("CONSTRAINT") {
		p.advance() // consume CONSTRAINT
		constrTok, err := p.expectIdent()
		if err != nil {
			return ColumnDef{}, err
		}
		if !p.curKeyword("DEFAULT") {
			return ColumnDef{}, fmt.Errorf(
				"expected DEFAULT after column CONSTRAINT name at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		col.DefaultConstraint = constrTok.Value
	}

	if p.curKeyword("DEFAULT") {
		p.advance() // consume DEFAULT
		tok := p.cur
		switch tok.Type {
		case lexer.StringLit, lexer.IntLit, lexer.FloatLit, lexer.Keyword, lexer.Ident:
			col.Default = tok.Value
			p.advance()
		default:
			return ColumnDef{}, fmt.Errorf(
				"expected default value at %d:%d, got %s %q",
				tok.Line, tok.Column, tok.Type, tok.Value,
			)
		}
	}

	if p.curKeyword("UNIQUE") {
		p.advance() // consume UNIQUE
		col.Unique = true
	}

	if p.curKeyword("CHECK") {
		p.advance() // consume CHECK
		col.Check, err = p.parseCheckExpr()
		if err != nil {
			return ColumnDef{}, err
		}
	}

	if p.curKeyword("REFERENCES") {
		refTable, refCols, err := p.parseReferences()
		if err != nil {
			return ColumnDef{}, err
		}
		col.References = &ColumnReference{Table: refTable, Columns: refCols}
	}

	return col, nil
}

// parseDataType reads a type name with an optional parameter list.
// Returns the uppercased name, e.g. "INTEGER", "VARCHAR(255)", "NUMERIC(10, 2)".
func (p *parser) parseDataType() (string, error) {
	tok := p.cur
	if tok.Type != lexer.Keyword && tok.Type != lexer.Ident {
		return "", fmt.Errorf(
			"expected data type at %d:%d, got %s %q",
			tok.Line, tok.Column, tok.Type, tok.Value,
		)
	}
	p.advance()
	name := strings.ToUpper(tok.Value)

	if !p.curIs(lexer.LParen) {
		return name, nil
	}
	p.advance() // consume (

	var params []string
	for {
		tok = p.cur
		if tok.Type != lexer.IntLit && tok.Type != lexer.FloatLit {
			return "", fmt.Errorf(
				"expected type parameter at %d:%d, got %s %q",
				tok.Line, tok.Column, tok.Type, tok.Value,
			)
		}
		params = append(params, tok.Value)
		p.advance()
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ,
	}

	if _, err := p.expect(lexer.RParen); err != nil {
		return "", err
	}
	return name + "(" + strings.Join(params, ", ") + ")", nil
}

// parseTruncate handles: TRUNCATE [TABLE] <name> [;]
func (p *parser) parseTruncate() (Statement, error) {
	p.advance() // consume TRUNCATE
	if p.curKeyword("TABLE") {
		p.advance() // consume optional TABLE
	}
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	if p.curIs(lexer.Semicolon) {
		p.advance()
	}
	stmt := &TruncateStmt{Name: nameTok.Value}
	return stmt, nil
}

// parseCreateView handles: CREATE VIEW <name> AS <select> [;]
func (p *parser) parseCreateView() (Statement, error) {
	p.advance() // consume VIEW

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}

	if err := p.expectKeyword("AS"); err != nil {
		return nil, err
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

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	stmt := &CreateViewStmt{Name: nameTok.Value, Select: sel}
	return stmt, nil
}

// parseInsert handles:
//
//	INSERT INTO <table> [(cols)] VALUES (...) [, (...)] [;]
//	INSERT INTO <table> [(cols)] SELECT ... [;]
func (p *parser) parseInsert() (Statement, error) {
	p.advance() // consume INSERT
	if err := p.expectKeyword("INTO"); err != nil {
		return nil, err
	}
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt := &InsertStmt{Table: nameTok.Value}

	// Optional column list: (col1, col2, ...)
	if p.curIs(lexer.LParen) {
		cols, err := p.parseIdentList()
		if err != nil {
			return nil, err
		}
		stmt.Columns = cols
	}

	if p.curKeyword("VALUES") {
		p.advance() // consume VALUES
		for {
			row, err := p.parseValueRow()
			if err != nil {
				return nil, err
			}
			stmt.Values = append(stmt.Values, row)
			if !p.curIs(lexer.Comma) {
				break
			}
			p.advance() // consume ',' between rows
		}
	} else if p.curKeyword("SELECT") {
		sel, err := p.parseSelectCore()
		if err != nil {
			return nil, err
		}
		stmt.Select = sel
	} else {
		return nil, fmt.Errorf(
			"expected VALUES or SELECT after INSERT INTO %s at %d:%d",
			stmt.Table, p.cur.Line, p.cur.Column,
		)
	}

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}
	return stmt, nil
}

// parseValueRow parses one parenthesised list of value expressions: (expr, expr, ...)
func (p *parser) parseValueRow() ([]string, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var exprs []string
	for {
		expr, err := p.parseExprRaw(func() bool {
			return p.curIs(lexer.Comma) || p.curIs(lexer.RParen)
		})
		if err != nil {
			return nil, err
		}
		exprs = append(exprs, expr)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ',' between expressions
	}
	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}
	return exprs, nil
}

// parseUpdate handles:
//
//	ANSI:       UPDATE <table> SET <col=expr> [, ...] [WHERE <predicate>] [;]
//	SQL Server: UPDATE <alias> SET <col=expr> [, ...] FROM <table> [AS <alias>] [JOINs] [WHERE <predicate>] [;]
func (p *parser) parseUpdate() (Statement, error) {
	p.advance() // consume UPDATE

	targetTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt := &UpdateStmt{Target: targetTok.Value}

	sets, err := p.parseSetClause()
	if err != nil {
		return nil, err
	}
	stmt.Sets = sets

	if p.curKeyword("FROM") {
		from, err := p.parseUpdateFrom()
		if err != nil {
			return nil, err
		}
		stmt.From = from
	}

	if p.curKeyword("WHERE") {
		p.advance()
		where, err := p.parseExprRaw(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
		if err != nil {
			return nil, err
		}
		stmt.Where = where
	}

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}
	return stmt, nil
}

// parseUpdateFrom parses: FROM <table> [AS <alias>] [JOINs]
func (p *parser) parseUpdateFrom() (*UpdateFromSource, error) {
	p.advance() // consume FROM

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	from := &UpdateFromSource{Name: nameTok.Value}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		from.Alias = aliasTok.Value
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		// implicit alias — Keyword tokens (WHERE, JOIN, etc.) are excluded by type
		from.Alias = p.cur.Value
		p.advance()
	}

	if p.isNextJoin() {
		joins, err := p.parseJoinClauses()
		if err != nil {
			return nil, err
		}
		from.Joins = joins
	}

	return from, nil
}

// parseSetClause parses: SET col = expr [, col = expr ...]
// Column names may be qualified (e.g. t.col); the LHS is parsed with explicit
// dot-checking rather than parseExprRaw because UPDATE SET always assigns to a
// simple or qualified column name, never a computed expression.
func (p *parser) parseSetClause() ([]UpdateSet, error) {
	if err := p.expectKeyword("SET"); err != nil {
		return nil, err
	}
	var sets []UpdateSet
	for {
		colTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		colName := colTok.Value
		if p.curIs(lexer.Dot) {
			p.advance() // consume '.'
			fieldTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			colName = colName + "." + fieldTok.Value
		}

		if _, err := p.expect(lexer.Eq); err != nil {
			return nil, err
		}

		expr, err := p.parseExprRaw(func() bool {
			return p.curIs(lexer.Comma) ||
				p.curKeyword("WHERE") ||
				p.curKeyword("FROM") ||
				p.curIs(lexer.Semicolon) ||
				p.curIs(lexer.EOF)
		})
		if err != nil {
			return nil, err
		}
		sets = append(sets, UpdateSet{Column: colName, Expr: expr})

		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ',' between assignments
	}
	return sets, nil
}

// parseDelete handles:
//
//	DELETE FROM <table> [AS <alias>] [WHERE <predicate>] [;]
//	DELETE <alias> FROM <table> AS <alias> [WHERE <predicate>] [;]
//
// The second form is the SQL Server style where the target alias appears
// before FROM as well as in the AS clause after the table name.
func (p *parser) parseDelete() (Statement, error) {
	p.advance() // consume DELETE

	// Optional pre-FROM alias (SQL Server style: DELETE alias FROM ...).
	// We detect it by checking whether the current token is an identifier
	// immediately followed by the FROM keyword.
	if (p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent)) && p.peekKeyword("FROM") {
		p.advance() // consume alias — the AS clause after the table is authoritative
	}

	if err := p.expectKeyword("FROM"); err != nil {
		return nil, err
	}

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}

	stmt := &DeleteStmt{Table: nameTok.Value}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		stmt.Alias = aliasTok.Value
		stmt.AliasExplicit = true
	} else if (p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent)) && !p.curKeyword("WHERE") {
		stmt.Alias = p.cur.Value
		p.advance()
	}

	if p.curKeyword("WHERE") {
		p.advance()
		where, err := p.parseExprRaw(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
		if err != nil {
			return nil, err
		}
		stmt.Where = where
	}

	if p.curIs(lexer.Semicolon) {
		p.advance()
	}

	return stmt, nil
}
