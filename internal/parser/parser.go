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
			col.Desc = true
		} else if p.curKeyword("ASC") {
			p.advance() // consume ASC (default; no flag needed)
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
