package formatter

import "testing"

func TestFormat(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "simple select",
			input: "SELECT 1",
			want:  "SELECT 1",
		},
		{
			name:  "empty input",
			input: "",
			want:  "",
		},
		{
			name:  "preserves newlines",
			input: "SELECT\n1",
			want:  "SELECT\n1",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Format(tt.input)
			if err != nil {
				t.Fatalf("Format() unexpected error: %v", err)
			}
			if got != tt.want {
				t.Errorf("Format() =\n%q\nwant\n%q", got, tt.want)
			}
		})
	}
}
