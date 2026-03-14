package formatter

import (
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestFormatWhile(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "WHILE with BEGIN END",
			input: "WHILE @i < 10 BEGIN SET @i = @i + 1; END;",
			want:  "while @i < 10\nbegin\n\tset @i = @i + 1;\nend;\n",
		},
		{
			name:  "single-statement WHILE normalised to BEGIN END",
			input: "WHILE @i < 10 SET @i = @i + 1;",
			want:  "while @i < 10\nbegin\n\tset @i = @i + 1;\nend;\n",
		},
		{
			name:  "WHILE with BREAK (RawStmt fallback)",
			input: "WHILE 1 = 1 BEGIN SET @i = @i + 1; IF @i > 10 BREAK; END;",
			want:  "while 1 = 1\nbegin\n\tset @i = @i + 1;\n\n\tif @i > 10\n\tbegin\n\t\tbreak;\n\tend;\nend;\n",
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
