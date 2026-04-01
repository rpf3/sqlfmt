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

	// Optional WITH clause before AS: WITH RECOMPILE, ENCRYPTION, EXECUTE AS ...
	withOpts, err := p.parseProcWithOptions()
	if err != nil {
		return nil, err
	}
	stmt.WithOptions = withOpts

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

// parseProcWithOptions parses the optional WITH clause that may appear between
// the parameter list and the AS keyword in CREATE/ALTER PROCEDURE:
//
//	WITH RECOMPILE
//	WITH ENCRYPTION
//	WITH EXECUTE AS { CALLER | SELF | OWNER | 'user_name' }
//	WITH RECOMPILE, EXECUTE AS OWNER   (multiple options)
//
// Returns nil when no WITH keyword is present. Each option is lowercased.
func (p *parser) parseProcWithOptions() ([]string, error) {
	if !p.curKeyword("WITH") {
		return nil, nil
	}
	p.advance() // consume WITH

	var opts []string
	for {
		var opt string
		switch {
		case p.curValue("RECOMPILE"):
			opt = "recompile"
			p.advance()
		case p.curValue("ENCRYPTION"):
			opt = "encryption"
			p.advance()
		case p.curKeyword("EXECUTE") && p.peekKeyword("AS"):
			p.advance() // consume EXECUTE
			p.advance() // consume AS
			ctxTok := p.cur
			p.advance() // consume context keyword or string literal
			if ctxTok.Type == lexer.StringLit {
				opt = "execute as " + ctxTok.Value
			} else {
				opt = "execute as " + strings.ToLower(ctxTok.Value)
			}
		default:
			return nil, fmt.Errorf("unknown WITH option %q at %d:%d", p.cur.Value, p.cur.Line, p.cur.Column)
		}
		opts = append(opts, opt)
		if !p.curIs(lexer.Comma) {
			break
		}
		p.advance() // consume ','
	}
	return opts, nil
}

