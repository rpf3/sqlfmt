package parser

import (
	"fmt"
	"strings"

	"github.com/rpf3/sqlfmt/internal/lexer"
)

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

// peekIsTableKeyword reports whether the peek token is the TABLE keyword.
// Used to disambiguate RETURNS @var TABLE (...) from RETURNS <scalar_type>.
func peekIsTableKeyword(p *parser) bool {
	return p.peek.Type == lexer.Keyword && strings.EqualFold(p.peek.Value, "TABLE")
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
