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

	p.consumeSemicolon()

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

	p.consumeSemicolon()

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
	if p.curValue("TYPE") {
		return p.parseCreateType()
	}
	if p.curValue("PROCEDURE") || p.curValue("PROC") {
		return p.parseCreateProc()
	}
	if p.curValue("FUNCTION") {
		return p.parseCreateFunc()
	}
	return p.parseCreateTable()
}

// parseCreateType handles:
//
//	CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL]         -- alias type
//	CREATE TYPE <name> AS TABLE (<col_defs> [, <constraints>])  -- table type
func (p *parser) parseCreateType() (Statement, error) {
	p.advance() // consume TYPE

	typeName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	stmt := &CreateTypeStmt{Name: typeName}

	if p.curKeyword("FROM") {
		// alias type: CREATE TYPE <name> FROM <base_type> [NULL|NOT NULL]
		p.advance() // consume FROM
		baseType, err := p.parseDataType()
		if err != nil {
			return nil, err
		}
		stmt.Kind = CreateTypeAlias
		stmt.BaseType = baseType
		switch {
		case p.curKeyword("NOT"):
			p.advance() // consume NOT
			if err := p.expectKeyword("NULL"); err != nil {
				return nil, err
			}
			stmt.Nullability = NullabilityNotNull
		case p.curKeyword("NULL"):
			p.advance() // consume NULL
			stmt.Nullability = NullabilityNull
		}
	} else if p.curKeyword("AS") {
		// table type: CREATE TYPE <name> AS TABLE (...)
		p.advance() // consume AS
		if !p.curKeyword("TABLE") {
			return nil, fmt.Errorf(
				"expected TABLE after AS in CREATE TYPE at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume TABLE
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
		stmt.Kind = CreateTypeTable
		stmt.Columns = cols
		stmt.Constraints = constraints
	} else {
		return nil, fmt.Errorf(
			"expected FROM or AS after type name in CREATE TYPE at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseCreateProc handles:
//
//	CREATE PROCEDURE <name> [@param datatype [= default] [OUTPUT]] [, ...] AS BEGIN <body> END
//	CREATE PROC is accepted as an alias for CREATE PROCEDURE.
func (p *parser) parseCreateProc() (Statement, error) {
	p.advance() // consume PROCEDURE or PROC

	procName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	stmt := &CreateProcStmt{Name: procName}

	params, err := p.parseProcParams()
	if err != nil {
		return nil, err
	}
	stmt.Params = params

	// AS keyword before BEGIN
	if p.curKeyword("AS") {
		p.advance() // consume AS
	}

	body, hasBeginEnd, err := p.parseProcBody()
	if err != nil {
		return nil, err
	}
	stmt.Body = body
	stmt.HasBeginEnd = hasBeginEnd

	p.consumeSemicolon()
	return stmt, nil
}

// parseProcParams reads the optional parameter list for a CREATE PROCEDURE statement.
// Parameters may appear with or without surrounding parentheses.
// Each parameter is: @name datatype [= default] [OUTPUT|OUT]
// Returns nil (no error) when no parameters are present.
func (p *parser) parseProcParams() ([]ProcParam, error) {
	// Parenthesised form: (...)
	hasParen := p.curIs(lexer.LParen)
	if hasParen {
		p.advance() // consume (
	}

	var params []ProcParam
	for {
		// Bail out if we've reached AS, BEGIN, ), or EOF.
		if p.curKeyword("AS") || p.curKeyword("BEGIN") ||
			p.curIs(lexer.RParen) || p.cur.Type == lexer.EOF {
			break
		}

		// Expect a @param name.
		nameTok := p.cur
		if nameTok.Type != lexer.Ident {
			return nil, fmt.Errorf(
				"expected parameter name at %d:%d, got %s %q",
				nameTok.Line, nameTok.Column, nameTok.Type, nameTok.Value,
			)
		}
		p.advance() // consume @name

		dataType, err := p.parseDataType()
		if err != nil {
			return nil, err
		}

		param := ProcParam{Name: nameTok.Value, DataType: dataType}

		// Optional default: = <expr>
		if p.curIs(lexer.Eq) {
			p.advance() // consume =
			param.Default = p.parseExpr(func() bool {
				return p.cur.Type == lexer.Comma ||
					p.cur.Type == lexer.RParen ||
					p.curKeyword("AS") ||
					p.curKeyword("BEGIN") ||
					p.curValue("OUTPUT") ||
					p.curValue("OUT") ||
					p.curValue("READONLY")
			})
		}

		// Optional direction: OUTPUT or OUT
		if p.curValue("OUTPUT") || p.curValue("OUT") {
			param.Direction = ParamDirectionOut
			p.advance()
		}
		// Optional READONLY (input-only hint; treated as input direction)
		if p.curValue("READONLY") {
			p.advance()
		}

		params = append(params, param)

		if p.curIs(lexer.Comma) {
			p.advance() // consume , between params
		} else {
			break
		}
	}
	// Consume the closing ) when the param list was parenthesised.
	if hasParen && p.curIs(lexer.RParen) {
		p.advance()
	}
	return params, nil
}

// parseProcBody reads the body of a procedure or scalar/multi-table function.
// BEGIN...END is optional: if present, hasBeginEnd is true and the body may
// contain multiple statements; if absent, a single statement up to the first
// semicolon (or EOF) is collected and hasBeginEnd is false.
// On entry: p.cur should be BEGIN or the first token of the body statement.
// On exit: p.cur is positioned after the closing END (or the closing semicolon).
func (p *parser) parseProcBody() (stmts []Statement, hasBeginEnd bool, err error) {
	appendStmt := func(buf []lexer.Token) {
		if len(buf) == 0 {
			return
		}
		raw := joinBodyTokens(buf)
		result := Parse(raw + ";")
		if len(result.Errors) == 0 && len(result.Statements) == 1 {
			stmts = append(stmts, result.Statements[0])
		} else {
			stmts = append(stmts, &RawStmt{Text: raw})
		}
	}

	if !p.curKeyword("BEGIN") {
		// No BEGIN/END: collect a single statement until ; or EOF.
		var tokBuf []lexer.Token
		for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
			tokBuf = append(tokBuf, p.cur)
			p.advance()
		}
		appendStmt(tokBuf)
		return stmts, false, nil
	}

	hasBeginEnd = true
	p.advance() // consume BEGIN

	var tokBuf []lexer.Token
	depth := 0 // depth inside proc body: incremented by nested BEGIN, decremented by END

	for p.cur.Type != lexer.EOF {
		// Closing END of the procedure body.
		if p.curKeyword("END") && depth == 0 {
			appendStmt(tokBuf)
			p.advance() // consume END
			break
		}

		if p.curKeyword("BEGIN") {
			depth++
		} else if p.curKeyword("END") {
			depth--
		}

		// Statement boundary: semicolon at depth 0.
		if p.curIs(lexer.Semicolon) && depth == 0 {
			appendStmt(tokBuf)
			tokBuf = nil
			p.advance() // consume ;
			continue
		}

		tokBuf = append(tokBuf, p.cur)
		p.advance()
	}

	return stmts, hasBeginEnd, nil
}

// joinBodyTokens joins a slice of tokens into a whitespace-normalised string,
// lowercasing keywords and applying SQL spacing conventions.
func joinBodyTokens(tokens []lexer.Token) string {
	var b strings.Builder
	var prevType lexer.TokenType
	for i, tok := range tokens {
		if i > 0 && needsSelectSpace(prevType, tok.Type) {
			b.WriteByte(' ')
		}
		b.WriteString(exprToken(tok))
		prevType = tok.Type
	}
	return strings.TrimSpace(b.String())
}

// parseCreateFunc handles:
//
//	CREATE FUNCTION <name> (<params>) RETURNS <type> AS BEGIN <body> END        -- scalar
//	CREATE FUNCTION <name> (<params>) RETURNS TABLE AS RETURN (<select>)        -- inline TVF
//	CREATE FUNCTION <name> (<params>) RETURNS @var TABLE (<cols>) AS BEGIN END  -- multi-statement TVF
func (p *parser) parseCreateFunc() (Statement, error) {
	p.advance() // consume FUNCTION

	funcName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	stmt := &CreateFuncStmt{Name: funcName}

	params, err := p.parseProcParams()
	if err != nil {
		return nil, err
	}
	stmt.Params = params

	// RETURNS clause
	if !p.curValue("RETURNS") {
		return nil, fmt.Errorf(
			"expected RETURNS in CREATE FUNCTION at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance() // consume RETURNS

	switch {
	case p.curKeyword("TABLE"):
		// Inline TVF: RETURNS TABLE
		stmt.Kind = CreateFuncInlineTable
		stmt.ReturnsType = "TABLE"
		p.advance() // consume TABLE

	case p.cur.Type == lexer.Ident && peekIsTableKeyword(p):
		// Multi-statement TVF: RETURNS @var TABLE (col_defs)
		stmt.Kind = CreateFuncMultiTable
		stmt.ReturnsVar = p.cur.Value
		p.advance() // consume @var
		p.advance() // consume TABLE
		if _, err := p.expect(lexer.LParen); err != nil {
			return nil, err
		}
		cols, _, err := p.parseColumnList()
		if err != nil {
			return nil, err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, err
		}
		stmt.ReturnsTable = cols

	default:
		// Scalar: RETURNS <data_type>
		stmt.Kind = CreateFuncScalar
		dataType, err := p.parseDataType()
		if err != nil {
			return nil, err
		}
		stmt.ReturnsType = dataType
	}

	// AS keyword
	if p.curKeyword("AS") {
		p.advance() // consume AS
	}

	switch stmt.Kind {
	case CreateFuncInlineTable:
		// AS RETURN (SELECT ...)
		if !p.curValue("RETURN") {
			return nil, fmt.Errorf(
				"expected RETURN after AS in inline TVF at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume RETURN
		if _, err := p.expect(lexer.LParen); err != nil {
			return nil, err
		}
		sel, err := p.parseSelectCore()
		if err != nil {
			return nil, err
		}
		stmt.InlineSelect = sel
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, err
		}

	default:
		// Scalar and multi-statement TVF: AS BEGIN...END
		body, hasBeginEnd, err := p.parseProcBody()
		if err != nil {
			return nil, err
		}
		stmt.Body = body
		stmt.HasBeginEnd = hasBeginEnd
	}

	p.consumeSemicolon()
	return stmt, nil
}

// peekIsTableKeyword reports whether the peek token is the TABLE keyword.
// Used to disambiguate RETURNS @var TABLE (...) from RETURNS <scalar_type>.
func peekIsTableKeyword(p *parser) bool {
	return p.peek.Type == lexer.Keyword && strings.EqualFold(p.peek.Value, "TABLE")
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
// returns a RawExpr containing the normalised expression text (keywords
// lowercased, tokens space-joined, outer parens stripped). Nested parens are
// handled via a depth counter so expressions like CHECK (x IN (1, 2)) are
// captured whole.
func (p *parser) parseCheckExpr() (Expr, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var parts []string
	depth := 1
	for {
		tok := p.cur
		if tok.Type == lexer.EOF {
			return nil, fmt.Errorf("unterminated CHECK expression at %d:%d", tok.Line, tok.Column)
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
	return &RawExpr{Text: strings.Join(parts, " ")}, nil
}

// parseReferences parses: REFERENCES <table> [( <columns> )]
func (p *parser) parseReferences() (string, []string, error) {
	if err := p.expectKeyword("REFERENCES"); err != nil {
		return "", nil, err
	}
	refTable, err := p.parseQualifiedName()
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
	return refTable, columns, nil
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
			col.Default = &RawExpr{Text: tok.Value}
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
			col.Default = &RawExpr{Text: tok.Value}
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
		switch tok.Type {
		case lexer.IntLit, lexer.FloatLit:
			params = append(params, tok.Value)
		case lexer.Ident, lexer.Keyword:
			params = append(params, strings.ToUpper(tok.Value))
		default:
			return "", fmt.Errorf(
				"expected type parameter at %d:%d, got %s %q",
				tok.Line, tok.Column, tok.Type, tok.Value,
			)
		}
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
	p.consumeSemicolon()
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

// parseInsert handles:
//
//	INSERT INTO <table> [(cols)] VALUES (...) [, (...)] [;]
//	INSERT INTO <table> [(cols)] SELECT ... [;]
func (p *parser) parseInsert() (Statement, error) {
	p.advance() // consume INSERT
	if err := p.expectKeyword("INTO"); err != nil {
		return nil, err
	}
	tableName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &InsertStmt{Table: tableName}

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

	p.consumeSemicolon()
	return stmt, nil
}

// parseValueRow parses one parenthesised list of value expressions: (expr, expr, ...)
func (p *parser) parseValueRow() ([]Expr, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var exprs []Expr
	for {
		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) || p.curIs(lexer.RParen)
		})
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

	target, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &UpdateStmt{Target: target}

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
		stmt.Where = p.parseAndChain(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseUpdateFrom parses: FROM <table> [AS <alias>] [JOINs]
func (p *parser) parseUpdateFrom() (*UpdateFromSource, error) {
	p.advance() // consume FROM

	fromName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	from := &UpdateFromSource{Name: fromName}

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

		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) ||
				p.curKeyword("WHERE") ||
				p.curKeyword("FROM") ||
				p.curIs(lexer.Semicolon) ||
				p.curIs(lexer.EOF)
		})
		sets = append(sets, UpdateSet{Column: colName, Value: expr})

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

	deleteName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}

	stmt := &DeleteStmt{Table: deleteName}

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
		stmt.Where = p.parseAndChain(func() bool {
			return p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}

	p.consumeSemicolon()

	return stmt, nil
}

// parseMerge handles:
//
//	MERGE [INTO] <target> [AS <alias>]
//	USING <source> [AS <alias>]
//	ON <condition>
//	WHEN MATCHED [AND <cond>] THEN UPDATE SET ... | DELETE
//	WHEN NOT MATCHED [BY TARGET|SOURCE] [AND <cond>] THEN INSERT ... | UPDATE SET ... | DELETE
//	[;]
func (p *parser) parseMerge() (Statement, error) {
	p.advance() // consume MERGE
	if p.curKeyword("INTO") {
		p.advance() // consume optional INTO
	}

	mergeTarget, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt := &MergeStmt{Target: mergeTarget}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		stmt.TargetAlias = aliasTok.Value
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		stmt.TargetAlias = p.cur.Value
		p.advance()
	}

	if err := p.expectKeyword("USING"); err != nil {
		return nil, err
	}

	source, err := p.parseFromSource()
	if err != nil {
		return nil, err
	}
	stmt.Source = source

	if err := p.expectKeyword("ON"); err != nil {
		return nil, err
	}

	// The ON condition may be paren-wrapped in canonical output (for round-trip
	// idempotency). Consume the outer parens so the stored expression is bare.
	var on Expr
	if p.curIs(lexer.LParen) {
		p.advance()
		on = p.parseExpr(func() bool {
			return p.curIs(lexer.RParen) || p.curIs(lexer.EOF)
		})
		if _, err := p.expect(lexer.RParen); err != nil {
			return nil, err
		}
	} else {
		on = p.parseExpr(func() bool {
			return p.curKeyword("WHEN") || p.curIs(lexer.Semicolon) || p.curIs(lexer.EOF)
		})
	}
	stmt.On = on

	for p.curKeyword("WHEN") {
		clause, err := p.parseMergeWhenClause()
		if err != nil {
			return nil, err
		}
		stmt.Clauses = append(stmt.Clauses, clause)
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseMergeWhenClause parses one WHEN … THEN … clause.
func (p *parser) parseMergeWhenClause() (MergeWhenClause, error) {
	p.advance() // consume WHEN

	var clause MergeWhenClause

	// MATCHED, SOURCE, TARGET are non-reserved SQL words — they may appear as
	// identifiers elsewhere, so they are not in the keywords list. Use curValue
	// for case-insensitive value matching that works on both Ident and Keyword.
	if p.curValue("MATCHED") {
		p.advance()
		clause.MatchType = MergeMatched
	} else if p.curKeyword("NOT") {
		p.advance()
		if !p.curValue("MATCHED") {
			return MergeWhenClause{}, fmt.Errorf(
				"expected MATCHED after WHEN NOT at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance()
		if p.curKeyword("BY") {
			p.advance()
			if p.curValue("SOURCE") {
				p.advance()
				clause.MatchType = MergeNotMatchedBySource
			} else if p.curValue("TARGET") {
				p.advance()
				clause.MatchType = MergeNotMatchedByTarget
			} else {
				return MergeWhenClause{}, fmt.Errorf(
					"expected SOURCE or TARGET after WHEN NOT MATCHED BY at %d:%d, got %s %q",
					p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
				)
			}
		} else {
			clause.MatchType = MergeNotMatchedByTarget
		}
	} else {
		return MergeWhenClause{}, fmt.Errorf(
			"expected MATCHED or NOT after WHEN at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}

	if p.curKeyword("AND") {
		p.advance()
		// AND conditions may also be paren-wrapped in canonical output.
		var cond Expr
		if p.curIs(lexer.LParen) {
			p.advance()
			cond = p.parseExpr(func() bool {
				return p.curIs(lexer.RParen) || p.curIs(lexer.EOF)
			})
			if _, err := p.expect(lexer.RParen); err != nil {
				return MergeWhenClause{}, err
			}
		} else {
			cond = p.parseExpr(func() bool {
				return p.curKeyword("THEN")
			})
		}
		clause.Condition = cond
	}

	if err := p.expectKeyword("THEN"); err != nil {
		return MergeWhenClause{}, err
	}

	switch {
	case p.curKeyword("UPDATE"):
		p.advance()
		sets, err := p.parseMergeSetClause()
		if err != nil {
			return MergeWhenClause{}, err
		}
		clause.Action = MergeActionUpdate
		clause.Sets = sets
	case p.curKeyword("DELETE"):
		p.advance()
		clause.Action = MergeActionDelete
	case p.curKeyword("INSERT"):
		p.advance()
		if p.curIs(lexer.LParen) {
			cols, err := p.parseIdentList()
			if err != nil {
				return MergeWhenClause{}, err
			}
			clause.Columns = cols
		}
		if err := p.expectKeyword("VALUES"); err != nil {
			return MergeWhenClause{}, err
		}
		row, err := p.parseValueRow()
		if err != nil {
			return MergeWhenClause{}, err
		}
		clause.Action = MergeActionInsert
		clause.Values = row
	default:
		return MergeWhenClause{}, fmt.Errorf(
			"expected UPDATE, DELETE, or INSERT after THEN at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}

	return clause, nil
}

// parseMergeSetClause parses: SET col = expr [, col = expr ...]
// Like parseSetClause but stops at WHEN (next clause boundary) in addition
// to the standard terminators.
func (p *parser) parseMergeSetClause() ([]UpdateSet, error) {
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
			p.advance()
			fieldTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			colName = colName + "." + fieldTok.Value
		}
		if _, err := p.expect(lexer.Eq); err != nil {
			return nil, err
		}
		expr := p.parseExpr(func() bool {
			return p.curIs(lexer.Comma) ||
				p.curKeyword("WHEN") ||
				p.curIs(lexer.Semicolon) ||
				p.curIs(lexer.EOF)
		})
		sets = append(sets, UpdateSet{Column: colName, Value: expr})
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance()
	}
	return sets, nil
}

// parseDeclare handles:
//
//	DECLARE @name type [= default] [, @name2 type2 ...]  -- scalar variable(s)
//	DECLARE @name TABLE (<col_defs>)                      -- table variable
func (p *parser) parseDeclare() (Statement, error) {
	p.advance() // consume DECLARE
	var vars []VarDecl
	for {
		nameTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		name := nameTok.Value

		if p.curKeyword("TABLE") {
			p.advance() // consume TABLE
			if _, err := p.expect(lexer.LParen); err != nil {
				return nil, err
			}
			cols, _, err := p.parseColumnList()
			if err != nil {
				return nil, err
			}
			if _, err := p.expect(lexer.RParen); err != nil {
				return nil, err
			}
			vars = append(vars, VarDecl{Name: name, Columns: cols})
		} else {
			dataType, err := p.parseDataType()
			if err != nil {
				return nil, err
			}
			v := VarDecl{Name: name, Type: dataType}
			if p.curIs(lexer.Eq) {
				p.advance() // consume =
				tok := p.cur
				switch tok.Type {
				case lexer.StringLit, lexer.IntLit, lexer.FloatLit, lexer.Keyword, lexer.Ident:
					v.Default = &RawExpr{Text: tok.Value}
					p.advance()
				default:
					return nil, fmt.Errorf(
						"expected default value after = at %d:%d, got %s %q",
						tok.Line, tok.Column, tok.Type, tok.Value,
					)
				}
			}
			vars = append(vars, v)
		}

		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	p.consumeSemicolon()
	stmt := &DeclareStmt{Vars: vars}
	return stmt, nil
}

// parseSet handles SET statement variants:
//   - SET <option> <value>               (SetSimple)
//   - SET TRANSACTION ISOLATION LEVEL …  (SetTransactionIsolation)
//   - SET IDENTITY_INSERT <table> ON|OFF (SetIdentityInsert)
func (p *parser) parseSet() (Statement, error) {
	p.advance() // consume SET
	switch strings.ToUpper(p.cur.Value) {
	case "TRANSACTION":
		return p.parseSetTransaction()
	case "IDENTITY_INSERT":
		return p.parseSetIdentityInsert()
	default:
		return p.parseSetSimple()
	}
}

// parseSetSimple handles: SET <option> <value> [;]
func (p *parser) parseSetSimple() (Statement, error) {
	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
		return nil, fmt.Errorf(
			"expected option name after SET at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	option := strings.ToUpper(p.cur.Value)
	p.advance()

	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword &&
		p.cur.Type != lexer.IntLit && p.cur.Type != lexer.FloatLit {
		return nil, fmt.Errorf(
			"expected value after SET %s at %d:%d, got %s %q",
			option, p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	value := p.cur.Value
	p.advance()

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetSimple, Option: option, Value: value}
	return stmt, nil
}

// parseSetTransaction handles: SET TRANSACTION ISOLATION LEVEL <level> [;]
func (p *parser) parseSetTransaction() (Statement, error) {
	p.advance() // consume TRANSACTION

	if err := p.expectKeyword("ISOLATION"); err != nil {
		return nil, err
	}
	if err := p.expectKeyword("LEVEL"); err != nil {
		return nil, err
	}

	// Read isolation level: 1 or 2 tokens.
	first := strings.ToUpper(p.cur.Value)
	p.advance()

	var level string
	switch first {
	case "READ":
		second := strings.ToUpper(p.cur.Value)
		if second != "COMMITTED" && second != "UNCOMMITTED" {
			return nil, fmt.Errorf(
				"expected COMMITTED or UNCOMMITTED after READ at %d:%d, got %q",
				p.cur.Line, p.cur.Column, p.cur.Value,
			)
		}
		level = "READ " + second
		p.advance()
	case "REPEATABLE":
		if err := p.expectKeyword("READ"); err != nil {
			return nil, err
		}
		level = "REPEATABLE READ"
	case "SERIALIZABLE", "SNAPSHOT":
		level = first
	default:
		return nil, fmt.Errorf(
			"unknown isolation level %q at %d:%d",
			first, p.cur.Line, p.cur.Column,
		)
	}

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetTransactionIsolation, IsolationLevel: level}
	return stmt, nil
}

// parseSetIdentityInsert handles: SET IDENTITY_INSERT <table> ON|OFF [;]
func (p *parser) parseSetIdentityInsert() (Statement, error) {
	p.advance() // consume IDENTITY_INSERT

	if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
		return nil, fmt.Errorf(
			"expected table name after SET IDENTITY_INSERT at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	table := p.cur.Value
	p.advance()

	// Handle schema-qualified name (schema.table).
	if p.cur.Type == lexer.Dot {
		p.advance() // consume dot
		if p.cur.Type != lexer.Ident && p.cur.Type != lexer.Keyword {
			return nil, fmt.Errorf(
				"expected table name after dot at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		table = table + "." + p.cur.Value
		p.advance()
	}

	onOff := strings.ToUpper(p.cur.Value)
	if onOff != "ON" && onOff != "OFF" {
		return nil, fmt.Errorf(
			"expected ON or OFF after SET IDENTITY_INSERT %s at %d:%d, got %q",
			table, p.cur.Line, p.cur.Column, p.cur.Value,
		)
	}
	enabled := onOff == "ON"
	p.advance()

	p.consumeSemicolon()

	stmt := &SetStmt{Kind: SetIdentityInsert, Table: table, Enabled: enabled}
	return stmt, nil
}
