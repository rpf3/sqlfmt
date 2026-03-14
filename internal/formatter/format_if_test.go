package formatter

import (
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestFormatIf(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "IF with BEGIN END",
			input: "IF @count > 0 BEGIN UPDATE orders SET status = 'active'; END;",
			want: "if @count > 0\nbegin\n\tupdate\n\t\torders\n\tset\n\t\tstatus = 'active';\nend;\n",
		},
		{
			name:  "IF ELSE",
			input: "IF @count > 0 BEGIN SELECT @count; END ELSE BEGIN SELECT 0; END;",
			want:  "if @count > 0\nbegin\n\tselect @count;\nend\nelse\nbegin\n\tselect 0;\nend;\n",
		},
		{
			name:  "single-statement IF normalised to BEGIN END",
			input: "IF @x > 0 SELECT 1;",
			want:  "if @x > 0\nbegin\n\tselect 1;\nend;\n",
		},
		{
			name:  "idempotent — already formatted",
			input: "if @count > 0\nbegin\n\tselect @count;\nend\nelse\nbegin\n\tselect 0;\nend;",
			want:  "if @count > 0\nbegin\n\tselect @count;\nend\nelse\nbegin\n\tselect 0;\nend;\n",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Format(tc.input, config.Default())
			if err != nil {
				t.Fatalf("Format() error: %v", err)
			}
			if got != tc.want {
				t.Errorf("Format() mismatch:\ngot:\n%s\nwant:\n%s", got, tc.want)
			}
		})
	}
}

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
