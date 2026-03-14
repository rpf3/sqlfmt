package formatter

import (
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestFormatIfInsideProc(t *testing.T) {
	input := strings.Join([]string{
		"CREATE PROCEDURE dbo.Test @x INT AS BEGIN",
		"    IF @x > 0 BEGIN SELECT @x; END ELSE BEGIN SELECT 0; END;",
		"END;",
	}, "\n")
	got, err := Format(input, config.Default())
	if err != nil {
		t.Fatalf("Format() error: %v", err)
	}
	// IF inside proc body: both begin/end and nested stmts get an extra tab.
	if !strings.Contains(got, "\tif @x > 0\n\tbegin\n\t\tselect") {
		t.Errorf("IF not correctly indented inside proc body:\n%s", got)
	}
	if !strings.Contains(got, "\tend\n\telse\n\tbegin") {
		t.Errorf("ELSE not correctly indented inside proc body:\n%s", got)
	}
}
