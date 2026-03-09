package formatter_test

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
	"github.com/rpf3/sqlfmt/internal/formatter"
)

// BenchmarkFormat runs sub-benchmarks for each corpus category (tables, views,
// indexes, migrations) and a full-corpus run. All files in a category are read
// once before b.ResetTimer() so the measured loop covers pure formatting
// throughput without filesystem overhead.
func BenchmarkFormat(b *testing.B) {
	for _, cat := range []string{"tables", "views", "indexes", "migrations"} {
		b.Run(cat, func(b *testing.B) {
			inputs := readBenchDir(b, filepath.Join("testdata/bench", cat))
			cfg := config.Default()
			b.ResetTimer()
			for b.Loop() {
				for _, sql := range inputs {
					_, _ = formatter.Format(sql, cfg)
				}
			}
		})
	}
}

// BenchmarkFormatFull runs all corpus files in a single loop, providing a
// single ns/op number representative of the complete benchmark corpus.
func BenchmarkFormatFull(b *testing.B) {
	var inputs []string
	for _, cat := range []string{"tables", "views", "indexes", "migrations"} {
		inputs = append(inputs, readBenchDir(b, filepath.Join("testdata/bench", cat))...)
	}
	cfg := config.Default()
	b.ResetTimer()
	for b.Loop() {
		for _, sql := range inputs {
			_, _ = formatter.Format(sql, cfg)
		}
	}
}

// readBenchDir reads all .sql files in dir and returns their contents.
// It calls b.Fatal if the directory cannot be read or any file fails to open.
func readBenchDir(b *testing.B, dir string) []string {
	b.Helper()
	entries, err := os.ReadDir(dir)
	if err != nil {
		b.Fatalf("readBenchDir: cannot read %s: %v", dir, err)
	}
	var contents []string
	for _, e := range entries {
		if e.IsDir() || filepath.Ext(e.Name()) != ".sql" {
			continue
		}
		data, err := os.ReadFile(filepath.Join(dir, e.Name()))
		if err != nil {
			b.Fatalf("readBenchDir: cannot read %s: %v", e.Name(), err)
		}
		contents = append(contents, string(data))
	}
	if len(contents) == 0 {
		b.Fatalf("readBenchDir: no .sql files found in %s", dir)
	}
	return contents
}