// parseProcParams reads the optional parameter list for a CREATE PROCEDURE statement.
// Parameters may appear with or without surrounding parentheses.
// Each parameter is: @name datatype [= default] [OUTPUT|OUT]
// Returns nil (no error) when no parameters are present.
// parseSingleProcParam parses one parameter entry: @name type [= default] [OUTPUT|OUT] [READONLY].
func (p *parser) parseSingleProcParam() (ProcParam, error) {
	nameTok := p.cur
	if nameTok.Type != lexer.Ident {
		return ProcParam{}, fmt.Errorf(
			"expected parameter name at %d:%d, got %s %q",
			nameTok.Line, nameTok.Column, nameTok.Type, nameTok.Value,
		)
	}
	p.advance() // consume @name

	dataType, err := p.parseDataType()
	if err != nil {
		return ProcParam{}, err
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

	return param, nil
}

func (p *parser) parseProcParams() ([]ProcParam, error) {
	// Parenthesised form: (...)
	hasParen := p.curIs(lexer.LParen)
	if hasParen {
		p.advance() // consume (
	}

	var params []ProcParam
	for {
		// Bail out if we've reached AS, WITH, BEGIN, ), or EOF.
		if p.curKeyword("AS") || p.curKeyword("WITH") || p.curKeyword("BEGIN") ||
			p.curIs(lexer.RParen) || p.cur.Type == lexer.EOF {
			break
		}

		param, err := p.parseSingleProcParam()
		if err != nil {
			return nil, err
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

// parseTryCatchBody collects the body statements of a BEGIN TRY…END TRY or
// BEGIN CATCH…END CATCH block. On entry p.cur is the first token of the body
// (the opening BEGIN TRY / BEGIN CATCH has already been consumed). On exit
// p.cur is positioned after the closing END TRY / END CATCH.
//
// endKeyword is "TRY" or "CATCH". Statement chunks are split on semicolons at
// depth 0 and re-parsed via Parse — falling back to *RawStmt on failure —
// exactly as parseProcBody does. Depth is tracked by BEGIN (+1) and END (-1)
// so nested BEGIN/END blocks inside the body are balanced correctly, and the
// entire chunk is re-parsed recursively by Parse, which dispatches to
// parseTryCatch for nested TRY/CATCH blocks.
func (p *parser) parseTryCatchBody(endKeyword string) ([]Statement, error) {
	var stmts []Statement

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

	var tokBuf []lexer.Token
	depth := 0

	for p.cur.Type != lexer.EOF {
		// Closing END <endKeyword> at depth 0 terminates this block.
		if p.curKeyword("END") && depth == 0 && p.peekKeyword(endKeyword) {
			appendStmt(tokBuf)
			p.advance() // consume END
			p.advance() // consume TRY or CATCH
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

	return stmts, nil
}

// parseTryCatch handles:
//
//	BEGIN TRY
//	    <try_body>
//	END TRY
//	BEGIN CATCH
//	    <catch_body>
//	END CATCH
//
// On entry p.cur is BEGIN (peeked as TRY by the caller).
func (p *parser) parseTryCatch() (Statement, error) {
	p.advance() // consume BEGIN
	if err := p.expectKeyword("TRY"); err != nil {
		return nil, err
	}

	tryBody, err := p.parseTryCatchBody("TRY")
	if err != nil {
		return nil, err
	}

	if err := p.expectKeyword("BEGIN"); err != nil {
		return nil, err
	}
	if err := p.expectKeyword("CATCH"); err != nil {
		return nil, err
	}

	catchBody, err := p.parseTryCatchBody("CATCH")
	if err != nil {
		return nil, err
	}

	p.consumeSemicolon()
	stmt := &TryCatchStmt{TryBody: tryBody, CatchBody: catchBody}
	return stmt, nil
}

// parseThrow handles:
//
//	THROW;                                    -- bare re-raise
//	THROW <error_number>, <message>, <state>; -- raise with arguments
//
// On entry p.cur is THROW.
// parseTransaction handles BEGIN TRANSACTION, COMMIT, ROLLBACK, and SAVE TRANSACTION.
//
// BEGIN alone (without TRANSACTION/TRAN) is not dispatched here — it opens a
// proc/function body and is handled by parseProcBody.
func (p *parser) parseTransaction() (Statement, error) {
	stmt := &TransactionStmt{}

	switch {
	case p.curKeyword("BEGIN"):
		p.advance() // consume BEGIN
		// consume optional TRANSACTION or TRAN
		if p.curKeyword("TRANSACTION") || p.curValue("TRAN") {
			p.advance()
		}
		stmt.Kind = TxnBegin
		// optional savepoint name
		if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			stmt.Name = p.cur.Value
			p.advance()
		}

	case p.curKeyword("COMMIT"):
		p.advance() // consume COMMIT
		// consume optional TRANSACTION, TRAN, or WORK
		if p.curKeyword("TRANSACTION") || p.curValue("TRAN") || p.curValue("WORK") {
			p.advance()
		}
		stmt.Kind = TxnCommit

	case p.curKeyword("ROLLBACK"):
		p.advance() // consume ROLLBACK
		// consume optional TRANSACTION, TRAN, or WORK
		if p.curKeyword("TRANSACTION") || p.curValue("TRAN") || p.curValue("WORK") {
			p.advance()
		}
		stmt.Kind = TxnRollback
		// optional savepoint name
		if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			stmt.Name = p.cur.Value
			p.advance()
		}

	case p.curValue("SAVE"):
		p.advance() // consume SAVE
		// consume TRANSACTION or TRAN
		if p.curKeyword("TRANSACTION") || p.curValue("TRAN") {
			p.advance()
		}
		stmt.Kind = TxnSave
		// savepoint name is required for SAVE TRANSACTION
		if p.curIs(lexer.Ident) || p.curIs(lexer.QuotedIdent) {
			stmt.Name = p.cur.Value
			p.advance()
		}
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseReturn handles:
//
//	RETURN          -- bare return
//	RETURN <expr>   -- return scalar expression
//
// On entry p.cur is RETURN.
func (p *parser) parseReturn() (Statement, error) {
	p.advance() // consume RETURN

	stmt := &ReturnStmt{}

	// Bare RETURN: next token is ; or EOF.
	if p.curIs(lexer.Semicolon) || p.cur.Type == lexer.EOF {
		p.consumeSemicolon()
		return stmt, nil
	}

	stmt.Value = p.parseExpr(func() bool {
		return p.curIs(lexer.Semicolon) || p.cur.Type == lexer.EOF
	})
	p.consumeSemicolon()
	return stmt, nil
}

// parseUse handles: USE <database_name>.
func (p *parser) parseUse() (Statement, error) {
	p.advance() // consume USE
	tok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	return &UseStmt{Database: tok.Value}, nil
}

// parseRaiserror handles:
//
//	RAISERROR(<msg_or_id>, <severity>, <state>) [WITH <option> [, <option>]] [;]
//
// On entry p.cur is the RAISERROR ident token.
func (p *parser) parseRaiserror() (Statement, error) {
	p.advance() // consume RAISERROR

	if _, err := p.expect(lexer.LParen); err != nil {
		return nil, err
	}

	args := make([]string, 0, 3)
	for i := 0; i < 3; i++ {
		if i > 0 {
			if _, err := p.expect(lexer.Comma); err != nil {
				return nil, err
			}
		}
		tok := p.cur
		if tok.Type == lexer.EOF || tok.Type == lexer.Semicolon {
			return nil, fmt.Errorf(
				"expected RAISERROR argument %d at %d:%d", i+1, tok.Line, tok.Column,
			)
		}
		args = append(args, tok.Value)
		p.advance()
	}

	if _, err := p.expect(lexer.RParen); err != nil {
		return nil, err
	}

	stmt := &RaiserrorStmt{Args: args}

	// Optional WITH <option> [, <option>] clause.
	if p.curKeyword("WITH") {
		p.advance() // consume WITH
		for {
			if p.cur.Type == lexer.EOF || p.curIs(lexer.Semicolon) {
				break
			}
			stmt.WithOptions = append(stmt.WithOptions, strings.ToLower(p.cur.Value))
			p.advance()
			if !p.curIs(lexer.Comma) {
				break
			}
			p.advance() // consume comma between options
		}
	}

	p.consumeSemicolon()
	return stmt, nil
}

func (p *parser) parseThrow() (Statement, error) {
	p.advance() // consume THROW

	stmt := &ThrowStmt{}

	// Bare THROW: next token is ; or EOF.
	if p.curIs(lexer.Semicolon) || p.cur.Type == lexer.EOF {
		p.consumeSemicolon()
		return stmt, nil
	}

	// THROW with three arguments: error_number, message, state.
	args := make([]string, 0, 3)
	for i := 0; i < 3; i++ {
		if i > 0 {
			if _, err := p.expect(lexer.Comma); err != nil {
				return nil, err
			}
		}
		tok := p.cur
		if tok.Type == lexer.EOF || tok.Type == lexer.Semicolon {
			return nil, fmt.Errorf(
				"expected THROW argument %d at %d:%d", i+1, tok.Line, tok.Column,
			)
		}
		args = append(args, tok.Value)
		p.advance()
	}

	stmt.Args = args
	p.consumeSemicolon()
	return stmt, nil
}

// parsePrint handles:
//
//	PRINT <expr>
//
// On entry p.cur is PRINT. The argument is captured as a raw expression string
// (everything up to the terminating semicolon or EOF).
func (p *parser) parsePrint() (Statement, error) {
	p.advance() // consume PRINT

	var tokBuf []lexer.Token
	for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
		tokBuf = append(tokBuf, p.cur)
		p.advance()
	}
	p.consumeSemicolon()
	return &PrintStmt{Value: joinBodyTokens(tokBuf)}, nil
}

// parseExec handles:
//
//	EXEC  [[@retvar =] <proc_name>] [<args>]
//	EXEC  (<dynamic_sql_expr>)
//	EXECUTE is accepted as an alias.
//
// On entry p.cur is EXEC or EXECUTE.
func (p *parser) parseExec() (Statement, error) {
	p.advance() // consume EXEC or EXECUTE

	stmt := &ExecStmt{}

	// Optional return-value capture: @var = <proc_name> …
	if p.cur.Type == lexer.Ident &&
		strings.HasPrefix(p.cur.Value, "@") &&
		p.peek.Type == lexer.Eq {
		stmt.ReturnVar = p.cur.Value
		p.advance() // consume @var
		p.advance() // consume =
	}

	// Dynamic SQL: EXEC (@expr) — no proc name, the paren expression is Args.
	if p.curIs(lexer.LParen) {
		var tokBuf []lexer.Token
		for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
			tokBuf = append(tokBuf, p.cur)
			p.advance()
		}
		stmt.Args = []ExecArg{{Value: joinBodyTokens(tokBuf)}}
		p.consumeSemicolon()
		return stmt, nil
	}

	// Normal call: qualified procedure name followed by optional arguments.
	procName, err := p.parseQualifiedName()
	if err != nil {
		return nil, err
	}
	stmt.Proc = procName

	// Parse structured argument list: split on depth-zero commas, detect OUTPUT.
	var args []ExecArg
	var tokBuf []lexer.Token
	depth := 0

	flushArg := func() {
		if len(tokBuf) == 0 {
			return
		}
		isOutput := false
		if last := tokBuf[len(tokBuf)-1]; last.Type == lexer.Keyword && last.Value == "output" {
			isOutput = true
			tokBuf = tokBuf[:len(tokBuf)-1]
		}
		args = append(args, ExecArg{Value: joinBodyTokens(tokBuf), IsOutput: isOutput})
		tokBuf = tokBuf[:0]
	}

	for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
		if p.curIs(lexer.LParen) {
			depth++
		} else if p.curIs(lexer.RParen) {
			depth--
		} else if p.curIs(lexer.Comma) && depth == 0 {
			flushArg()
			p.advance()
			continue
		}
		tokBuf = append(tokBuf, p.cur)
		p.advance()
	}
	flushArg()
	stmt.Args = args

	p.consumeSemicolon()
	return stmt, nil
}

// parseExecuteAs parses an EXECUTE AS / EXEC AS security-context statement.
// On entry p.cur is EXEC or EXECUTE and p.peek is AS.
func (p *parser) parseExecuteAs() (Statement, error) {
	kw := strings.ToLower(p.cur.Value)
	p.advance() // consume EXEC or EXECUTE
	p.advance() // consume AS

	// Collect everything up to the semicolon as the raw context string.
	var tokBuf []lexer.Token
	for p.cur.Type != lexer.EOF && !p.curIs(lexer.Semicolon) {
		tokBuf = append(tokBuf, p.cur)
		p.advance()
	}
	p.consumeSemicolon()
	return &ExecuteAsStmt{
		Keyword: kw,
		Context: joinBodyTokens(tokBuf),
	}, nil
}

// parseRevert parses a REVERT statement.
// On entry p.cur is REVERT.
func (p *parser) parseRevert() (Statement, error) {
	p.advance() // consume REVERT
	p.consumeSemicolon()
	return &RevertStmt{}, nil
}

// joinBodyTokens joins a slice of tokens into a whitespace-normalised string,
// lowercasing keywords and applying SQL spacing conventions.
func joinBodyTokens(tokens []lexer.Token) string {
	var b strings.Builder
	var prevType lexer.TokenType
	var prevValue string
	for i, tok := range tokens {
		if i > 0 && needsSelectSpace(prevType, tok.Type, prevValue) {
			b.WriteByte(' ')
		}
		b.WriteString(exprToken(tok))
		prevType = tok.Type
		prevValue = tok.Value
	}
	return strings.TrimSpace(b.String())
}

// peekIsTableKeyword reports whether the peek token is the TABLE keyword.
// Used to disambiguate RETURNS @var TABLE (...) from RETURNS <scalar_type>.
func peekIsTableKeyword(p *parser) bool {
	return p.peek.Type == lexer.Keyword && strings.EqualFold(p.peek.Value, "TABLE")
}

// parseFuncReturnsClause parses the RETURNS clause of a CREATE FUNCTION
// statement, setting Kind, ReturnsType, ReturnsVar, and ReturnsTable on stmt.
// RETURNS is consumed on entry.
func (p *parser) parseFuncReturnsClause(stmt *CreateFuncStmt) error {
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
			return err
		}
		cols, _, err := p.parseColumnList()
		if err != nil {
			return err
		}
		if _, err := p.expect(lexer.RParen); err != nil {
			return err
		}
		stmt.ReturnsTable = cols

	default:
		// Scalar: RETURNS <data_type>
		stmt.Kind = CreateFuncScalar
		dataType, err := p.parseDataType()
		if err != nil {
			return err
		}
		stmt.ReturnsType = dataType
	}
	return nil
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

	if !p.curValue("RETURNS") {
		return nil, fmt.Errorf(
			"expected RETURNS in CREATE FUNCTION at %d:%d, got %s %q",
			p.cur.Line, p.cur.Column, p.cur.Type, p.cur.Value,
		)
	}
	p.advance() // consume RETURNS

	if err := p.parseFuncReturnsClause(stmt); err != nil {
		return nil, err
	}

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

// parseControlFlowCondition parses the condition of an IF or WHILE statement
// as a raw expression string. Reading stops at any keyword that could begin a
// body statement (BEGIN, SELECT, INSERT, …) at parenthesis depth 0. This
// allows complex conditions like EXISTS (SELECT …) to pass through unharmed
// because the depth guard in parseExprRaw suppresses the stopFn inside parens.
func (p *parser) parseControlFlowCondition() string {
	cond, _ := p.parseExprRaw(func() bool {
		if p.cur.Type != lexer.Keyword {
			return false
		}
		switch strings.ToUpper(p.cur.Value) {
		case "BEGIN", "SELECT", "WITH", "INSERT", "UPDATE", "DELETE",
			"SET", "DECLARE", "IF", "WHILE", "RETURN", "EXEC", "EXECUTE",
			"TRUNCATE", "CREATE", "ALTER", "DROP", "MERGE", "PRINT",
			"BREAK", "CONTINUE", "THROW", "RAISERROR":
			return true
		}
		return false
	})
	return strings.TrimSpace(cond)
}

// parseIf handles:
//
//	IF <condition> BEGIN <stmts> END [ELSE BEGIN <stmts> END]
//	IF <condition> <single-stmt>       [ELSE <single-stmt>]
func (p *parser) parseIf() (Statement, error) {
	p.advance() // consume IF

	cond := p.parseControlFlowCondition()

	then, hasThenBeginEnd, err := p.parseProcBody()
	if err != nil {
		return nil, err
	}
	// Single-statement bodies leave the trailing ';' unconsumed; advance past
	// it so we can detect an optional ELSE that follows.
	if !hasThenBeginEnd {
		p.consumeSemicolon()
	}

	var elseBranch []Statement
	if p.curKeyword("ELSE") {
		p.advance() // consume ELSE
		var hasElseBeginEnd bool
		elseBranch, hasElseBeginEnd, err = p.parseProcBody()
		if err != nil {
			return nil, err
		}
		if !hasElseBeginEnd {
			p.consumeSemicolon()
		}
	}

	p.consumeSemicolon()
	return &IfStmt{Condition: cond, Then: then, Else: elseBranch}, nil
}

// parseWhile handles:
//
//	WHILE <condition> BEGIN <stmts> END
//	WHILE <condition> <single-stmt>
func (p *parser) parseWhile() (Statement, error) {
	p.advance() // consume WHILE

	cond := p.parseControlFlowCondition()

	body, hasBeginEnd, err := p.parseProcBody()
	if err != nil {
		return nil, err
	}
	if !hasBeginEnd {
		p.consumeSemicolon()
	}

	p.consumeSemicolon()
	return &WhileStmt{Condition: cond, Body: body}, nil
}

// parseDeclare handles:
//
//	DECLARE @name type [= default] [, @name2 type2 ...]  -- scalar variable(s)
//	DECLARE @name TABLE (<col_defs>)                      -- table variable
func (p *parser) parseDeclare() (Statement, error) {
	p.advance() // consume DECLARE

	// Cursor declaration: DECLARE <name> [INSENSITIVE|SCROLL] CURSOR ...
	// p.cur is the cursor/variable name; p.peek is the token after it.
	if p.peekKeyword("CURSOR") || p.peekKeyword("INSENSITIVE") || p.peekKeyword("SCROLL") {
		return p.parseDeclareCursor()
	}

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

// parseDeclareCursor handles both DECLARE CURSOR syntax forms.
// On entry DECLARE has already been consumed and p.cur is the cursor name token.
//
//	ISO:      DECLARE name [INSENSITIVE] [SCROLL] CURSOR FOR <select>
//	Extended: DECLARE name CURSOR [LOCAL|GLOBAL] [FORWARD_ONLY|SCROLL]
//	          [STATIC|KEYSET|DYNAMIC|FAST_FORWARD] [READ_ONLY|SCROLL_LOCKS|OPTIMISTIC]
//	          [TYPE_WARNING] FOR <select> [FOR UPDATE [OF col, ...]]
func (p *parser) parseDeclareCursor() (Statement, error) {
	stmt := &DeclareCursorStmt{}

	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt.Name = nameTok.Value

	// ISO pre-CURSOR options: [INSENSITIVE] [SCROLL]
	if p.curKeyword("INSENSITIVE") {
		stmt.Insensitive = true
		p.advance()
	}
	// SCROLL before CURSOR is the ISO form; SCROLL after CURSOR is the extended form.
	if p.curKeyword("SCROLL") && p.peekKeyword("CURSOR") {
		stmt.ScrollMode = "SCROLL"
		p.advance()
	}

	if err := p.expectKeyword("CURSOR"); err != nil {
		return nil, err
	}

	// T-SQL extended options (all appear after CURSOR, before FOR)
	switch {
	case p.curKeyword("LOCAL"):
		stmt.Scope = "LOCAL"
		p.advance()
	case p.curKeyword("GLOBAL"):
		stmt.Scope = "GLOBAL"
		p.advance()
	}

	switch {
	case p.curKeyword("FORWARD_ONLY"):
		stmt.ScrollMode = "FORWARD_ONLY"
		p.advance()
	case p.curKeyword("SCROLL"):
		stmt.ScrollMode = "SCROLL"
		p.advance()
	}

	switch {
	case p.curKeyword("STATIC"):
		stmt.CursorType = "STATIC"
		p.advance()
	case p.curKeyword("KEYSET"):
		stmt.CursorType = "KEYSET"
		p.advance()
	case p.curKeyword("DYNAMIC"):
		stmt.CursorType = "DYNAMIC"
		p.advance()
	case p.curKeyword("FAST_FORWARD"):
		stmt.CursorType = "FAST_FORWARD"
		p.advance()
	}

	switch {
	case p.curKeyword("READ_ONLY"):
		stmt.Locking = "READ_ONLY"
		p.advance()
	case p.curKeyword("SCROLL_LOCKS"):
		stmt.Locking = "SCROLL_LOCKS"
		p.advance()
	case p.curKeyword("OPTIMISTIC"):
		stmt.Locking = "OPTIMISTIC"
		p.advance()
	}

	if p.curKeyword("TYPE_WARNING") {
		stmt.TypeWarning = true
		p.advance()
	}

	if err := p.expectKeyword("FOR"); err != nil {
		return nil, err
	}
	sel, err := p.parseSelectCore()
	if err != nil {
		return nil, err
	}
	stmt.Select = sel

	// Optional: FOR UPDATE [OF col1, col2, ...]
	if p.curKeyword("FOR") && p.peekKeyword("UPDATE") {
		p.advance() // consume FOR
		p.advance() // consume UPDATE
		stmt.ForUpdate = true
		if p.curValue("OF") {
			p.advance() // consume OF
			for {
				colTok, err := p.expectIdent()
				if err != nil {
					return nil, err
				}
				stmt.UpdateCols = append(stmt.UpdateCols, colTok.Value)
				if !p.curIs(lexer.Comma) {
					break
				}
				p.advance() // consume ','
			}
		}
	}

	p.consumeSemicolon()
	return stmt, nil
}

// parseOpenCursor handles OPEN <cursor_name> [;]
// On entry p.cur is OPEN.
func (p *parser) parseOpenCursor() (Statement, error) {
	p.advance() // consume OPEN
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	return &OpenCursorStmt{Name: nameTok.Value}, nil
}

// parseCloseCursor handles CLOSE <cursor_name> [;]
// On entry p.cur is CLOSE.
func (p *parser) parseCloseCursor() (Statement, error) {
	p.advance() // consume CLOSE
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	return &CloseCursorStmt{Name: nameTok.Value}, nil
}

// parseDeallocateCursor handles DEALLOCATE <cursor_name> [;]
// On entry p.cur is DEALLOCATE.
func (p *parser) parseDeallocateCursor() (Statement, error) {
	p.advance() // consume DEALLOCATE
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	p.consumeSemicolon()
	return &DeallocateCursorStmt{Name: nameTok.Value}, nil
}

// parseFetchCursor handles:
//
//	FETCH [NEXT|PRIOR|FIRST|LAST|ABSOLUTE n|RELATIVE n] FROM <cursor> [INTO @var, ...]
//
// On entry p.cur is FETCH. Direction defaults to NEXT when omitted.
func (p *parser) parseFetchCursor() (Statement, error) {
	p.advance() // consume FETCH

	stmt := &FetchCursorStmt{}

	switch {
	case p.curKeyword("NEXT"):
		stmt.Direction = "NEXT"
		p.advance()
	case p.curKeyword("PRIOR"):
		stmt.Direction = "PRIOR"
		p.advance()
	case p.curKeyword("FIRST"):
		stmt.Direction = "FIRST"
		p.advance()
	case p.curKeyword("LAST"):
		stmt.Direction = "LAST"
		p.advance()
	case p.curKeyword("ABSOLUTE"):
		stmt.Direction = "ABSOLUTE"
		p.advance()
		stmt.Offset = p.cur.Value
		p.advance()
	case p.curKeyword("RELATIVE"):
		stmt.Direction = "RELATIVE"
		p.advance()
		stmt.Offset = p.cur.Value
		p.advance()
	default:
		stmt.Direction = "NEXT" // implicit default; formatter always emits direction explicitly
	}

	if err := p.expectKeyword("FROM"); err != nil {
		return nil, err
	}
	nameTok, err := p.expectIdent()
	if err != nil {
		return nil, err
	}
	stmt.Name = nameTok.Value

	if p.curKeyword("INTO") {
		p.advance() // consume INTO
		for {
			varTok, err := p.expectIdent()
			if err != nil {
				return nil, err
			}
			stmt.Into = append(stmt.Into, varTok.Value)
			if !p.curIs(lexer.Comma) {
				break
			}
			p.advance() // consume ','
		}
	}

	p.consumeSemicolon()
	return stmt, nil
}
