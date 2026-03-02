package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

// ParseResult holds the output of a parse run.
type ParseResult struct {
	Statements []Statement
	Errors     []error
}

// Parse parses input and returns a ParseResult.
// On any unrecognised token or unexpected structure, an error is recorded
// and parsing stops for that statement (no recovery yet).
func Parse(input string) ParseResult {
	p := &parser{lex: lexer.New(input)}
	p.advance() // load cur
	p.advance() // load peek
	return p.parseAll()
}

// ─── parser internals ────────────────────────────────────────────────────────

type parser struct {
	lex  *lexer.Lexer
	cur  lexer.Token
	peek lexer.Token
}

// advance shifts the lookahead window forward by one token, skipping comments.
func (p *parser) advance() {
	p.cur = p.peek
	for {
		tok := p.lex.Next()
		if tok.Type != lexer.LineComment && tok.Type != lexer.BlockComment {
			p.peek = tok
			return
		}
	}
}

// curIs reports whether cur has the given type.
func (p *parser) curIs(t lexer.TokenType) bool { return p.cur.Type == t }

// curKeyword reports whether cur is the keyword kw (case-insensitive).
func (p *parser) curKeyword(kw string) bool {
	return p.cur.Type == lexer.Keyword && strings.EqualFold(p.cur.Value, kw)
}

// peekKeyword reports whether peek is the keyword kw (case-insensitive).
func (p *parser) peekKeyword(kw string) bool {
	return p.peek.Type == lexer.Keyword && strings.EqualFold(p.peek.Value, kw)
}

// expect consumes cur if it matches t and returns it; otherwise records an
// error and returns the zero Token.
func (p *parser) expect(t lexer.TokenType) (lexer.Token, error) {
	tok := p.cur
	if tok.Type != t {
		return lexer.Token{}, fmt.Errorf(
			"expected %s at %d:%d, got %s %q",
			t, tok.Line, tok.Column, tok.Type, tok.Value,
		)
	}
	p.advance()
	return tok, nil
}

// expectKeyword consumes cur if it is the keyword kw; otherwise records an error.
func (p *parser) expectKeyword(kw string) error {
	if !p.curKeyword(kw) {
		return fmt.Errorf(
			"expected keyword %s at %d:%d, got %s %q",
			strings.ToUpper(kw), p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance()
	return nil
}

// parseAll drives the top-level parse loop.
func (p *parser) parseAll() ParseResult {
	var res ParseResult
	for !p.curIs(lexer.EOF) {
		// Skip stray semicolons between statements.
		if p.curIs(lexer.Semicolon) {
			p.advance()
			continue
		}
		stmt, err := p.parseStatement()
		if err != nil {
			res.Errors = append(res.Errors, err)
			return res
		}
		res.Statements = append(res.Statements, stmt)
	}
	return res
}

// parseStatement dispatches on the current keyword.
func (p *parser) parseStatement() (Statement, error) {
	if p.curKeyword("CREATE") {
		return p.parseCreate()
	}
	if p.curKeyword("ALTER") {
		return p.parseAlter()
	}
	if p.curKeyword("DROP") {
		return p.parseDrop()
	}
	if p.curKeyword("SELECT") {
		return p.parseSelect()
	}
	return nil, fmt.Errorf(
		"unexpected token %s %q at %d:%d",
		p.cur.Type, p.cur.Value, p.cur.Line, p.cur.Column,
	)
}

// parseAlter dispatches on ALTER TABLE (the only supported ALTER target for now).
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

// parseIdentList parses a parenthesised comma-separated list of identifiers.
func (p *parser) parseIdentList() ([]string, error) {
	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}
	var idents []string
	for {
		tok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		idents = append(idents, tok.Value)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}
	return idents, nil
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

// exprToken returns the normalised string for a single expression token:
// keywords are lowercased; everything else is preserved verbatim.
func exprToken(tok lexer.Token) string {
	if tok.Type == lexer.Keyword {
		return strings.ToLower(tok.Value)
	}
	return tok.Value
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

// expectIdent consumes cur if it is a bare or quoted identifier.
func (p *parser) expectIdent() (lexer.Token, error) {
	tok := p.cur
	if tok.Type != lexer.Ident && tok.Type != lexer.QuotedIdent {
		return lexer.Token{}, fmt.Errorf(
			"expected identifier at %d:%d, got %s %q",
			tok.Line, tok.Column, tok.Type, tok.Value,
		)
	}
	p.advance()
	return tok, nil
}

// ─── SELECT parsing ───────────────────────────────────────────────────────────

// needsSelectSpace reports whether a space should be written between two
// consecutive tokens when building a normalised expression string.
// It applies SQL conventions: no space around dots, no space between an
// identifier and its opening paren (function call), no space before a
// closing paren or comma.
func needsSelectSpace(prev, cur lexer.TokenType) bool {
	if prev == lexer.LParen || prev == lexer.Dot {
		return false
	}
	if cur == lexer.RParen || cur == lexer.Dot || cur == lexer.Comma {
		return false
	}
	// No space between bare identifier and open-paren (function call).
	// Keyword-before-paren (e.g. OVER (...), IN (...)) keeps the space.
	if cur == lexer.LParen && (prev == lexer.Ident || prev == lexer.QuotedIdent) {
		return false
	}
	return true
}

// parseExprRaw reads tokens into a normalised expression string, tracking
// parenthesis depth. At depth > 0 all tokens are consumed unconditionally.
// At depth 0, reading stops when stopFn returns true, when an unmatched
// RParen is reached, or at EOF. Keywords are lowercased; spacing follows
// SQL conventions via needsSelectSpace.
func (p *parser) parseExprRaw(stopFn func() bool) (string, error) {
	var b strings.Builder
	var prevType lexer.TokenType
	hasToken := false
	depth := 0

	for {
		tok := p.cur
		switch {
		case tok.Type == lexer.EOF:
			return b.String(), nil
		case tok.Type == lexer.RParen && depth == 0:
			return b.String(), nil // unmatched close-paren; leave for caller
		case depth == 0 && stopFn():
			return b.String(), nil
		}

		if tok.Type == lexer.LParen {
			depth++
		} else if tok.Type == lexer.RParen {
			depth-- // depth was > 0 here
		}

		if hasToken && needsSelectSpace(prevType, tok.Type) {
			b.WriteByte(' ')
		}
		b.WriteString(exprToken(tok))
		prevType = tok.Type
		hasToken = true
		p.advance()
	}
}

// parseSelectCore parses the body of a SELECT statement, consuming the SELECT
// keyword through all clauses. It does NOT consume a trailing semicolon or
// closing parenthesis — the caller handles those. It is used both for
// top-level SELECTs (via parseSelect) and for subqueries.
func (p *parser) parseSelectCore() (*SelectStmt, error) {
	p.advance() // consume SELECT

	stmt := &SelectStmt{}

	if p.curKeyword("DISTINCT") {
		p.advance()
		stmt.Distinct = true
	}

	cols, err := p.parseSelectList()
	if err != nil {
		return nil, err
	}
	stmt.Columns = cols

	if err := p.expectKeyword("FROM"); err != nil {
		return nil, err
	}

	from, err := p.parseFromSource()
	if err != nil {
		return nil, err
	}
	stmt.From = from

	joins, err := p.parseJoinClauses()
	if err != nil {
		return nil, err
	}
	stmt.Joins = joins

	if p.curKeyword("WHERE") {
		p.advance()
		// Stop before a subquery opening so we can parse it structurally.
		pred, err := p.parseExprRaw(func() bool {
			return (p.curIs(lexer.LParen) && p.peekKeyword("SELECT")) ||
				p.curKeyword("GROUP") || p.curKeyword("HAVING") ||
				p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
				p.curIs(lexer.Semicolon) || p.curIs(lexer.RParen)
		})
		if err != nil {
			return nil, err
		}
		if p.curIs(lexer.LParen) && p.peekKeyword("SELECT") {
			p.advance() // consume (
			subq, err := p.parseSelectCore()
			if err != nil {
				return nil, err
			}
			if _, err := p.expect(lexer.RParen); err != nil {
				return nil, err
			}
			stmt.WherePred = pred
			stmt.WhereSubq = subq
		} else {
			stmt.Where = pred
		}
	}

	if p.curKeyword("GROUP") && p.peekKeyword("BY") {
		p.advance() // consume GROUP
		p.advance() // consume BY
		groupBy, err := p.parseGroupByList()
		if err != nil {
			return nil, err
		}
		stmt.GroupBy = groupBy
	}

	if p.curKeyword("HAVING") {
		p.advance()
		having, err := p.parseExprRaw(func() bool {
			return p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
				p.curIs(lexer.Semicolon) || p.curIs(lexer.RParen)
		})
		if err != nil {
			return nil, err
		}
		stmt.Having = having
	}

	if p.curKeyword("ORDER") && p.peekKeyword("BY") {
		p.advance() // consume ORDER
		p.advance() // consume BY
		orderBy, err := p.parseOrderByList()
		if err != nil {
			return nil, err
		}
		stmt.OrderBy = orderBy
	}

	if p.curKeyword("OFFSET") {
		p.advance()
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Offset = tok.Value
		if p.curKeyword("ROWS") || p.curKeyword("ROW") {
			p.advance()
		}
	}

	if p.curKeyword("FETCH") {
		p.advance()
		if !p.curKeyword("NEXT") && !p.curKeyword("FIRST") {
			return nil, fmt.Errorf(
				"expected NEXT or FIRST after FETCH at %d:%d, got %s %q",
				p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
			)
		}
		p.advance() // consume NEXT or FIRST
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Fetch = tok.Value
		if p.curKeyword("ROWS") || p.curKeyword("ROW") {
			p.advance()
		}
		if p.curKeyword("ONLY") {
			p.advance()
		}
	}

	if p.curKeyword("LIMIT") {
		p.advance()
		tok, err := p.expect(lexer.IntLit)
		if err != nil {
			return nil, err
		}
		stmt.Limit = tok.Value
	}

	return stmt, nil
}

// parseSelect handles a top-level SELECT statement, delegating to
// parseSelectCore and then consuming the trailing semicolon.
func (p *parser) parseSelect() (Statement, error) {
	stmt, err := p.parseSelectCore()
	if err != nil {
		return nil, err
	}
	if p.curIs(lexer.Semicolon) {
		p.advance()
	}
	return stmt, nil
}

// parseSelectList parses a comma-separated list of SELECT items.
func (p *parser) parseSelectList() ([]SelectItem, error) {
	var items []SelectItem
	for {
		item, err := p.parseSelectItem()
		if err != nil {
			return nil, err
		}
		items = append(items, item)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return items, nil
}

// parseSelectItem parses one SELECT list entry: <expr> [AS <alias>].
func (p *parser) parseSelectItem() (SelectItem, error) {
	expr, err := p.parseExprRaw(func() bool {
		return p.curIs(lexer.Comma) || p.curKeyword("FROM") || p.curKeyword("AS")
	})
	if err != nil {
		return SelectItem{}, err
	}

	var alias string
	if p.curKeyword("AS") {
		p.advance()
		tok, err := p.expectIdent()
		if err != nil {
			return SelectItem{}, err
		}
		alias = tok.Value
	}

	item := SelectItem{Expr: expr, Alias: alias}
	return item, nil
}

// parseFromSource parses the target of a FROM clause: either a named table
// or a derived table (SELECT ...) subquery. Bare aliases (without AS) are
// also accepted for the lint rule in #34.
func (p *parser) parseFromSource() (SelectFromSource, error) {
	// Derived table: (SELECT ...)
	if p.curIs(lexer.LParen) && p.peekKeyword("SELECT") {
		p.advance() // consume (
		subq, err := p.parseSelectCore()
		if err != nil {
			return SelectFromSource{}, err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return SelectFromSource{}, err
		}
		source := SelectFromSource{Subquery: subq}
		if p.curKeyword("AS") {
			p.advance()
			aliasTok, err := p.expectIdent()
			if err != nil {
				return SelectFromSource{}, err
			}
			source.Alias = aliasTok.Value
		} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			source.Alias = p.cur.Value
			p.advance()
		}
		return source, nil
	}

	// Named table
	nameTok, err := p.expectIdent()
	if err != nil {
		return SelectFromSource{}, err
	}
	source := SelectFromSource{Name: nameTok.Value}

	if p.curKeyword("AS") {
		p.advance()
		aliasTok, err := p.expectIdent()
		if err != nil {
			return SelectFromSource{}, err
		}
		source.Alias = aliasTok.Value
	} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
		// bare alias without AS
		source.Alias = p.cur.Value
		p.advance()
	}

	return source, nil
}

// parseGroupByList parses a comma-separated list of GROUP BY expressions.
func (p *parser) parseGroupByList() ([]string, error) {
	var exprs []string
	for {
		expr, err := p.parseExprRaw(func() bool {
			return p.curIs(lexer.Comma) || p.curKeyword("HAVING") ||
				p.curKeyword("ORDER") || p.curKeyword("OFFSET") ||
				p.curKeyword("FETCH") || p.curKeyword("LIMIT") ||
				p.curIs(lexer.Semicolon)
		})
		if err != nil {
			return nil, err
		}
		exprs = append(exprs, expr)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return exprs, nil
}

// parseOrderByList parses a comma-separated list of ORDER BY items.
// Each item is an expression with an optional ASC or DESC direction keyword.
func (p *parser) parseOrderByList() ([]OrderItem, error) {
	var items []OrderItem
	for {
		expr, err := p.parseExprRaw(func() bool {
			return p.curKeyword("ASC") || p.curKeyword("DESC") ||
				p.curIs(lexer.Comma) ||
				p.curKeyword("OFFSET") || p.curKeyword("FETCH") ||
				p.curKeyword("LIMIT") || p.curIs(lexer.Semicolon)
		})
		if err != nil {
			return nil, err
		}
		item := OrderItem{Expr: expr}
		if p.curKeyword("DESC") {
			p.advance()
			item.Direction = DirectionDesc
		} else if p.curKeyword("ASC") {
			p.advance()
			item.Direction = DirectionAsc
		}
		items = append(items, item)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return items, nil
}

// isNextJoin reports whether the current token starts a JOIN clause.
// It uses peek-ahead to avoid false-positives on SQL functions named LEFT,
// RIGHT, etc.: LEFT(str, n) has peek=LParen, while LEFT JOIN has peek=JOIN
// and LEFT OUTER JOIN has peek=OUTER.
func (p *parser) isNextJoin() bool {
	return p.curKeyword("JOIN") ||
		(p.curKeyword("INNER") && p.peekKeyword("JOIN")) ||
		(p.curKeyword("LEFT") && (p.peekKeyword("JOIN") || p.peekKeyword("OUTER"))) ||
		(p.curKeyword("RIGHT") && (p.peekKeyword("JOIN") || p.peekKeyword("OUTER"))) ||
		(p.curKeyword("FULL") && (p.peekKeyword("OUTER") || p.peekKeyword("JOIN"))) ||
		(p.curKeyword("CROSS") && p.peekKeyword("JOIN"))
}

// parseJoinClauses consumes zero or more JOIN clauses following a FROM source.
// Each clause is: <join-type> <table> [AS <alias>] (ON <expr> | USING (<cols>)).
func (p *parser) parseJoinClauses() ([]JoinClause, error) {
	var joins []JoinClause
	for p.isNextJoin() {
		var joinType JoinType
		switch {
		case p.curKeyword("INNER"):
			p.advance() // consume INNER
			p.advance() // consume JOIN
			joinType = JoinInner
		case p.curKeyword("JOIN"):
			p.advance() // consume JOIN (bare, means INNER)
			joinType = JoinInner
		case p.curKeyword("LEFT"):
			p.advance() // consume LEFT
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinLeft
		case p.curKeyword("RIGHT"):
			p.advance() // consume RIGHT
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinRight
		case p.curKeyword("FULL"):
			p.advance() // consume FULL
			if p.curKeyword("OUTER") {
				p.advance() // consume optional OUTER
			}
			if err := p.expectKeyword("JOIN"); err != nil {
				return nil, err
			}
			joinType = JoinFullOuter
		case p.curKeyword("CROSS"):
			p.advance() // consume CROSS
			p.advance() // consume JOIN
			joinType = JoinCross
		}

		nameTok, err := p.expectIdent()
		if err != nil {
			return nil, err
		}
		jc := JoinClause{Type: joinType, Name: nameTok.Value}

		// Optional alias (AS or bare)
		if p.curKeyword("AS") {
			p.advance()
			aliasTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			jc.Alias = aliasTok.Value
		} else if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			jc.Alias = p.cur.Value
			p.advance()
		}

		// ON condition or USING column list
		if p.curKeyword("ON") {
			p.advance()
			expr, err := p.parseExprRaw(func() bool {
				return p.isNextJoin() ||
					p.curKeyword("WHERE") || p.curKeyword("GROUP") ||
					p.curKeyword("HAVING") || p.curKeyword("ORDER") ||
					p.curKeyword("OFFSET") || p.curKeyword("FETCH") ||
					p.curKeyword("LIMIT") || p.curIs(lexer.Semicolon)
			})
			if err != nil {
				return nil, err
			}
			jc.On = expr
		} else if p.curKeyword("USING") {
			p.advance()
			cols, err := p.parseIdentList()
			if err != nil {
				return nil, err
			}
			jc.Using = cols
		}

		joins = append(joins, jc)
	}
	return joins, nil
}
