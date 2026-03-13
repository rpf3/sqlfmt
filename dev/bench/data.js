window.BENCHMARK_DATA = {
  "lastUpdate": 1773404851080,
  "repoUrl": "https://github.com/rpf3/sqlfmt",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "7f4a649be43710f68fe31ecbd6d39e83ea6dc61c",
          "message": "ci: ensure gh-pages branch exists before storing benchmark results\n\nbenchmark-action/github-action-benchmark cannot create the gh-pages\nbranch from scratch; it requires the ref to already exist. Add a guard\nstep that fetches the branch or creates an empty orphan and pushes it\non first run. The branch itself was also bootstrapped manually.",
          "timestamp": "2026-03-09T19:47:06-04:00",
          "tree_id": "01fed2c7d53e61fb5f868655298eb6817f21926f",
          "url": "https://github.com/rpf3/sqlfmt/commit/7f4a649be43710f68fe31ecbd6d39e83ea6dc61c"
        },
        "date": 1773100092206,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 291442,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "3835 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 291442,
            "unit": "ns/op",
            "extra": "3835 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "3835 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3835 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 287990,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "3576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 287990,
            "unit": "ns/op",
            "extra": "3576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "3576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 312771,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "3908 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 312771,
            "unit": "ns/op",
            "extra": "3908 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "3908 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3908 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 176679,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "6105 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 176679,
            "unit": "ns/op",
            "extra": "6105 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "6105 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "6105 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 169279,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "7078 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 169279,
            "unit": "ns/op",
            "extra": "7078 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "7078 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "7078 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 170637,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "6487 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 170637,
            "unit": "ns/op",
            "extra": "6487 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "6487 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "6487 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 47358,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24817 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 47358,
            "unit": "ns/op",
            "extra": "24817 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24817 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24817 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 47686,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "25012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 47686,
            "unit": "ns/op",
            "extra": "25012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "25012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "25012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48300,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24750 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48300,
            "unit": "ns/op",
            "extra": "24750 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24750 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24750 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 221129,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5413 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 221129,
            "unit": "ns/op",
            "extra": "5413 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5413 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5413 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 217891,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5092 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 217891,
            "unit": "ns/op",
            "extra": "5092 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5092 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5092 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 220781,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5588 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 220781,
            "unit": "ns/op",
            "extra": "5588 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5588 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5588 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 786714,
            "unit": "ns/op\t  342377 B/op\t    6914 allocs/op",
            "extra": "1483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 786714,
            "unit": "ns/op",
            "extra": "1483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342377,
            "unit": "B/op",
            "extra": "1483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 785596,
            "unit": "ns/op\t  342376 B/op\t    6914 allocs/op",
            "extra": "1494 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 785596,
            "unit": "ns/op",
            "extra": "1494 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342376,
            "unit": "B/op",
            "extra": "1494 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1494 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 760518,
            "unit": "ns/op\t  342376 B/op\t    6914 allocs/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 760518,
            "unit": "ns/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342376,
            "unit": "B/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 969.9,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1246045 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 969.9,
            "unit": "ns/op",
            "extra": "1246045 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1246045 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1246045 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1010,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1152021 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1010,
            "unit": "ns/op",
            "extra": "1152021 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1152021 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1152021 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 996.1,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1195363 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 996.1,
            "unit": "ns/op",
            "extra": "1195363 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1195363 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1195363 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5631,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "220708 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5631,
            "unit": "ns/op",
            "extra": "220708 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "220708 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "220708 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6013,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "212328 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6013,
            "unit": "ns/op",
            "extra": "212328 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "212328 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "212328 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5504,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "195732 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5504,
            "unit": "ns/op",
            "extra": "195732 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "195732 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "195732 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10060,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "106244 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10060,
            "unit": "ns/op",
            "extra": "106244 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "106244 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "106244 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9891,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "120747 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9891,
            "unit": "ns/op",
            "extra": "120747 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "120747 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "120747 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9807,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "124837 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9807,
            "unit": "ns/op",
            "extra": "124837 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "124837 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "124837 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11207,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "104858 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11207,
            "unit": "ns/op",
            "extra": "104858 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "104858 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "104858 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11205,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "107612 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11205,
            "unit": "ns/op",
            "extra": "107612 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "107612 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "107612 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11390,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "102211 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11390,
            "unit": "ns/op",
            "extra": "102211 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "102211 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "102211 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13464,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "88492 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13464,
            "unit": "ns/op",
            "extra": "88492 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "88492 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "88492 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14380,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "90343 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14380,
            "unit": "ns/op",
            "extra": "90343 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "90343 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "90343 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13454,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "88052 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13454,
            "unit": "ns/op",
            "extra": "88052 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "88052 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "88052 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12670,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "92202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12670,
            "unit": "ns/op",
            "extra": "92202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "92202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "92202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12618,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "95312 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12618,
            "unit": "ns/op",
            "extra": "95312 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "95312 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "95312 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12699,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "97473 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12699,
            "unit": "ns/op",
            "extra": "97473 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "97473 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "97473 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15274,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "78109 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15274,
            "unit": "ns/op",
            "extra": "78109 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "78109 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "78109 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15142,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "78748 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15142,
            "unit": "ns/op",
            "extra": "78748 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "78748 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "78748 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 14872,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "78854 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 14872,
            "unit": "ns/op",
            "extra": "78854 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "78854 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "78854 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10285,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "115388 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10285,
            "unit": "ns/op",
            "extra": "115388 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "115388 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "115388 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10858,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "106329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10858,
            "unit": "ns/op",
            "extra": "106329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "106329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "106329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9940,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "122539 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9940,
            "unit": "ns/op",
            "extra": "122539 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "122539 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "122539 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6102,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "201888 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6102,
            "unit": "ns/op",
            "extra": "201888 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "201888 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "201888 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6116,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "186087 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6116,
            "unit": "ns/op",
            "extra": "186087 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "186087 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "186087 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6200,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "194534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6200,
            "unit": "ns/op",
            "extra": "194534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "194534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "194534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12828,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "91765 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12828,
            "unit": "ns/op",
            "extra": "91765 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "91765 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "91765 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12673,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "92736 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12673,
            "unit": "ns/op",
            "extra": "92736 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "92736 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "92736 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12736,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "85804 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12736,
            "unit": "ns/op",
            "extra": "85804 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "85804 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "85804 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "98769bd8e36af25fec58ca96a4790e5d8a41ad3a",
          "message": "feat: split UPDATE JOIN ON predicates across lines on AND\n\nThe UPDATE formatter was calling parser.Render(jc.On) directly for JOIN\nON conditions, collapsing multi-AND predicates onto a single line.\nSELECT JOIN ON already used the AndTerms() split loop introduced in the\nExpr interface work; this change applies the same pattern to the UPDATE\nformatter so both statement types are consistent.\n\nThe fix mirrors format_select.go lines 117-121 exactly: call\nparser.AndTerms(jc.On), write the first term after \"on\", then write\neach subsequent term on its own line prefixed with \"and\" at the same\ndouble-indent level.\n\nCloses #101",
          "timestamp": "2026-03-11T10:09:42-04:00",
          "tree_id": "24d5df72a162361d28b1293920b157ce6d01c168",
          "url": "https://github.com/rpf3/sqlfmt/commit/98769bd8e36af25fec58ca96a4790e5d8a41ad3a"
        },
        "date": 1773238256247,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 313136,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "3601 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 313136,
            "unit": "ns/op",
            "extra": "3601 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "3601 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3601 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 329854,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "3886 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 329854,
            "unit": "ns/op",
            "extra": "3886 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "3886 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3886 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 308021,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "3982 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 308021,
            "unit": "ns/op",
            "extra": "3982 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "3982 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3982 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 184491,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "6440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 184491,
            "unit": "ns/op",
            "extra": "6440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "6440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "6440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 176899,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "6031 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 176899,
            "unit": "ns/op",
            "extra": "6031 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "6031 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "6031 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 175302,
            "unit": "ns/op\t   63176 B/op\t    1963 allocs/op",
            "extra": "7039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 175302,
            "unit": "ns/op",
            "extra": "7039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63176,
            "unit": "B/op",
            "extra": "7039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 1963,
            "unit": "allocs/op",
            "extra": "7039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 49136,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24264 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 49136,
            "unit": "ns/op",
            "extra": "24264 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24264 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24264 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48774,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24832 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48774,
            "unit": "ns/op",
            "extra": "24832 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24832 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24832 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48716,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48716,
            "unit": "ns/op",
            "extra": "24652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 233234,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 233234,
            "unit": "ns/op",
            "extra": "5012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5012 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 234060,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5392 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 234060,
            "unit": "ns/op",
            "extra": "5392 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5392 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5392 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 233209,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5194 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 233209,
            "unit": "ns/op",
            "extra": "5194 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5194 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5194 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 812810,
            "unit": "ns/op\t  342376 B/op\t    6914 allocs/op",
            "extra": "1484 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 812810,
            "unit": "ns/op",
            "extra": "1484 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342376,
            "unit": "B/op",
            "extra": "1484 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1484 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 829831,
            "unit": "ns/op\t  342377 B/op\t    6914 allocs/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 829831,
            "unit": "ns/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342377,
            "unit": "B/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1531 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 864305,
            "unit": "ns/op\t  342376 B/op\t    6914 allocs/op",
            "extra": "1394 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 864305,
            "unit": "ns/op",
            "extra": "1394 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 342376,
            "unit": "B/op",
            "extra": "1394 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6914,
            "unit": "allocs/op",
            "extra": "1394 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1022,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1022,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 998.8,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1206991 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 998.8,
            "unit": "ns/op",
            "extra": "1206991 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1206991 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1206991 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1051,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1051,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6049,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "205832 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6049,
            "unit": "ns/op",
            "extra": "205832 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "205832 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "205832 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5597,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "216009 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5597,
            "unit": "ns/op",
            "extra": "216009 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "216009 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "216009 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5772,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "201331 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5772,
            "unit": "ns/op",
            "extra": "201331 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "201331 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "201331 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9956,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "120112 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9956,
            "unit": "ns/op",
            "extra": "120112 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "120112 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "120112 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10262,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "119170 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10262,
            "unit": "ns/op",
            "extra": "119170 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "119170 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "119170 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9963,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118128 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9963,
            "unit": "ns/op",
            "extra": "118128 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118128 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118128 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12053,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "98692 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12053,
            "unit": "ns/op",
            "extra": "98692 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "98692 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "98692 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12462,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "89499 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12462,
            "unit": "ns/op",
            "extra": "89499 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "89499 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "89499 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13189,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "101570 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13189,
            "unit": "ns/op",
            "extra": "101570 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "101570 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "101570 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13907,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "84594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13907,
            "unit": "ns/op",
            "extra": "84594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "84594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "84594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13815,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "86929 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13815,
            "unit": "ns/op",
            "extra": "86929 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "86929 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "86929 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13780,
            "unit": "ns/op\t    2968 B/op\t     177 allocs/op",
            "extra": "88260 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13780,
            "unit": "ns/op",
            "extra": "88260 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "88260 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "88260 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13753,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "87590 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13753,
            "unit": "ns/op",
            "extra": "87590 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "87590 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "87590 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13318,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "88744 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13318,
            "unit": "ns/op",
            "extra": "88744 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "88744 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "88744 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13516,
            "unit": "ns/op\t    3648 B/op\t     174 allocs/op",
            "extra": "89077 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13516,
            "unit": "ns/op",
            "extra": "89077 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3648,
            "unit": "B/op",
            "extra": "89077 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "89077 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15904,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "74965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15904,
            "unit": "ns/op",
            "extra": "74965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "74965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "74965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15609,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "78160 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15609,
            "unit": "ns/op",
            "extra": "78160 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "78160 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "78160 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16676,
            "unit": "ns/op\t    3568 B/op\t     210 allocs/op",
            "extra": "70329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16676,
            "unit": "ns/op",
            "extra": "70329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3568,
            "unit": "B/op",
            "extra": "70329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 210,
            "unit": "allocs/op",
            "extra": "70329 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10554,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "113613 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10554,
            "unit": "ns/op",
            "extra": "113613 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "113613 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "113613 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10555,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "112394 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10555,
            "unit": "ns/op",
            "extra": "112394 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "112394 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "112394 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10607,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "114974 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10607,
            "unit": "ns/op",
            "extra": "114974 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "114974 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "114974 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6503,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188697 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6503,
            "unit": "ns/op",
            "extra": "188697 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188697 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188697 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6400,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "189348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6400,
            "unit": "ns/op",
            "extra": "189348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "189348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "189348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6396,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "185169 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6396,
            "unit": "ns/op",
            "extra": "185169 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "185169 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "185169 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13744,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "88304 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13744,
            "unit": "ns/op",
            "extra": "88304 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "88304 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "88304 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13210,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "86439 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13210,
            "unit": "ns/op",
            "extra": "86439 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "86439 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "86439 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13119,
            "unit": "ns/op\t    3048 B/op\t     150 allocs/op",
            "extra": "91678 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13119,
            "unit": "ns/op",
            "extra": "91678 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3048,
            "unit": "B/op",
            "extra": "91678 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 150,
            "unit": "allocs/op",
            "extra": "91678 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "e2aa33b5db9802924724e3e4cbbfdf51d8de0940",
          "message": "refactor: parse function calls into FunctionCallExpr (#124)\n\nIntroduces `parseExprNode()` as a smarter alternative to the old\n`parseExpr()` bridge.  When the current token is an Ident immediately\nfollowed by LParen, `parseExprNode` delegates to `parseFunctionCall()`\nwhich builds a structured `*FunctionCallExpr`.  If more tokens follow\nafter the closing paren (e.g. `count(*) + 1`), it renders the node back\nto a string and accumulates the remainder as a `*RawExpr`, so the render\ninvariant (`Render(result) == parseExprRaw(same input)`) is preserved\nunconditionally.\n\n`parseFunctionCall()` handles bare calls (`now()`), star calls\n(`count(*)`), single- and multi-arg calls, and nested calls\n(`coalesce(nullif(...))`).  It also detects `OVER (` immediately after\nthe closing paren and delegates to `parseWindowSpec()`, which reads\n`PARTITION BY` and `ORDER BY` items into the new `WindowSpec` struct.\n\n`WindowSpec` and the `Over *WindowSpec` field were added to\n`FunctionCallExpr` in `expr.go`; `Render()` emits the full\n`… over (partition by … order by …)` suffix and `Walk()` recurses\ninto both `PartitionBy` and `OrderBy` expressions.  This unblocks\nissue #32 (lint: window function ORDER BY direction), which needs\n`Walk` to find window-function OVER clauses.\n\n`parseExpr()` and `parseAndChain()` are updated to call\n`parseExprNode()`; function calls that appear as top-level AND terms\nare now lifted to `*FunctionCallExpr` nodes while multi-term chains\nstill produce `*AndChain`.\n\nAll existing formatter golden tests pass unchanged, confirming that\nevery function-call pattern in the test corpus renders byte-for-byte\nidentically to before.\n\nCloses #124",
          "timestamp": "2026-03-11T10:33:31-04:00",
          "tree_id": "de52a2fa107f5bb9d3117bd4e05f404882130b16",
          "url": "https://github.com/rpf3/sqlfmt/commit/e2aa33b5db9802924724e3e4cbbfdf51d8de0940"
        },
        "date": 1773239701421,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 295852,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "3656 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 295852,
            "unit": "ns/op",
            "extra": "3656 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "3656 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3656 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 295536,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "4040 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 295536,
            "unit": "ns/op",
            "extra": "4040 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "4040 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "4040 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 295993,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "4015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 295993,
            "unit": "ns/op",
            "extra": "4015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "4015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "4015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 172574,
            "unit": "ns/op\t   61559 B/op\t    2013 allocs/op",
            "extra": "6462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 172574,
            "unit": "ns/op",
            "extra": "6462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61559,
            "unit": "B/op",
            "extra": "6462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "6462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 170510,
            "unit": "ns/op\t   61560 B/op\t    2013 allocs/op",
            "extra": "7015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 170510,
            "unit": "ns/op",
            "extra": "7015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61560,
            "unit": "B/op",
            "extra": "7015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "7015 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 169326,
            "unit": "ns/op\t   61560 B/op\t    2013 allocs/op",
            "extra": "6504 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 169326,
            "unit": "ns/op",
            "extra": "6504 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61560,
            "unit": "B/op",
            "extra": "6504 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "6504 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 52178,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24684 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 52178,
            "unit": "ns/op",
            "extra": "24684 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24684 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24684 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48860,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24297 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48860,
            "unit": "ns/op",
            "extra": "24297 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24297 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24297 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48652,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24628 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48652,
            "unit": "ns/op",
            "extra": "24628 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24628 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24628 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 221056,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 221056,
            "unit": "ns/op",
            "extra": "5440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5440 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 220749,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 220749,
            "unit": "ns/op",
            "extra": "5317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 221763,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5246 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 221763,
            "unit": "ns/op",
            "extra": "5246 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5246 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5246 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 809312,
            "unit": "ns/op\t  340776 B/op\t    6964 allocs/op",
            "extra": "1471 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 809312,
            "unit": "ns/op",
            "extra": "1471 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340776,
            "unit": "B/op",
            "extra": "1471 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1471 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 800469,
            "unit": "ns/op\t  340774 B/op\t    6964 allocs/op",
            "extra": "1495 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 800469,
            "unit": "ns/op",
            "extra": "1495 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340774,
            "unit": "B/op",
            "extra": "1495 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1495 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 803267,
            "unit": "ns/op\t  340776 B/op\t    6964 allocs/op",
            "extra": "1521 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 803267,
            "unit": "ns/op",
            "extra": "1521 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340776,
            "unit": "B/op",
            "extra": "1521 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1521 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1016,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1016,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1019,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1019,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1006,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1006,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5744,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "210360 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5744,
            "unit": "ns/op",
            "extra": "210360 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "210360 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "210360 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5671,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "211831 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5671,
            "unit": "ns/op",
            "extra": "211831 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "211831 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "211831 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5711,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "208741 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5711,
            "unit": "ns/op",
            "extra": "208741 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "208741 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "208741 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10277,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "113804 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10277,
            "unit": "ns/op",
            "extra": "113804 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "113804 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "113804 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10206,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118555 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10206,
            "unit": "ns/op",
            "extra": "118555 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118555 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118555 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10176,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "115658 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10176,
            "unit": "ns/op",
            "extra": "115658 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "115658 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "115658 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12303,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "97599 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12303,
            "unit": "ns/op",
            "extra": "97599 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "97599 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "97599 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11941,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "96181 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11941,
            "unit": "ns/op",
            "extra": "96181 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "96181 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "96181 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11603,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "105020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11603,
            "unit": "ns/op",
            "extra": "105020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "105020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "105020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13702,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "86899 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13702,
            "unit": "ns/op",
            "extra": "86899 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "86899 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "86899 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13881,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "84313 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13881,
            "unit": "ns/op",
            "extra": "84313 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "84313 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "84313 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14044,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "82544 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14044,
            "unit": "ns/op",
            "extra": "82544 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "82544 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "82544 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13218,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "89763 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13218,
            "unit": "ns/op",
            "extra": "89763 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "89763 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "89763 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13541,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "87856 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13541,
            "unit": "ns/op",
            "extra": "87856 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "87856 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "87856 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13990,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "91182 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13990,
            "unit": "ns/op",
            "extra": "91182 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "91182 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "91182 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15592,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "77762 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15592,
            "unit": "ns/op",
            "extra": "77762 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "77762 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "77762 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15478,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "77248 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15478,
            "unit": "ns/op",
            "extra": "77248 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "77248 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "77248 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15424,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "77037 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15424,
            "unit": "ns/op",
            "extra": "77037 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "77037 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "77037 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10242,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117702 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10242,
            "unit": "ns/op",
            "extra": "117702 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117702 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117702 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10300,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "116425 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10300,
            "unit": "ns/op",
            "extra": "116425 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "116425 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "116425 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10297,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "116769 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10297,
            "unit": "ns/op",
            "extra": "116769 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "116769 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "116769 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6347,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188097 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6347,
            "unit": "ns/op",
            "extra": "188097 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188097 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188097 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6567,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188324 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6567,
            "unit": "ns/op",
            "extra": "188324 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188324 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188324 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6534,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "180556 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6534,
            "unit": "ns/op",
            "extra": "180556 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "180556 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "180556 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12906,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "94808 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12906,
            "unit": "ns/op",
            "extra": "94808 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "94808 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94808 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12576,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "94864 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12576,
            "unit": "ns/op",
            "extra": "94864 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "94864 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94864 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12619,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "95686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12619,
            "unit": "ns/op",
            "extra": "95686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "95686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "95686 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "45674e8580e1c3ff73af9b697df2dcdfd2f73e4a",
          "message": "feat: lint window function ORDER BY direction (#32)\n\nAdds the `window-order-direction` lint rule, which warns whenever a\nwindow function's OVER clause contains an ORDER BY column without an\nexplicit ASC or DESC direction.\n\nThe check uses `parser.Walk()` on each SELECT column expression.  When\nWalk reaches a `*FunctionCallExpr` whose `Over` field is non-nil, it\ninspects each `Over.OrderBy` item; any item with `DirectionNone`\ntriggers a warning naming both the function and the column.  This was\nonly possible after PR #129 lifted function calls into structured\n`*FunctionCallExpr` AST nodes with a `WindowSpec` that carries typed\nORDER BY items (#124).\n\nThe rule name `window-order-direction` is registered in `config.go`\nalongside the existing `order-by-direction` rule (issue #31), which\nenforces the same convention at the top-level SELECT ORDER BY.\n\nCloses #32",
          "timestamp": "2026-03-11T10:52:05-04:00",
          "tree_id": "f66ab8ffbeede3cb4e6e8a2a1cdf453d5c5b4a48",
          "url": "https://github.com/rpf3/sqlfmt/commit/45674e8580e1c3ff73af9b697df2dcdfd2f73e4a"
        },
        "date": 1773240800206,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 300007,
            "unit": "ns/op\t  150337 B/op\t    2357 allocs/op",
            "extra": "3741 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 300007,
            "unit": "ns/op",
            "extra": "3741 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150337,
            "unit": "B/op",
            "extra": "3741 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3741 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 294597,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "4156 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 294597,
            "unit": "ns/op",
            "extra": "4156 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "4156 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "4156 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 294903,
            "unit": "ns/op\t  150336 B/op\t    2357 allocs/op",
            "extra": "3867 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 294903,
            "unit": "ns/op",
            "extra": "3867 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 150336,
            "unit": "B/op",
            "extra": "3867 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2357,
            "unit": "allocs/op",
            "extra": "3867 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 172123,
            "unit": "ns/op\t   61560 B/op\t    2013 allocs/op",
            "extra": "6477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 172123,
            "unit": "ns/op",
            "extra": "6477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61560,
            "unit": "B/op",
            "extra": "6477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "6477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 170510,
            "unit": "ns/op\t   61559 B/op\t    2013 allocs/op",
            "extra": "7006 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 170510,
            "unit": "ns/op",
            "extra": "7006 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61559,
            "unit": "B/op",
            "extra": "7006 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "7006 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 171944,
            "unit": "ns/op\t   61558 B/op\t    2013 allocs/op",
            "extra": "6930 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 171944,
            "unit": "ns/op",
            "extra": "6930 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 61558,
            "unit": "B/op",
            "extra": "6930 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2013,
            "unit": "allocs/op",
            "extra": "6930 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48711,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24540 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48711,
            "unit": "ns/op",
            "extra": "24540 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24540 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24540 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 48564,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "24666 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 48564,
            "unit": "ns/op",
            "extra": "24666 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "24666 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "24666 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 52335,
            "unit": "ns/op\t   19928 B/op\t     570 allocs/op",
            "extra": "21130 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 52335,
            "unit": "ns/op",
            "extra": "21130 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 19928,
            "unit": "B/op",
            "extra": "21130 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 570,
            "unit": "allocs/op",
            "extra": "21130 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 222742,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "4909 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 222742,
            "unit": "ns/op",
            "extra": "4909 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "4909 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "4909 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 224017,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "4557 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 224017,
            "unit": "ns/op",
            "extra": "4557 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "4557 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "4557 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 221150,
            "unit": "ns/op\t  108936 B/op\t    2024 allocs/op",
            "extra": "5472 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 221150,
            "unit": "ns/op",
            "extra": "5472 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 108936,
            "unit": "B/op",
            "extra": "5472 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2024,
            "unit": "allocs/op",
            "extra": "5472 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 791507,
            "unit": "ns/op\t  340775 B/op\t    6964 allocs/op",
            "extra": "1519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 791507,
            "unit": "ns/op",
            "extra": "1519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340775,
            "unit": "B/op",
            "extra": "1519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 800802,
            "unit": "ns/op\t  340777 B/op\t    6964 allocs/op",
            "extra": "1389 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 800802,
            "unit": "ns/op",
            "extra": "1389 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340777,
            "unit": "B/op",
            "extra": "1389 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1389 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 787605,
            "unit": "ns/op\t  340767 B/op\t    6964 allocs/op",
            "extra": "1528 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 787605,
            "unit": "ns/op",
            "extra": "1528 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 340767,
            "unit": "B/op",
            "extra": "1528 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 6964,
            "unit": "allocs/op",
            "extra": "1528 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1013,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1013,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1008,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1008,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1112,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1112,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5718,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "209792 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5718,
            "unit": "ns/op",
            "extra": "209792 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "209792 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "209792 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5730,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "210193 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5730,
            "unit": "ns/op",
            "extra": "210193 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "210193 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "210193 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5734,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "213195 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5734,
            "unit": "ns/op",
            "extra": "213195 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "213195 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "213195 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10077,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117205 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10077,
            "unit": "ns/op",
            "extra": "117205 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117205 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117205 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10569,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "97982 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10569,
            "unit": "ns/op",
            "extra": "97982 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "97982 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "97982 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10382,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "108259 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10382,
            "unit": "ns/op",
            "extra": "108259 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "108259 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "108259 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11626,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "100167 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11626,
            "unit": "ns/op",
            "extra": "100167 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "100167 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "100167 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 11670,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "100928 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 11670,
            "unit": "ns/op",
            "extra": "100928 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "100928 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "100928 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 12680,
            "unit": "ns/op\t    4960 B/op\t     106 allocs/op",
            "extra": "91994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 12680,
            "unit": "ns/op",
            "extra": "91994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4960,
            "unit": "B/op",
            "extra": "91994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 106,
            "unit": "allocs/op",
            "extra": "91994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14068,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "85000 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14068,
            "unit": "ns/op",
            "extra": "85000 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "85000 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "85000 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14042,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "84780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14042,
            "unit": "ns/op",
            "extra": "84780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "84780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "84780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13962,
            "unit": "ns/op\t    3200 B/op\t     186 allocs/op",
            "extra": "85188 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13962,
            "unit": "ns/op",
            "extra": "85188 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3200,
            "unit": "B/op",
            "extra": "85188 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 186,
            "unit": "allocs/op",
            "extra": "85188 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13341,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "89371 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13341,
            "unit": "ns/op",
            "extra": "89371 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "89371 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "89371 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13347,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "89209 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13347,
            "unit": "ns/op",
            "extra": "89209 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "89209 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "89209 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13631,
            "unit": "ns/op\t    3712 B/op\t     175 allocs/op",
            "extra": "89020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13631,
            "unit": "ns/op",
            "extra": "89020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3712,
            "unit": "B/op",
            "extra": "89020 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "89020 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15670,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "75984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15670,
            "unit": "ns/op",
            "extra": "75984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "75984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "75984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16731,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "76402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16731,
            "unit": "ns/op",
            "extra": "76402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "76402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "76402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15669,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "76563 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15669,
            "unit": "ns/op",
            "extra": "76563 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "76563 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "76563 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10514,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "107986 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10514,
            "unit": "ns/op",
            "extra": "107986 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "107986 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "107986 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10438,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "114846 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10438,
            "unit": "ns/op",
            "extra": "114846 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "114846 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "114846 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10434,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "115498 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10434,
            "unit": "ns/op",
            "extra": "115498 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "115498 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "115498 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6446,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "183464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6446,
            "unit": "ns/op",
            "extra": "183464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "183464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "183464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6508,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "182464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6508,
            "unit": "ns/op",
            "extra": "182464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "182464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "182464 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6452,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "183327 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6452,
            "unit": "ns/op",
            "extra": "183327 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "183327 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "183327 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13116,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "90536 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13116,
            "unit": "ns/op",
            "extra": "90536 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "90536 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "90536 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13020,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "89878 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13020,
            "unit": "ns/op",
            "extra": "89878 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "89878 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "89878 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12878,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "91831 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12878,
            "unit": "ns/op",
            "extra": "91831 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "91831 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "91831 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "99fc9a6b3d381fee3a6ee95699afc3af8807c9ba",
          "message": "feat: identifier-with-spaces lint rule\n\nAdd the identifier-with-spaces lint rule (#61). The rule warns when any\nuser-defined DDL identifier — table name, column name, constraint name,\nindex name, or view name — contains embedded whitespace after unquoting.\n\nIdentifiers with spaces require bracket or double-quote quoting everywhere\nthey appear, which is fragile and error-prone. The rule nudges authors\ntoward rename rather than quoting.\n\nImplementation:\n- config: RuleIdentifierWithSpaces = \"identifier-with-spaces\" added to\n  the rule constants and knownRules map.\n- lint_idents.go: checkIdentSpaces(name, ctx) calls lexer.UnquoteIdent()\n  (stripping [brackets] or \"double-quotes\") then checks\n  strings.ContainsAny(bare, \" \\t\"). checkIdentsWithSpaces(stmt) visits the\n  same identifier fields as checkNamingForStatement. Wired into\n  checkStatement after the casing check.\n- The rule is enabled at \"warn\" severity by default (same pattern as all\n  other rules). Suppression via lint.identifier-with-spaces: off.\n\nCloses #61",
          "timestamp": "2026-03-11T12:46:09-04:00",
          "tree_id": "816b0ebc92e87ff574fdc22899856c106db4bc47",
          "url": "https://github.com/rpf3/sqlfmt/commit/99fc9a6b3d381fee3a6ee95699afc3af8807c9ba"
        },
        "date": 1773247639780,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 348211,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "2916 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 348211,
            "unit": "ns/op",
            "extra": "2916 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "2916 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "2916 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 348121,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 348121,
            "unit": "ns/op",
            "extra": "3477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3477 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 351624,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 351624,
            "unit": "ns/op",
            "extra": "3462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3462 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 244304,
            "unit": "ns/op\t   62672 B/op\t    2101 allocs/op",
            "extra": "6314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 244304,
            "unit": "ns/op",
            "extra": "6314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 62672,
            "unit": "B/op",
            "extra": "6314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 180514,
            "unit": "ns/op\t   62672 B/op\t    2101 allocs/op",
            "extra": "6060 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 180514,
            "unit": "ns/op",
            "extra": "6060 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 62672,
            "unit": "B/op",
            "extra": "6060 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6060 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 182280,
            "unit": "ns/op\t   62670 B/op\t    2101 allocs/op",
            "extra": "6583 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 182280,
            "unit": "ns/op",
            "extra": "6583 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 62670,
            "unit": "B/op",
            "extra": "6583 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6583 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 64856,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "17532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 64856,
            "unit": "ns/op",
            "extra": "17532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "17532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "17532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59785,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20139 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59785,
            "unit": "ns/op",
            "extra": "20139 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20139 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20139 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59602,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20084 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59602,
            "unit": "ns/op",
            "extra": "20084 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20084 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20084 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 266195,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4330 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 266195,
            "unit": "ns/op",
            "extra": "4330 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4330 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4330 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 261939,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4612 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 261939,
            "unit": "ns/op",
            "extra": "4612 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4612 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4612 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 262258,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 262258,
            "unit": "ns/op",
            "extra": "4329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 909717,
            "unit": "ns/op\t  356062 B/op\t    8076 allocs/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 909717,
            "unit": "ns/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356062,
            "unit": "B/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 932353,
            "unit": "ns/op\t  356057 B/op\t    8076 allocs/op",
            "extra": "1311 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 932353,
            "unit": "ns/op",
            "extra": "1311 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356057,
            "unit": "B/op",
            "extra": "1311 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1311 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 938811,
            "unit": "ns/op\t  356053 B/op\t    8076 allocs/op",
            "extra": "1255 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 938811,
            "unit": "ns/op",
            "extra": "1255 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356053,
            "unit": "B/op",
            "extra": "1255 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1255 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1002,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1002,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1009,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1183478 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1009,
            "unit": "ns/op",
            "extra": "1183478 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1183478 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1183478 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1030,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "971278 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1030,
            "unit": "ns/op",
            "extra": "971278 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "971278 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "971278 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5670,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "211773 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5670,
            "unit": "ns/op",
            "extra": "211773 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "211773 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "211773 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5668,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "207962 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5668,
            "unit": "ns/op",
            "extra": "207962 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "207962 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "207962 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5711,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "198582 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5711,
            "unit": "ns/op",
            "extra": "198582 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "198582 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "198582 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10068,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "119858 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10068,
            "unit": "ns/op",
            "extra": "119858 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "119858 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "119858 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10025,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "115934 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10025,
            "unit": "ns/op",
            "extra": "115934 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "115934 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "115934 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 11029,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118548 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 11029,
            "unit": "ns/op",
            "extra": "118548 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118548 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118548 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15095,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "74780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15095,
            "unit": "ns/op",
            "extra": "74780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "74780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "74780 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15223,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79203 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15223,
            "unit": "ns/op",
            "extra": "79203 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79203 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79203 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15152,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "75970 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15152,
            "unit": "ns/op",
            "extra": "75970 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "75970 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75970 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15484,
            "unit": "ns/op\t    3968 B/op\t     201 allocs/op",
            "extra": "76807 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15484,
            "unit": "ns/op",
            "extra": "76807 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3968,
            "unit": "B/op",
            "extra": "76807 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76807 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15388,
            "unit": "ns/op\t    3968 B/op\t     201 allocs/op",
            "extra": "78220 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15388,
            "unit": "ns/op",
            "extra": "78220 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3968,
            "unit": "B/op",
            "extra": "78220 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "78220 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15326,
            "unit": "ns/op\t    3968 B/op\t     201 allocs/op",
            "extra": "77994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15326,
            "unit": "ns/op",
            "extra": "77994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 3968,
            "unit": "B/op",
            "extra": "77994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "77994 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14255,
            "unit": "ns/op\t    4176 B/op\t     185 allocs/op",
            "extra": "84266 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14255,
            "unit": "ns/op",
            "extra": "84266 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4176,
            "unit": "B/op",
            "extra": "84266 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "84266 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14121,
            "unit": "ns/op\t    4176 B/op\t     185 allocs/op",
            "extra": "84717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14121,
            "unit": "ns/op",
            "extra": "84717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4176,
            "unit": "B/op",
            "extra": "84717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "84717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15137,
            "unit": "ns/op\t    4176 B/op\t     185 allocs/op",
            "extra": "84765 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15137,
            "unit": "ns/op",
            "extra": "84765 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4176,
            "unit": "B/op",
            "extra": "84765 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "84765 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15652,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "76208 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15652,
            "unit": "ns/op",
            "extra": "76208 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "76208 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "76208 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16093,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "66918 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16093,
            "unit": "ns/op",
            "extra": "66918 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "66918 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "66918 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15371,
            "unit": "ns/op\t    3704 B/op\t     216 allocs/op",
            "extra": "77664 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15371,
            "unit": "ns/op",
            "extra": "77664 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3704,
            "unit": "B/op",
            "extra": "77664 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "77664 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10108,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118290 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10108,
            "unit": "ns/op",
            "extra": "118290 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118290 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118290 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10134,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119046 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10134,
            "unit": "ns/op",
            "extra": "119046 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119046 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119046 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10088,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117176 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10088,
            "unit": "ns/op",
            "extra": "117176 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117176 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117176 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6260,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "185526 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6260,
            "unit": "ns/op",
            "extra": "185526 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "185526 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "185526 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6654,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "194958 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6654,
            "unit": "ns/op",
            "extra": "194958 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "194958 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "194958 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6169,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "186308 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6169,
            "unit": "ns/op",
            "extra": "186308 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "186308 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "186308 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12843,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "93016 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12843,
            "unit": "ns/op",
            "extra": "93016 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "93016 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93016 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12502,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "96138 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12502,
            "unit": "ns/op",
            "extra": "96138 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "96138 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "96138 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12702,
            "unit": "ns/op\t    3112 B/op\t     151 allocs/op",
            "extra": "94311 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12702,
            "unit": "ns/op",
            "extra": "94311 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3112,
            "unit": "B/op",
            "extra": "94311 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94311 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "362272170391d7d0bc76a9734a161fea385d575c",
          "message": "feat: UNION / INTERSECT / EXCEPT set operators\n\nParse and format compound SELECT statements joined by UNION [ALL],\nINTERSECT, and EXCEPT operators.\n\nAST: Add SetOpType (SetOpUnion, SetOpUnionAll, SetOpIntersect,\nSetOpExcept), SetOp{Op, Select}, and SelectStmt.SetOps []SetOp. The\nroot SelectStmt carries the set-op chain; its existing OrderBy/Offset/\nFetch/Limit fields hold the compound query's final pagination, which\nSQL semantics require to apply to the entire combined result.\n\nParser: Split parseSelectCore into two layers. parseSelectBranch\nparses one SELECT through HAVING, stopping before set operators and\nORDER BY. parseSelectCore chains branches via a set-op loop, then\nparses ORDER BY/OFFSET/FETCH/LIMIT once on the root. All expression\nstopFns in WHERE, HAVING, GROUP BY, and JOIN ON are extended to stop\nat UNION/INTERSECT/EXCEPT so operands are not absorbed into\nexpressions. This split also cleanly handles UNION inside CTE bodies:\nthe CTE parser calls parseSelectCore on the body, which sees UNION and\nchains the branches before the closing ) is consumed.\n\nFormatter: After HAVING, emit each SetOp as \"\\nunion all\\n<branch>\".\nThe branch is formatted by the existing formatSelectStmt (with the\ntrailing semicolon stripped). indentCTE/indentSubquery work unchanged\nbecause they call formatSelectStmt on the whole compound node and\nprefix every line — union operators inside CTEs are indented correctly\nfor free.\n\nLinter: checkSelectStmt and checkSchemaSelect both recurse into\nsetOp.Select branches so that lint rules (missing-schema-name,\nselect-star, unaliased-table, etc.) fire on every branch of a compound\nquery.\n\nCloses #48",
          "timestamp": "2026-03-11T15:03:43-04:00",
          "tree_id": "1e9efbec76ff127fa8f61ea76a180e55db11fe49",
          "url": "https://github.com/rpf3/sqlfmt/commit/362272170391d7d0bc76a9734a161fea385d575c"
        },
        "date": 1773255893171,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 344829,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 344829,
            "unit": "ns/op",
            "extra": "3229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 347513,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3448 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 347513,
            "unit": "ns/op",
            "extra": "3448 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3448 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3448 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 346726,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3362 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 346726,
            "unit": "ns/op",
            "extra": "3362 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3362 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3362 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 181296,
            "unit": "ns/op\t   63057 B/op\t    2101 allocs/op",
            "extra": "6205 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 181296,
            "unit": "ns/op",
            "extra": "6205 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63057,
            "unit": "B/op",
            "extra": "6205 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6205 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 182028,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "6576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 182028,
            "unit": "ns/op",
            "extra": "6576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "6576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6576 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 185017,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "6716 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 185017,
            "unit": "ns/op",
            "extra": "6716 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "6716 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6716 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 65153,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "17805 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 65153,
            "unit": "ns/op",
            "extra": "17805 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "17805 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "17805 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59025,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20260 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59025,
            "unit": "ns/op",
            "extra": "20260 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20260 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20260 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 60944,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20366 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 60944,
            "unit": "ns/op",
            "extra": "20366 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20366 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20366 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 270387,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4534 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 270387,
            "unit": "ns/op",
            "extra": "4534 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4534 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4534 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 257417,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4393 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 257417,
            "unit": "ns/op",
            "extra": "4393 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4393 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4393 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 259016,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4702 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 259016,
            "unit": "ns/op",
            "extra": "4702 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4702 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4702 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 900490,
            "unit": "ns/op\t  356445 B/op\t    8076 allocs/op",
            "extra": "1226 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 900490,
            "unit": "ns/op",
            "extra": "1226 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356445,
            "unit": "B/op",
            "extra": "1226 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1226 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 911217,
            "unit": "ns/op\t  356442 B/op\t    8076 allocs/op",
            "extra": "1216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 911217,
            "unit": "ns/op",
            "extra": "1216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356442,
            "unit": "B/op",
            "extra": "1216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 916216,
            "unit": "ns/op\t  356437 B/op\t    8076 allocs/op",
            "extra": "1263 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 916216,
            "unit": "ns/op",
            "extra": "1263 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356437,
            "unit": "B/op",
            "extra": "1263 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1263 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1009,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1009,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1001,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1197452 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1001,
            "unit": "ns/op",
            "extra": "1197452 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1197452 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1197452 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 998.3,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1203489 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 998.3,
            "unit": "ns/op",
            "extra": "1203489 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1203489 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1203489 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5589,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "213110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5589,
            "unit": "ns/op",
            "extra": "213110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "213110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "213110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5589,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "205867 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5589,
            "unit": "ns/op",
            "extra": "205867 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "205867 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "205867 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9236,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "111888 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9236,
            "unit": "ns/op",
            "extra": "111888 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "111888 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "111888 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9814,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "123147 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9814,
            "unit": "ns/op",
            "extra": "123147 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "123147 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "123147 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 9885,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "120997 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 9885,
            "unit": "ns/op",
            "extra": "120997 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "120997 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "120997 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10707,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "120728 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10707,
            "unit": "ns/op",
            "extra": "120728 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "120728 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "120728 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14929,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79573 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14929,
            "unit": "ns/op",
            "extra": "79573 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79573 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79573 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15150,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "77946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15150,
            "unit": "ns/op",
            "extra": "77946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "77946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "77946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15040,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79179 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15040,
            "unit": "ns/op",
            "extra": "79179 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79179 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79179 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15583,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "76980 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15583,
            "unit": "ns/op",
            "extra": "76980 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "76980 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76980 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15584,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "76555 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15584,
            "unit": "ns/op",
            "extra": "76555 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "76555 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76555 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15380,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "77314 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15380,
            "unit": "ns/op",
            "extra": "77314 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "77314 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "77314 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14034,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "84709 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14034,
            "unit": "ns/op",
            "extra": "84709 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "84709 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "84709 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14040,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "85414 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14040,
            "unit": "ns/op",
            "extra": "85414 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "85414 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "85414 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15329,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "65874 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15329,
            "unit": "ns/op",
            "extra": "65874 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "65874 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "65874 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16144,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "75478 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16144,
            "unit": "ns/op",
            "extra": "75478 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "75478 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "75478 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15922,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "74533 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15922,
            "unit": "ns/op",
            "extra": "74533 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "74533 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "74533 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16001,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "72705 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16001,
            "unit": "ns/op",
            "extra": "72705 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "72705 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "72705 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10106,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117307 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10106,
            "unit": "ns/op",
            "extra": "117307 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117307 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117307 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10083,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117895 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10083,
            "unit": "ns/op",
            "extra": "117895 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117895 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117895 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10099,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117234 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10099,
            "unit": "ns/op",
            "extra": "117234 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117234 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117234 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6146,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "195608 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6146,
            "unit": "ns/op",
            "extra": "195608 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "195608 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "195608 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6670,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188449 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6670,
            "unit": "ns/op",
            "extra": "188449 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188449 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188449 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6275,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "198403 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6275,
            "unit": "ns/op",
            "extra": "198403 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "198403 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "198403 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12664,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "95115 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12664,
            "unit": "ns/op",
            "extra": "95115 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "95115 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "95115 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12681,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "95269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12681,
            "unit": "ns/op",
            "extra": "95269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "95269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "95269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12779,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "93650 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12779,
            "unit": "ns/op",
            "extra": "93650 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "93650 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93650 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "67f7a7c5c8452eff273163a7ce9514a6f5b94874",
          "message": "feat: lint missing-begin-end for CREATE PROCEDURE and CREATE FUNCTION (#72)\n\nAdds a missing-begin-end lint rule (default: warn) that fires when a\nCREATE PROCEDURE or scalar/multi-statement CREATE FUNCTION body omits the\nexplicit BEGIN...END wrapper.\n\nParser changes:\n- parseProcBody now returns ([]Statement, bool, error); the bool indicates\n  whether BEGIN...END was present in the source.\n- Both BEGIN...END and bare single-statement bodies are accepted. When\n  BEGIN is absent, tokens are collected until the first semicolon or EOF\n  and parsed as a single body statement.\n- CreateProcStmt.HasBeginEnd and CreateFuncStmt.HasBeginEnd record the\n  provenance so the formatter can always emit canonical BEGIN...END while\n  the linter can still warn about the missing wrapper.\n\nLinter changes:\n- RuleMissingBeginEnd = \"missing-begin-end\" added to config.\n- lint_proc.go: checkCreateProc and checkCreateFunc warn when HasBeginEnd\n  is false. Inline TVFs (RETURNS TABLE ... AS RETURN) are exempt since\n  they use RETURN (...) instead of a BEGIN...END block by design.\n\nCloses #72",
          "timestamp": "2026-03-11T15:55:39-04:00",
          "tree_id": "7f7ce6a8d26ce6e1de6df9497128d0f4f39ca09d",
          "url": "https://github.com/rpf3/sqlfmt/commit/67f7a7c5c8452eff273163a7ce9514a6f5b94874"
        },
        "date": 1773259015813,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 353808,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3055 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 353808,
            "unit": "ns/op",
            "extra": "3055 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3055 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3055 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 374078,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3493 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 374078,
            "unit": "ns/op",
            "extra": "3493 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3493 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3493 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 351023,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3400 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 351023,
            "unit": "ns/op",
            "extra": "3400 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3400 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3400 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 178447,
            "unit": "ns/op\t   63055 B/op\t    2101 allocs/op",
            "extra": "6591 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 178447,
            "unit": "ns/op",
            "extra": "6591 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63055,
            "unit": "B/op",
            "extra": "6591 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6591 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 179566,
            "unit": "ns/op\t   63055 B/op\t    2101 allocs/op",
            "extra": "6688 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 179566,
            "unit": "ns/op",
            "extra": "6688 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63055,
            "unit": "B/op",
            "extra": "6688 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6688 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 179244,
            "unit": "ns/op\t   63055 B/op\t    2101 allocs/op",
            "extra": "6550 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 179244,
            "unit": "ns/op",
            "extra": "6550 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63055,
            "unit": "B/op",
            "extra": "6550 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6550 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59259,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59259,
            "unit": "ns/op",
            "extra": "20216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20216 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59510,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20134 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59510,
            "unit": "ns/op",
            "extra": "20134 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20134 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20134 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59247,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20186 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59247,
            "unit": "ns/op",
            "extra": "20186 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20186 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20186 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 260671,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 260671,
            "unit": "ns/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 260388,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4387 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 260388,
            "unit": "ns/op",
            "extra": "4387 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4387 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4387 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 267308,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4660 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 267308,
            "unit": "ns/op",
            "extra": "4660 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4660 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4660 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 915918,
            "unit": "ns/op\t  356441 B/op\t    8076 allocs/op",
            "extra": "1298 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 915918,
            "unit": "ns/op",
            "extra": "1298 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356441,
            "unit": "B/op",
            "extra": "1298 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1298 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 911509,
            "unit": "ns/op\t  356441 B/op\t    8076 allocs/op",
            "extra": "1306 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 911509,
            "unit": "ns/op",
            "extra": "1306 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356441,
            "unit": "B/op",
            "extra": "1306 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1306 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 911866,
            "unit": "ns/op\t  356443 B/op\t    8076 allocs/op",
            "extra": "1314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 911866,
            "unit": "ns/op",
            "extra": "1314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356443,
            "unit": "B/op",
            "extra": "1314 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1314 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1006,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1006,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1024,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1166816 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1024,
            "unit": "ns/op",
            "extra": "1166816 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1166816 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1166816 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1020,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1020,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6156,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "202322 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6156,
            "unit": "ns/op",
            "extra": "202322 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "202322 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "202322 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5679,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "209442 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5679,
            "unit": "ns/op",
            "extra": "209442 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "209442 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "209442 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5697,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "214944 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5697,
            "unit": "ns/op",
            "extra": "214944 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "214944 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "214944 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10368,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "113881 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10368,
            "unit": "ns/op",
            "extra": "113881 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "113881 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "113881 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10274,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "113400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10274,
            "unit": "ns/op",
            "extra": "113400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "113400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "113400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10318,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "112844 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10318,
            "unit": "ns/op",
            "extra": "112844 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "112844 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "112844 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14978,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78560 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14978,
            "unit": "ns/op",
            "extra": "78560 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78560 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78560 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15679,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "75936 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15679,
            "unit": "ns/op",
            "extra": "75936 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "75936 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75936 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15247,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79764 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15247,
            "unit": "ns/op",
            "extra": "79764 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79764 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79764 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16701,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "76610 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16701,
            "unit": "ns/op",
            "extra": "76610 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "76610 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76610 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15794,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "75717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15794,
            "unit": "ns/op",
            "extra": "75717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "75717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75717 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15859,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "75252 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15859,
            "unit": "ns/op",
            "extra": "75252 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "75252 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75252 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14595,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "82171 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14595,
            "unit": "ns/op",
            "extra": "82171 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "82171 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82171 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14601,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "81669 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14601,
            "unit": "ns/op",
            "extra": "81669 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "81669 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81669 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14653,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "80716 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14653,
            "unit": "ns/op",
            "extra": "80716 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "80716 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "80716 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16101,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "73816 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16101,
            "unit": "ns/op",
            "extra": "73816 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "73816 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73816 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 15956,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "74455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 15956,
            "unit": "ns/op",
            "extra": "74455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "74455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "74455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 17097,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "72212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 17097,
            "unit": "ns/op",
            "extra": "72212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "72212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "72212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10058,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118051 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10058,
            "unit": "ns/op",
            "extra": "118051 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118051 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118051 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10013,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117445 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10013,
            "unit": "ns/op",
            "extra": "117445 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117445 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117445 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10175,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "113956 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10175,
            "unit": "ns/op",
            "extra": "113956 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "113956 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "113956 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6380,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "182538 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6380,
            "unit": "ns/op",
            "extra": "182538 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "182538 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "182538 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6321,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188607 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6321,
            "unit": "ns/op",
            "extra": "188607 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188607 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188607 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6376,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "182791 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6376,
            "unit": "ns/op",
            "extra": "182791 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "182791 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "182791 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12592,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "95780 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12592,
            "unit": "ns/op",
            "extra": "95780 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "95780 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "95780 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12600,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "94617 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12600,
            "unit": "ns/op",
            "extra": "94617 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "94617 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94617 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12668,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "93532 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12668,
            "unit": "ns/op",
            "extra": "93532 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "93532 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93532 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "f8346ba8bb117dbe9ec54f9359ebdff39f0596e8",
          "message": "feat: parse and format SET TRANSACTION ISOLATION LEVEL and SET IDENTITY_INSERT\n\nExtended SetStmt with a SetKind discriminator (SetSimple, SetTransactionIsolation,\nSetIdentityInsert) rather than separate AST nodes, since all SET variants share the\nsame grammatical position and a single formatter dispatch path. parseSet() now\ndispatches on the token after SET; the existing simple-option logic is extracted to\nparseSetSimple(). New transaction keywords (TRANSACTION, ISOLATION, LEVEL, READ,\nREPEATABLE, SERIALIZABLE, COMMITTED, UNCOMMITTED, SNAPSHOT) added to the lexer.\n\nCloses #92",
          "timestamp": "2026-03-12T10:34:02-04:00",
          "tree_id": "8ac5a26ae2678b0193a894e83e42a3b6f8d02b21",
          "url": "https://github.com/rpf3/sqlfmt/commit/f8346ba8bb117dbe9ec54f9359ebdff39f0596e8"
        },
        "date": 1773326116821,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 346279,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3296 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 346279,
            "unit": "ns/op",
            "extra": "3296 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3296 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3296 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 344867,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3307 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 344867,
            "unit": "ns/op",
            "extra": "3307 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3307 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3307 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 367789,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 367789,
            "unit": "ns/op",
            "extra": "3538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 180174,
            "unit": "ns/op\t   63057 B/op\t    2101 allocs/op",
            "extra": "6620 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 180174,
            "unit": "ns/op",
            "extra": "6620 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63057,
            "unit": "B/op",
            "extra": "6620 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6620 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 180998,
            "unit": "ns/op\t   63057 B/op\t    2101 allocs/op",
            "extra": "6358 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 180998,
            "unit": "ns/op",
            "extra": "6358 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63057,
            "unit": "B/op",
            "extra": "6358 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6358 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 178969,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "6360 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 178969,
            "unit": "ns/op",
            "extra": "6360 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "6360 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6360 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59240,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20241 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59240,
            "unit": "ns/op",
            "extra": "20241 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20241 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20241 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59399,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20238 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59399,
            "unit": "ns/op",
            "extra": "20238 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20238 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20238 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59083,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20284 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59083,
            "unit": "ns/op",
            "extra": "20284 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20284 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20284 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 256935,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 256935,
            "unit": "ns/op",
            "extra": "4652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4652 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 257588,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4690 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 257588,
            "unit": "ns/op",
            "extra": "4690 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4690 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4690 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 255674,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 255674,
            "unit": "ns/op",
            "extra": "4532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4532 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 901859,
            "unit": "ns/op\t  356449 B/op\t    8076 allocs/op",
            "extra": "1322 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 901859,
            "unit": "ns/op",
            "extra": "1322 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356449,
            "unit": "B/op",
            "extra": "1322 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1322 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 927030,
            "unit": "ns/op\t  356440 B/op\t    8076 allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 927030,
            "unit": "ns/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356440,
            "unit": "B/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 941260,
            "unit": "ns/op\t  356433 B/op\t    8076 allocs/op",
            "extra": "1206 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 941260,
            "unit": "ns/op",
            "extra": "1206 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356433,
            "unit": "B/op",
            "extra": "1206 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1206 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1020,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1020,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1015,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1015,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1018,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1018,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5822,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "205155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5822,
            "unit": "ns/op",
            "extra": "205155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "205155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "205155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5895,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "200332 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5895,
            "unit": "ns/op",
            "extra": "200332 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "200332 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "200332 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6161,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "184017 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6161,
            "unit": "ns/op",
            "extra": "184017 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "184017 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "184017 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10287,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "113810 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10287,
            "unit": "ns/op",
            "extra": "113810 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "113810 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "113810 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10312,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117631 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10312,
            "unit": "ns/op",
            "extra": "117631 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117631 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117631 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10247,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118064 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10247,
            "unit": "ns/op",
            "extra": "118064 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118064 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118064 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15084,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80208 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15084,
            "unit": "ns/op",
            "extra": "80208 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80208 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80208 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15049,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15049,
            "unit": "ns/op",
            "extra": "79353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15090,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79675 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15090,
            "unit": "ns/op",
            "extra": "79675 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79675 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79675 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15986,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "74530 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15986,
            "unit": "ns/op",
            "extra": "74530 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "74530 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "74530 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 17051,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "75470 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 17051,
            "unit": "ns/op",
            "extra": "75470 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "75470 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75470 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15928,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "75145 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15928,
            "unit": "ns/op",
            "extra": "75145 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "75145 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75145 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14569,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "81950 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14569,
            "unit": "ns/op",
            "extra": "81950 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "81950 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81950 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14932,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "82144 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14932,
            "unit": "ns/op",
            "extra": "82144 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "82144 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82144 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14697,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "82227 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14697,
            "unit": "ns/op",
            "extra": "82227 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "82227 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82227 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16272,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "73068 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16272,
            "unit": "ns/op",
            "extra": "73068 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "73068 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73068 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16096,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "74088 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16096,
            "unit": "ns/op",
            "extra": "74088 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "74088 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "74088 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16088,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "74374 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16088,
            "unit": "ns/op",
            "extra": "74374 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "74374 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "74374 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10626,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "120440 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10626,
            "unit": "ns/op",
            "extra": "120440 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "120440 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "120440 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10055,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118730 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10055,
            "unit": "ns/op",
            "extra": "118730 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118730 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118730 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9973,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "121288 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9973,
            "unit": "ns/op",
            "extra": "121288 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "121288 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "121288 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6334,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "186943 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6334,
            "unit": "ns/op",
            "extra": "186943 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "186943 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "186943 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6385,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "187113 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6385,
            "unit": "ns/op",
            "extra": "187113 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "187113 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "187113 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6318,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "189565 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6318,
            "unit": "ns/op",
            "extra": "189565 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "189565 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "189565 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12699,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "94396 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12699,
            "unit": "ns/op",
            "extra": "94396 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "94396 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94396 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12723,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "92911 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12723,
            "unit": "ns/op",
            "extra": "92911 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "92911 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92911 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12675,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "89689 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12675,
            "unit": "ns/op",
            "extra": "89689 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "89689 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "89689 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "4f43ca2e1373297b1e16034ab7f435196208510e",
          "message": "feat: parse and format RECURSIVE CTEs and NATURAL JOIN\n\nRECURSIVE CTEs (#51): parseCTEDefs now consumes an optional RECURSIVE\nkeyword and returns it as a bool alongside the CTE list. parseWithSelect\npropagates the flag to SelectStmt.Recursive. The formatter conditionally\nemits \"with recursive\" for the first CTE when the flag is set. The CREATE\nVIEW WITH CTE path (parse_ddl.go) discards the flag with _ since views\ncannot be recursive.\n\nNATURAL JOIN (#53): Three new JoinType constants (JoinNatural,\nJoinNaturalLeft, JoinNaturalRight) are added to the AST. isNextJoin\ndetects the NATURAL keyword; parseJoinClauses dispatches into a nested\nswitch that consumes the optional LEFT/RIGHT/OUTER tokens and the JOIN\nkeyword, then sets the appropriate type. No ON or USING clause is\nemitted, matching the behaviour of CROSS JOIN. NATURAL LEFT OUTER JOIN\nnormalises to \"natural left join\" (OUTER dropped), consistent with the\nexisting LEFT OUTER → left join normalisation.\n\nCloses #51\nCloses #53",
          "timestamp": "2026-03-12T11:04:25-04:00",
          "tree_id": "8781c6ea99b1ead730b7af1d5f5f489f6eb53621",
          "url": "https://github.com/rpf3/sqlfmt/commit/4f43ca2e1373297b1e16034ab7f435196208510e"
        },
        "date": 1773327937779,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 331041,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3354 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 331041,
            "unit": "ns/op",
            "extra": "3354 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3354 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3354 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 327965,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3391 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 327965,
            "unit": "ns/op",
            "extra": "3391 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3391 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3391 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 329475,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3513 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 329475,
            "unit": "ns/op",
            "extra": "3513 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3513 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3513 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 164359,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "6876 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 164359,
            "unit": "ns/op",
            "extra": "6876 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "6876 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6876 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 188091,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "6934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 188091,
            "unit": "ns/op",
            "extra": "6934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "6934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "6934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 167005,
            "unit": "ns/op\t   63056 B/op\t    2101 allocs/op",
            "extra": "7164 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 167005,
            "unit": "ns/op",
            "extra": "7164 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63056,
            "unit": "B/op",
            "extra": "7164 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2101,
            "unit": "allocs/op",
            "extra": "7164 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 54481,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "21994 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 54481,
            "unit": "ns/op",
            "extra": "21994 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "21994 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "21994 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 54915,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "21849 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 54915,
            "unit": "ns/op",
            "extra": "21849 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "21849 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "21849 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 54323,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "22039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 54323,
            "unit": "ns/op",
            "extra": "22039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "22039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "22039 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 244335,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4890 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 244335,
            "unit": "ns/op",
            "extra": "4890 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4890 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4890 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 242068,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4558 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 242068,
            "unit": "ns/op",
            "extra": "4558 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4558 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4558 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 244009,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4869 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 244009,
            "unit": "ns/op",
            "extra": "4869 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4869 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4869 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 876936,
            "unit": "ns/op\t  356449 B/op\t    8076 allocs/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 876936,
            "unit": "ns/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356449,
            "unit": "B/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 887071,
            "unit": "ns/op\t  356445 B/op\t    8076 allocs/op",
            "extra": "1372 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 887071,
            "unit": "ns/op",
            "extra": "1372 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356445,
            "unit": "B/op",
            "extra": "1372 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1372 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 874595,
            "unit": "ns/op\t  356444 B/op\t    8076 allocs/op",
            "extra": "1384 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 874595,
            "unit": "ns/op",
            "extra": "1384 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 356444,
            "unit": "B/op",
            "extra": "1384 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8076,
            "unit": "allocs/op",
            "extra": "1384 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1049,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1049,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1050,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1050,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1047,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1047,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5742,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "209527 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5742,
            "unit": "ns/op",
            "extra": "209527 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "209527 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "209527 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5705,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "208113 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5705,
            "unit": "ns/op",
            "extra": "208113 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "208113 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "208113 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5669,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "211520 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5669,
            "unit": "ns/op",
            "extra": "211520 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "211520 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "211520 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10026,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10026,
            "unit": "ns/op",
            "extra": "117796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10963,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "103779 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10963,
            "unit": "ns/op",
            "extra": "103779 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "103779 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "103779 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10029,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "119070 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10029,
            "unit": "ns/op",
            "extra": "119070 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "119070 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "119070 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14372,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "83034 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14372,
            "unit": "ns/op",
            "extra": "83034 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "83034 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "83034 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14334,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "83448 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14334,
            "unit": "ns/op",
            "extra": "83448 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "83448 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "83448 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14408,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "83419 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14408,
            "unit": "ns/op",
            "extra": "83419 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "83419 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "83419 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14633,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "79489 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14633,
            "unit": "ns/op",
            "extra": "79489 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "79489 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "79489 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14559,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "82284 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14559,
            "unit": "ns/op",
            "extra": "82284 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "82284 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "82284 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14580,
            "unit": "ns/op\t    4000 B/op\t     201 allocs/op",
            "extra": "81366 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14580,
            "unit": "ns/op",
            "extra": "81366 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4000,
            "unit": "B/op",
            "extra": "81366 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "81366 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14226,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "87603 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14226,
            "unit": "ns/op",
            "extra": "87603 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "87603 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "87603 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13443,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "89608 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13443,
            "unit": "ns/op",
            "extra": "89608 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "89608 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "89608 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 13602,
            "unit": "ns/op\t    4208 B/op\t     185 allocs/op",
            "extra": "88788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 13602,
            "unit": "ns/op",
            "extra": "88788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4208,
            "unit": "B/op",
            "extra": "88788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "88788 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 14237,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "83906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 14237,
            "unit": "ns/op",
            "extra": "83906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "83906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "83906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 14273,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "83724 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 14273,
            "unit": "ns/op",
            "extra": "83724 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "83724 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "83724 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 14213,
            "unit": "ns/op\t    3736 B/op\t     216 allocs/op",
            "extra": "84364 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 14213,
            "unit": "ns/op",
            "extra": "84364 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3736,
            "unit": "B/op",
            "extra": "84364 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "84364 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9750,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119139 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9750,
            "unit": "ns/op",
            "extra": "119139 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119139 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119139 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9815,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "120709 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9815,
            "unit": "ns/op",
            "extra": "120709 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "120709 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "120709 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9858,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "122012 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9858,
            "unit": "ns/op",
            "extra": "122012 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "122012 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "122012 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6390,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "183884 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6390,
            "unit": "ns/op",
            "extra": "183884 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "183884 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "183884 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 5982,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "201458 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 5982,
            "unit": "ns/op",
            "extra": "201458 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "201458 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "201458 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 5917,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "201380 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 5917,
            "unit": "ns/op",
            "extra": "201380 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "201380 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "201380 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 11431,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "103423 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 11431,
            "unit": "ns/op",
            "extra": "103423 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "103423 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "103423 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 11379,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "104112 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 11379,
            "unit": "ns/op",
            "extra": "104112 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "104112 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "104112 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 11441,
            "unit": "ns/op\t    3144 B/op\t     151 allocs/op",
            "extra": "100610 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 11441,
            "unit": "ns/op",
            "extra": "100610 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3144,
            "unit": "B/op",
            "extra": "100610 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "100610 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "9045665e7ef0667f9c6527ba73f1208ca6c50b66",
          "message": "feat: expand IN (list) predicates into vertical blocks in writeExprPred\n\nWHERE and HAVING predicates that match the pattern \"expr IN (a, b, c)\"\nare now formatted as a vertical paren block rather than inline:\n\n  where\n  \tcol in\n  \t(\n  \t\ta\n  \t,\tb\n  \t)\n\nA splitInList helper detects the pattern by string-scanning the rendered\nexpression: it looks for \" in (\" or \" not in (\" at the top level, splits\nthe body on depth-0 commas, and skips expressions whose body contains\nSELECT (subqueries are already handled via the WhereSubq AST path).\n\nwriteInListBlock renders the block with ( and ) at the predicate indent\nlevel and items at double-indent with the leading comma placed at ind to\nalign with the surrounding parens.\n\nThe change applies everywhere writeExprPred is called: SELECT WHERE,\nSELECT HAVING, DELETE WHERE, and UPDATE WHERE.",
          "timestamp": "2026-03-12T13:04:17-04:00",
          "tree_id": "8c770806e79856c4c02d1e517f2eb22e5dfd5d64",
          "url": "https://github.com/rpf3/sqlfmt/commit/9045665e7ef0667f9c6527ba73f1208ca6c50b66"
        },
        "date": 1773335128311,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 416937,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3237 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 416937,
            "unit": "ns/op",
            "extra": "3237 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3237 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3237 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 398196,
            "unit": "ns/op\t  157818 B/op\t    2892 allocs/op",
            "extra": "2838 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 398196,
            "unit": "ns/op",
            "extra": "2838 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157818,
            "unit": "B/op",
            "extra": "2838 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "2838 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 344018,
            "unit": "ns/op\t  157819 B/op\t    2892 allocs/op",
            "extra": "3519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 344018,
            "unit": "ns/op",
            "extra": "3519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157819,
            "unit": "B/op",
            "extra": "3519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3519 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 186582,
            "unit": "ns/op\t   63951 B/op\t    2103 allocs/op",
            "extra": "6093 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 186582,
            "unit": "ns/op",
            "extra": "6093 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63951,
            "unit": "B/op",
            "extra": "6093 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6093 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 184942,
            "unit": "ns/op\t   63951 B/op\t    2103 allocs/op",
            "extra": "6505 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 184942,
            "unit": "ns/op",
            "extra": "6505 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63951,
            "unit": "B/op",
            "extra": "6505 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6505 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 186008,
            "unit": "ns/op\t   63951 B/op\t    2103 allocs/op",
            "extra": "6232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 186008,
            "unit": "ns/op",
            "extra": "6232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 63951,
            "unit": "B/op",
            "extra": "6232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 64346,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "18127 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 64346,
            "unit": "ns/op",
            "extra": "18127 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "18127 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "18127 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 60815,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19222 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 60815,
            "unit": "ns/op",
            "extra": "19222 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19222 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19222 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59273,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20175 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59273,
            "unit": "ns/op",
            "extra": "20175 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20175 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20175 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 273944,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4446 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 273944,
            "unit": "ns/op",
            "extra": "4446 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4446 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4446 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 259722,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4580 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 259722,
            "unit": "ns/op",
            "extra": "4580 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4580 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4580 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 260334,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4665 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 260334,
            "unit": "ns/op",
            "extra": "4665 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4665 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4665 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 915717,
            "unit": "ns/op\t  357342 B/op\t    8078 allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 915717,
            "unit": "ns/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357342,
            "unit": "B/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 912239,
            "unit": "ns/op\t  357341 B/op\t    8078 allocs/op",
            "extra": "1308 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 912239,
            "unit": "ns/op",
            "extra": "1308 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357341,
            "unit": "B/op",
            "extra": "1308 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1308 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 942758,
            "unit": "ns/op\t  357337 B/op\t    8078 allocs/op",
            "extra": "1317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 942758,
            "unit": "ns/op",
            "extra": "1317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357337,
            "unit": "B/op",
            "extra": "1317 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1317 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1049,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1049,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1041,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1134620 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1041,
            "unit": "ns/op",
            "extra": "1134620 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1134620 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1134620 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1037,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1037,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5873,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "196846 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5873,
            "unit": "ns/op",
            "extra": "196846 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "196846 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "196846 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6084,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "203400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6084,
            "unit": "ns/op",
            "extra": "203400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "203400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "203400 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5832,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "208438 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5832,
            "unit": "ns/op",
            "extra": "208438 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "208438 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "208438 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10322,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "109087 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10322,
            "unit": "ns/op",
            "extra": "109087 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "109087 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "109087 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10372,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "114358 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10372,
            "unit": "ns/op",
            "extra": "114358 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "114358 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "114358 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 11077,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "115155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 11077,
            "unit": "ns/op",
            "extra": "115155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "115155 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "115155 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15082,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78535 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15082,
            "unit": "ns/op",
            "extra": "78535 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78535 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78535 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15126,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79324 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15126,
            "unit": "ns/op",
            "extra": "79324 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79324 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79324 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15072,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80317 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15072,
            "unit": "ns/op",
            "extra": "80317 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80317 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80317 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15666,
            "unit": "ns/op\t    4064 B/op\t     201 allocs/op",
            "extra": "76340 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15666,
            "unit": "ns/op",
            "extra": "76340 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4064,
            "unit": "B/op",
            "extra": "76340 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76340 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15826,
            "unit": "ns/op\t    4064 B/op\t     201 allocs/op",
            "extra": "73186 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15826,
            "unit": "ns/op",
            "extra": "73186 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4064,
            "unit": "B/op",
            "extra": "73186 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "73186 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15637,
            "unit": "ns/op\t    4064 B/op\t     201 allocs/op",
            "extra": "76261 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15637,
            "unit": "ns/op",
            "extra": "76261 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4064,
            "unit": "B/op",
            "extra": "76261 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "76261 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14468,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "82256 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14468,
            "unit": "ns/op",
            "extra": "82256 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "82256 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82256 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14447,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "83096 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14447,
            "unit": "ns/op",
            "extra": "83096 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "83096 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "83096 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15651,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "74529 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15651,
            "unit": "ns/op",
            "extra": "74529 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "74529 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "74529 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16665,
            "unit": "ns/op\t    3800 B/op\t     216 allocs/op",
            "extra": "72468 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16665,
            "unit": "ns/op",
            "extra": "72468 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3800,
            "unit": "B/op",
            "extra": "72468 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "72468 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16401,
            "unit": "ns/op\t    3800 B/op\t     216 allocs/op",
            "extra": "71965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16401,
            "unit": "ns/op",
            "extra": "71965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3800,
            "unit": "B/op",
            "extra": "71965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71965 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16402,
            "unit": "ns/op\t    3800 B/op\t     216 allocs/op",
            "extra": "71893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16402,
            "unit": "ns/op",
            "extra": "71893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3800,
            "unit": "B/op",
            "extra": "71893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10045,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118131 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10045,
            "unit": "ns/op",
            "extra": "118131 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118131 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118131 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10029,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10029,
            "unit": "ns/op",
            "extra": "119212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10057,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118344 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10057,
            "unit": "ns/op",
            "extra": "118344 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118344 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118344 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6306,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "191137 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6306,
            "unit": "ns/op",
            "extra": "191137 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "191137 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "191137 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6819,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "187957 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6819,
            "unit": "ns/op",
            "extra": "187957 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "187957 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "187957 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6460,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "189402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6460,
            "unit": "ns/op",
            "extra": "189402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "189402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "189402 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12716,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "93909 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12716,
            "unit": "ns/op",
            "extra": "93909 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "93909 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93909 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12745,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "90786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12745,
            "unit": "ns/op",
            "extra": "90786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "90786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "90786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12791,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "92859 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12791,
            "unit": "ns/op",
            "extra": "92859 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "92859 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92859 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "d9e940fa98f5603c3355feb2cd9a7bfa75febe2c",
          "message": "fix: recurse into APPLY subqueries in linter; fix subquery-join message\n\ncheckSelectStmt's recursion loop skipped JoinClause.Subquery, so tables\ninside an OUTER/CROSS APPLY (SELECT ...) body were invisible to all\nSELECT-level lint rules (unaliased-table, missing-schema-name, etc.).\n\nAlso fixes the unaliased-table and alias-without-as messages for subquery\nAPPLY joins: jc.Name is \"\" for those, so the label now falls back to\n\"(subquery)\" matching the existing FROM-subquery behaviour.\n\nCloses #140",
          "timestamp": "2026-03-12T13:27:45-04:00",
          "tree_id": "159eb78ddb5fddb621358957ceca67ded55f4bd2",
          "url": "https://github.com/rpf3/sqlfmt/commit/d9e940fa98f5603c3355feb2cd9a7bfa75febe2c"
        },
        "date": 1773336532502,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 353707,
            "unit": "ns/op\t  157819 B/op\t    2892 allocs/op",
            "extra": "3208 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 353707,
            "unit": "ns/op",
            "extra": "3208 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157819,
            "unit": "B/op",
            "extra": "3208 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3208 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 352054,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3342 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 352054,
            "unit": "ns/op",
            "extra": "3342 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3342 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3342 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 352763,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3339 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 352763,
            "unit": "ns/op",
            "extra": "3339 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3339 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3339 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 187519,
            "unit": "ns/op\t   64542 B/op\t    2103 allocs/op",
            "extra": "6180 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 187519,
            "unit": "ns/op",
            "extra": "6180 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 64542,
            "unit": "B/op",
            "extra": "6180 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6180 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 188474,
            "unit": "ns/op\t   64543 B/op\t    2103 allocs/op",
            "extra": "6248 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 188474,
            "unit": "ns/op",
            "extra": "6248 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 64543,
            "unit": "B/op",
            "extra": "6248 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6248 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 187870,
            "unit": "ns/op\t   64543 B/op\t    2103 allocs/op",
            "extra": "5749 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 187870,
            "unit": "ns/op",
            "extra": "5749 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 64543,
            "unit": "B/op",
            "extra": "5749 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5749 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59882,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19921 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59882,
            "unit": "ns/op",
            "extra": "19921 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19921 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19921 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 64226,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19809 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 64226,
            "unit": "ns/op",
            "extra": "19809 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19809 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19809 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59949,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19923 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59949,
            "unit": "ns/op",
            "extra": "19923 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19923 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19923 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 263644,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 263644,
            "unit": "ns/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4170 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 262293,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4473 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 262293,
            "unit": "ns/op",
            "extra": "4473 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4473 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4473 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 271462,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4288 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 271462,
            "unit": "ns/op",
            "extra": "4288 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4288 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4288 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 945894,
            "unit": "ns/op\t  357935 B/op\t    8078 allocs/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 945894,
            "unit": "ns/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357935,
            "unit": "B/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 927157,
            "unit": "ns/op\t  357929 B/op\t    8078 allocs/op",
            "extra": "1185 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 927157,
            "unit": "ns/op",
            "extra": "1185 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357929,
            "unit": "B/op",
            "extra": "1185 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1185 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 929229,
            "unit": "ns/op\t  357931 B/op\t    8078 allocs/op",
            "extra": "1261 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 929229,
            "unit": "ns/op",
            "extra": "1261 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 357931,
            "unit": "B/op",
            "extra": "1261 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1261 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1016,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1016,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1184,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "924334 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1184,
            "unit": "ns/op",
            "extra": "924334 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "924334 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "924334 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1029,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1029,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5797,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "204255 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5797,
            "unit": "ns/op",
            "extra": "204255 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "204255 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "204255 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5802,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "204256 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5802,
            "unit": "ns/op",
            "extra": "204256 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "204256 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "204256 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5791,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "196720 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5791,
            "unit": "ns/op",
            "extra": "196720 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "196720 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "196720 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10720,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "114740 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10720,
            "unit": "ns/op",
            "extra": "114740 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "114740 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "114740 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10373,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "114345 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10373,
            "unit": "ns/op",
            "extra": "114345 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "114345 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "114345 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10499,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "103150 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10499,
            "unit": "ns/op",
            "extra": "103150 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "103150 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "103150 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15127,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78274 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15127,
            "unit": "ns/op",
            "extra": "78274 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78274 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78274 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16184,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "77740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16184,
            "unit": "ns/op",
            "extra": "77740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "77740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "77740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15254,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78736 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15254,
            "unit": "ns/op",
            "extra": "78736 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78736 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78736 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16174,
            "unit": "ns/op\t    4128 B/op\t     201 allocs/op",
            "extra": "73327 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16174,
            "unit": "ns/op",
            "extra": "73327 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4128,
            "unit": "B/op",
            "extra": "73327 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "73327 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16257,
            "unit": "ns/op\t    4128 B/op\t     201 allocs/op",
            "extra": "70344 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16257,
            "unit": "ns/op",
            "extra": "70344 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4128,
            "unit": "B/op",
            "extra": "70344 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "70344 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16448,
            "unit": "ns/op\t    4128 B/op\t     201 allocs/op",
            "extra": "67594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16448,
            "unit": "ns/op",
            "extra": "67594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4128,
            "unit": "B/op",
            "extra": "67594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "67594 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14769,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "81884 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14769,
            "unit": "ns/op",
            "extra": "81884 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "81884 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81884 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14775,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "81598 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14775,
            "unit": "ns/op",
            "extra": "81598 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "81598 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81598 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14654,
            "unit": "ns/op\t    4272 B/op\t     185 allocs/op",
            "extra": "80353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14654,
            "unit": "ns/op",
            "extra": "80353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4272,
            "unit": "B/op",
            "extra": "80353 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "80353 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16717,
            "unit": "ns/op\t    3864 B/op\t     216 allocs/op",
            "extra": "71712 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16717,
            "unit": "ns/op",
            "extra": "71712 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3864,
            "unit": "B/op",
            "extra": "71712 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71712 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16753,
            "unit": "ns/op\t    3864 B/op\t     216 allocs/op",
            "extra": "70670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16753,
            "unit": "ns/op",
            "extra": "70670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3864,
            "unit": "B/op",
            "extra": "70670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "70670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16687,
            "unit": "ns/op\t    3864 B/op\t     216 allocs/op",
            "extra": "70042 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16687,
            "unit": "ns/op",
            "extra": "70042 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3864,
            "unit": "B/op",
            "extra": "70042 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "70042 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10283,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119226 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10283,
            "unit": "ns/op",
            "extra": "119226 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119226 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119226 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10086,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118881 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10086,
            "unit": "ns/op",
            "extra": "118881 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118881 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118881 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10051,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118628 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10051,
            "unit": "ns/op",
            "extra": "118628 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118628 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118628 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6344,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6344,
            "unit": "ns/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6344,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "187686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6344,
            "unit": "ns/op",
            "extra": "187686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "187686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "187686 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6419,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "183363 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6419,
            "unit": "ns/op",
            "extra": "183363 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "183363 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "183363 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13650,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "91285 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13650,
            "unit": "ns/op",
            "extra": "91285 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "91285 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "91285 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12869,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "87212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12869,
            "unit": "ns/op",
            "extra": "87212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "87212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "87212 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12869,
            "unit": "ns/op\t    3208 B/op\t     151 allocs/op",
            "extra": "93213 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12869,
            "unit": "ns/op",
            "extra": "93213 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3208,
            "unit": "B/op",
            "extra": "93213 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93213 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "bd688be14feb938721b0c171ed51da7d7bafb5c7",
          "message": "feat: parse and format GROUP BY ROLLUP, CUBE, and GROUPING SETS\n\nExtends GROUP BY parsing to support the three T-SQL super-aggregate\nmodifiers. SelectStmt.GroupBy changes from []Expr to []GroupByItem,\nwhere each item carries a GroupByModifier discriminator and either an\nExpr (for plain columns) or a RawArgs string (for ROLLUP/CUBE/GROUPING\nSETS argument lists and the grand-total () form).\n\nThe raw-string approach for modifier arguments matches how window specs\nand TVF args are handled elsewhere — it avoids a deeply nested AST for\nGROUPING SETS contents while preserving the normalised token spacing\nthat parseExprRaw provides.\n\nFormatter style follows the issue spec: a single modifier with no other\nGROUP BY items emits the modifier keyword on the \"group by\" line with\narguments indented on the next line (e.g. \"group by rollup\\n\\t(a, b)\").\nMixed lists (plain columns alongside modifiers) render modifiers inline\nas \"rollup(a, b)\" within the standard writeCommaList output.\n\nA new parseParenRaw helper consolidates the consume-( / parseExprRaw /\nconsume-) pattern that was already repeated for TOP(n), window specs,\nand TVF args.\n\nCloses #49",
          "timestamp": "2026-03-12T14:51:18-04:00",
          "tree_id": "0f5a8ea2db61a30562f0443f4abeeedacbe9f7da",
          "url": "https://github.com/rpf3/sqlfmt/commit/bd688be14feb938721b0c171ed51da7d7bafb5c7"
        },
        "date": 1773341550514,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 341381,
            "unit": "ns/op\t  157818 B/op\t    2892 allocs/op",
            "extra": "3249 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 341381,
            "unit": "ns/op",
            "extra": "3249 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157818,
            "unit": "B/op",
            "extra": "3249 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3249 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 342393,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3303 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 342393,
            "unit": "ns/op",
            "extra": "3303 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3303 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3303 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 342014,
            "unit": "ns/op\t  157818 B/op\t    2892 allocs/op",
            "extra": "3567 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 342014,
            "unit": "ns/op",
            "extra": "3567 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157818,
            "unit": "B/op",
            "extra": "3567 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3567 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 200183,
            "unit": "ns/op\t   66001 B/op\t    2103 allocs/op",
            "extra": "5932 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 200183,
            "unit": "ns/op",
            "extra": "5932 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66001,
            "unit": "B/op",
            "extra": "5932 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5932 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 184452,
            "unit": "ns/op\t   65998 B/op\t    2103 allocs/op",
            "extra": "5782 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 184452,
            "unit": "ns/op",
            "extra": "5782 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65998,
            "unit": "B/op",
            "extra": "5782 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5782 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 184748,
            "unit": "ns/op\t   65998 B/op\t    2103 allocs/op",
            "extra": "6236 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 184748,
            "unit": "ns/op",
            "extra": "6236 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65998,
            "unit": "B/op",
            "extra": "6236 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6236 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 57808,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20710 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 57808,
            "unit": "ns/op",
            "extra": "20710 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20710 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20710 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 57812,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20854 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 57812,
            "unit": "ns/op",
            "extra": "20854 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20854 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20854 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58168,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20613 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58168,
            "unit": "ns/op",
            "extra": "20613 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20613 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20613 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 254999,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4310 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 254999,
            "unit": "ns/op",
            "extra": "4310 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4310 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4310 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 253610,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4639 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 253610,
            "unit": "ns/op",
            "extra": "4639 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4639 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4639 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 251954,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4438 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 251954,
            "unit": "ns/op",
            "extra": "4438 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4438 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4438 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 919191,
            "unit": "ns/op\t  359390 B/op\t    8078 allocs/op",
            "extra": "1329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 919191,
            "unit": "ns/op",
            "extra": "1329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359390,
            "unit": "B/op",
            "extra": "1329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1329 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 914103,
            "unit": "ns/op\t  359386 B/op\t    8078 allocs/op",
            "extra": "1335 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 914103,
            "unit": "ns/op",
            "extra": "1335 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359386,
            "unit": "B/op",
            "extra": "1335 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1335 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 897900,
            "unit": "ns/op\t  359381 B/op\t    8078 allocs/op",
            "extra": "1318 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 897900,
            "unit": "ns/op",
            "extra": "1318 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359381,
            "unit": "B/op",
            "extra": "1318 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1318 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1062,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1062,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1011,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1011,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1038,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1167158 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1038,
            "unit": "ns/op",
            "extra": "1167158 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1167158 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1167158 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5773,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "194532 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5773,
            "unit": "ns/op",
            "extra": "194532 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "194532 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "194532 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5718,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "208243 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5718,
            "unit": "ns/op",
            "extra": "208243 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "208243 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "208243 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5736,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "214348 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5736,
            "unit": "ns/op",
            "extra": "214348 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "214348 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "214348 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 11077,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "105235 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 11077,
            "unit": "ns/op",
            "extra": "105235 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "105235 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "105235 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10169,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10169,
            "unit": "ns/op",
            "extra": "117110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117110 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10214,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117248 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10214,
            "unit": "ns/op",
            "extra": "117248 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117248 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117248 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15151,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "75788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15151,
            "unit": "ns/op",
            "extra": "75788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "75788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75788 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15042,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78534 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15042,
            "unit": "ns/op",
            "extra": "78534 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78534 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78534 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15216,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "75825 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15216,
            "unit": "ns/op",
            "extra": "75825 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "75825 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75825 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15934,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "74296 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15934,
            "unit": "ns/op",
            "extra": "74296 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "74296 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "74296 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15937,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75081 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15937,
            "unit": "ns/op",
            "extra": "75081 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75081 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75081 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 17158,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "73172 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 17158,
            "unit": "ns/op",
            "extra": "73172 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "73172 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "73172 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14528,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82369 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14528,
            "unit": "ns/op",
            "extra": "82369 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82369 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82369 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14725,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82701 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14725,
            "unit": "ns/op",
            "extra": "82701 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82701 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82701 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14521,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "81704 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14521,
            "unit": "ns/op",
            "extra": "81704 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "81704 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81704 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16558,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "71325 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16558,
            "unit": "ns/op",
            "extra": "71325 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "71325 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71325 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16553,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "71967 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16553,
            "unit": "ns/op",
            "extra": "71967 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "71967 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71967 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16731,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16731,
            "unit": "ns/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10164,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "112269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10164,
            "unit": "ns/op",
            "extra": "112269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "112269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "112269 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10133,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "115952 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10133,
            "unit": "ns/op",
            "extra": "115952 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "115952 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "115952 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10888,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118590 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10888,
            "unit": "ns/op",
            "extra": "118590 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118590 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118590 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6496,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "181786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6496,
            "unit": "ns/op",
            "extra": "181786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "181786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "181786 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6589,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "179428 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6589,
            "unit": "ns/op",
            "extra": "179428 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "179428 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "179428 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6473,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "182980 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6473,
            "unit": "ns/op",
            "extra": "182980 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "182980 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "182980 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12890,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "93348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12890,
            "unit": "ns/op",
            "extra": "93348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "93348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93348 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12846,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "92546 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12846,
            "unit": "ns/op",
            "extra": "92546 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "92546 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92546 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12913,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "91316 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12913,
            "unit": "ns/op",
            "extra": "91316 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "91316 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "91316 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "5ac6dbbdaa98d699c2073ba900d8ed24fb301240",
          "message": "refactor: expand PIVOT/UNPIVOT IN list vertically; extract splitDepthZeroCommas\n\nThe IN column list inside PIVOT/UNPIVOT is now rendered using the same\nvertical paren block style as WHERE IN lists, rather than inline.\n\nThe depth-0 comma-splitting logic that was private to splitInList is\nextracted into a shared splitDepthZeroCommas helper, which both\nsplitInList and formatPivot now use. This eliminates the duplication\nnoted in issue #143 for the ROLLUP/CUBE/GROUPING SETS case.",
          "timestamp": "2026-03-12T15:16:48-04:00",
          "tree_id": "3ac05e8dc05ca516442acdea918e749fe44452c1",
          "url": "https://github.com/rpf3/sqlfmt/commit/5ac6dbbdaa98d699c2073ba900d8ed24fb301240"
        },
        "date": 1773343081542,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 341677,
            "unit": "ns/op\t  157818 B/op\t    2892 allocs/op",
            "extra": "3483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 341677,
            "unit": "ns/op",
            "extra": "3483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157818,
            "unit": "B/op",
            "extra": "3483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3483 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 336067,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "2986 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 336067,
            "unit": "ns/op",
            "extra": "2986 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "2986 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "2986 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 353941,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3421 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 353941,
            "unit": "ns/op",
            "extra": "3421 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3421 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3421 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 208679,
            "unit": "ns/op\t   65999 B/op\t    2103 allocs/op",
            "extra": "6002 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 208679,
            "unit": "ns/op",
            "extra": "6002 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65999,
            "unit": "B/op",
            "extra": "6002 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6002 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 184540,
            "unit": "ns/op\t   65998 B/op\t    2103 allocs/op",
            "extra": "6578 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 184540,
            "unit": "ns/op",
            "extra": "6578 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65998,
            "unit": "B/op",
            "extra": "6578 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6578 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 182988,
            "unit": "ns/op\t   65997 B/op\t    2103 allocs/op",
            "extra": "5973 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 182988,
            "unit": "ns/op",
            "extra": "5973 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65997,
            "unit": "B/op",
            "extra": "5973 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5973 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58948,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20460 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58948,
            "unit": "ns/op",
            "extra": "20460 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20460 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20460 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58561,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20367 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58561,
            "unit": "ns/op",
            "extra": "20367 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20367 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20367 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58479,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20439 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58479,
            "unit": "ns/op",
            "extra": "20439 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20439 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20439 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 253685,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4328 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 253685,
            "unit": "ns/op",
            "extra": "4328 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4328 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4328 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 252999,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4510 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 252999,
            "unit": "ns/op",
            "extra": "4510 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4510 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4510 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 254109,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4402 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 254109,
            "unit": "ns/op",
            "extra": "4402 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4402 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4402 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 916034,
            "unit": "ns/op\t  359387 B/op\t    8078 allocs/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 916034,
            "unit": "ns/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359387,
            "unit": "B/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 893449,
            "unit": "ns/op\t  359386 B/op\t    8078 allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 893449,
            "unit": "ns/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359386,
            "unit": "B/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 892385,
            "unit": "ns/op\t  359384 B/op\t    8078 allocs/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 892385,
            "unit": "ns/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359384,
            "unit": "B/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1320 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1008,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1008,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1022,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1022,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1012,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1012,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5761,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "207898 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5761,
            "unit": "ns/op",
            "extra": "207898 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "207898 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "207898 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5694,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "213501 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5694,
            "unit": "ns/op",
            "extra": "213501 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "213501 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "213501 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6142,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "213787 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6142,
            "unit": "ns/op",
            "extra": "213787 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "213787 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "213787 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10221,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117712 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10221,
            "unit": "ns/op",
            "extra": "117712 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117712 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117712 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10155,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "119224 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10155,
            "unit": "ns/op",
            "extra": "119224 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "119224 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "119224 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10131,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118302 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10131,
            "unit": "ns/op",
            "extra": "118302 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118302 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118302 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14867,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14867,
            "unit": "ns/op",
            "extra": "79202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79202 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14935,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80800 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14935,
            "unit": "ns/op",
            "extra": "80800 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80800 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80800 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15626,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "76023 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15626,
            "unit": "ns/op",
            "extra": "76023 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "76023 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "76023 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15842,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75637 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15842,
            "unit": "ns/op",
            "extra": "75637 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75637 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75637 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15820,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15820,
            "unit": "ns/op",
            "extra": "75740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75740 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16977,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "74973 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16977,
            "unit": "ns/op",
            "extra": "74973 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "74973 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "74973 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14493,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "81700 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14493,
            "unit": "ns/op",
            "extra": "81700 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "81700 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81700 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14689,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82623 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14689,
            "unit": "ns/op",
            "extra": "82623 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82623 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82623 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14471,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82375 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14471,
            "unit": "ns/op",
            "extra": "82375 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82375 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82375 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16331,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "72621 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16331,
            "unit": "ns/op",
            "extra": "72621 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "72621 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "72621 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16337,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "71404 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16337,
            "unit": "ns/op",
            "extra": "71404 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "71404 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71404 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16324,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16324,
            "unit": "ns/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73057 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9997,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9997,
            "unit": "ns/op",
            "extra": "118893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118893 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10690,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119215 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10690,
            "unit": "ns/op",
            "extra": "119215 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119215 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119215 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10037,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119994 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10037,
            "unit": "ns/op",
            "extra": "119994 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119994 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119994 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6469,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188024 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6469,
            "unit": "ns/op",
            "extra": "188024 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188024 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188024 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6378,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "177711 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6378,
            "unit": "ns/op",
            "extra": "177711 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "177711 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "177711 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6418,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "189891 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6418,
            "unit": "ns/op",
            "extra": "189891 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "189891 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "189891 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12626,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "94978 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12626,
            "unit": "ns/op",
            "extra": "94978 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "94978 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94978 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12621,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "94789 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12621,
            "unit": "ns/op",
            "extra": "94789 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "94789 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94789 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12705,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "94461 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12705,
            "unit": "ns/op",
            "extra": "94461 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "94461 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "94461 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "381d59a9bd9db52acbaf6a6e6c59b27b23522db4",
          "message": "feat: lint must-be-only-statement-in-batch for CREATE VIEW/PROCEDURE/FUNCTION/TYPE\n\nAdds a new lint rule `must-be-only-statement-in-batch` that warns when a\nCREATE VIEW, CREATE PROCEDURE, CREATE FUNCTION, or CREATE TYPE AS TABLE\nstatement appears alongside other statements in the same batch.\n\nIn T-SQL (and most SQL dialects), these DDL statements must be the first —\nand only — statement in a batch. Mixing them with other statements causes\na compile-time error at runtime. The rule fires once per offending DDL\nstatement, naming the object, so the message pinpoints exactly which\nCREATE caused the violation.\n\nCREATE TYPE AS scalar/alias types (non-table kinds) are exempt, as they\ncarry no such batch restriction.\n\nCloses #109",
          "timestamp": "2026-03-12T16:00:09-04:00",
          "tree_id": "06625f638b22d01a2dc7c6d73034965c5c37c8bc",
          "url": "https://github.com/rpf3/sqlfmt/commit/381d59a9bd9db52acbaf6a6e6c59b27b23522db4"
        },
        "date": 1773345677854,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 351915,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "3320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 351915,
            "unit": "ns/op",
            "extra": "3320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "3320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3320 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 352232,
            "unit": "ns/op\t  157817 B/op\t    2892 allocs/op",
            "extra": "2859 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 352232,
            "unit": "ns/op",
            "extra": "2859 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157817,
            "unit": "B/op",
            "extra": "2859 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "2859 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 341267,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 341267,
            "unit": "ns/op",
            "extra": "3326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 185348,
            "unit": "ns/op\t   66001 B/op\t    2103 allocs/op",
            "extra": "6050 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 185348,
            "unit": "ns/op",
            "extra": "6050 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66001,
            "unit": "B/op",
            "extra": "6050 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6050 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 183202,
            "unit": "ns/op\t   66001 B/op\t    2103 allocs/op",
            "extra": "6321 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 183202,
            "unit": "ns/op",
            "extra": "6321 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66001,
            "unit": "B/op",
            "extra": "6321 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6321 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 182265,
            "unit": "ns/op\t   66000 B/op\t    2103 allocs/op",
            "extra": "6634 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 182265,
            "unit": "ns/op",
            "extra": "6634 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66000,
            "unit": "B/op",
            "extra": "6634 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6634 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 61484,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19106 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 61484,
            "unit": "ns/op",
            "extra": "19106 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19106 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19106 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58853,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20356 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58853,
            "unit": "ns/op",
            "extra": "20356 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20356 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20356 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 62771,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 62771,
            "unit": "ns/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 251872,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4544 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 251872,
            "unit": "ns/op",
            "extra": "4544 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4544 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4544 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 250862,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4753 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 250862,
            "unit": "ns/op",
            "extra": "4753 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4753 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4753 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 252106,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4444 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 252106,
            "unit": "ns/op",
            "extra": "4444 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4444 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4444 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 893384,
            "unit": "ns/op\t  359385 B/op\t    8078 allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 893384,
            "unit": "ns/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359385,
            "unit": "B/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1336 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 897669,
            "unit": "ns/op\t  359385 B/op\t    8078 allocs/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 897669,
            "unit": "ns/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359385,
            "unit": "B/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1309 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 887785,
            "unit": "ns/op\t  359383 B/op\t    8078 allocs/op",
            "extra": "1326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 887785,
            "unit": "ns/op",
            "extra": "1326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359383,
            "unit": "B/op",
            "extra": "1326 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1326 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1012,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1186920 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1012,
            "unit": "ns/op",
            "extra": "1186920 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1186920 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1186920 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1062,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1102218 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1062,
            "unit": "ns/op",
            "extra": "1102218 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1102218 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1102218 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1111,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1111,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5689,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "203746 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5689,
            "unit": "ns/op",
            "extra": "203746 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "203746 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "203746 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5708,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "205018 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5708,
            "unit": "ns/op",
            "extra": "205018 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "205018 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "205018 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5688,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "209181 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5688,
            "unit": "ns/op",
            "extra": "209181 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "209181 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "209181 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10231,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "116515 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10231,
            "unit": "ns/op",
            "extra": "116515 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "116515 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "116515 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10172,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118111 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10172,
            "unit": "ns/op",
            "extra": "118111 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118111 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118111 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10134,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118996 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10134,
            "unit": "ns/op",
            "extra": "118996 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118996 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118996 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15052,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80394 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15052,
            "unit": "ns/op",
            "extra": "80394 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80394 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80394 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16746,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78633 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16746,
            "unit": "ns/op",
            "extra": "78633 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78633 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78633 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15048,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "78960 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15048,
            "unit": "ns/op",
            "extra": "78960 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "78960 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "78960 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16000,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "70308 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16000,
            "unit": "ns/op",
            "extra": "70308 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "70308 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "70308 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15847,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "74583 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15847,
            "unit": "ns/op",
            "extra": "74583 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "74583 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "74583 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15877,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75304 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15877,
            "unit": "ns/op",
            "extra": "75304 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75304 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75304 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14573,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "81768 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14573,
            "unit": "ns/op",
            "extra": "81768 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "81768 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81768 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14484,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "83170 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14484,
            "unit": "ns/op",
            "extra": "83170 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "83170 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "83170 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14579,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82801 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14579,
            "unit": "ns/op",
            "extra": "82801 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82801 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82801 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16359,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "73194 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16359,
            "unit": "ns/op",
            "extra": "73194 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "73194 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73194 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 17508,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "73245 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 17508,
            "unit": "ns/op",
            "extra": "73245 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "73245 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73245 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16246,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "73760 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16246,
            "unit": "ns/op",
            "extra": "73760 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "73760 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "73760 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9960,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "118524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9960,
            "unit": "ns/op",
            "extra": "118524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "118524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10004,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "120836 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10004,
            "unit": "ns/op",
            "extra": "120836 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "120836 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "120836 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 9996,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119178 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 9996,
            "unit": "ns/op",
            "extra": "119178 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119178 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119178 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6310,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "185562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6310,
            "unit": "ns/op",
            "extra": "185562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "185562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "185562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6341,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "190490 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6341,
            "unit": "ns/op",
            "extra": "190490 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "190490 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "190490 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6316,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "192512 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6316,
            "unit": "ns/op",
            "extra": "192512 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "192512 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "192512 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12765,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "93362 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12765,
            "unit": "ns/op",
            "extra": "93362 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "93362 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93362 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12967,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "93452 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12967,
            "unit": "ns/op",
            "extra": "93452 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "93452 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "93452 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12683,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "92670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12683,
            "unit": "ns/op",
            "extra": "92670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "92670 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92670 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "53295416e2c33a503f7dadac4d7c11954e8a1752",
          "message": "feat: parse and format DECLARE statement\n\nAdds DECLARE statement support for T-SQL scalar and table variable\ndeclarations.\n\nParser:\n- Adds DECLARE to the keyword list so the lexer classifies it correctly\n- parseDeclare() handles multi-variable comma lists, optional = default\n  on scalar vars, and TABLE (...) column blocks for table variables\n- Default expressions are captured as a single RawExpr token, consistent\n  with how column DEFAULT values are stored; subquery defaults are deferred\n  to issue #97\n\nFormatter:\n- Single scalar var: inline on one line — `declare @name type [= default];`\n- Multiple scalar vars: `declare` on its own line, one var per line via\n  writeCommaList (respects comma_style config)\n- Table variable: `declare @name table\\n(\\n<cols>\\n);` — column block\n  reuses writeColumnDef, identical to CREATE TABLE column rendering\n\nCloses #95",
          "timestamp": "2026-03-12T17:45:15-04:00",
          "tree_id": "e041f70285b6fe08bbb75483adf1a6ec7a22f543",
          "url": "https://github.com/rpf3/sqlfmt/commit/53295416e2c33a503f7dadac4d7c11954e8a1752"
        },
        "date": 1773351988566,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 340918,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3266 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 340918,
            "unit": "ns/op",
            "extra": "3266 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3266 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3266 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 343159,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3382 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 343159,
            "unit": "ns/op",
            "extra": "3382 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3382 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3382 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 342449,
            "unit": "ns/op\t  157816 B/op\t    2892 allocs/op",
            "extra": "3490 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 342449,
            "unit": "ns/op",
            "extra": "3490 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 157816,
            "unit": "B/op",
            "extra": "3490 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2892,
            "unit": "allocs/op",
            "extra": "3490 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 201112,
            "unit": "ns/op\t   65998 B/op\t    2103 allocs/op",
            "extra": "6022 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 201112,
            "unit": "ns/op",
            "extra": "6022 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65998,
            "unit": "B/op",
            "extra": "6022 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6022 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 185726,
            "unit": "ns/op\t   65999 B/op\t    2103 allocs/op",
            "extra": "6229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 185726,
            "unit": "ns/op",
            "extra": "6229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 65999,
            "unit": "B/op",
            "extra": "6229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6229 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 183753,
            "unit": "ns/op\t   66000 B/op\t    2103 allocs/op",
            "extra": "6535 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 183753,
            "unit": "ns/op",
            "extra": "6535 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66000,
            "unit": "B/op",
            "extra": "6535 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6535 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58070,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20677 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58070,
            "unit": "ns/op",
            "extra": "20677 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20677 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20677 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58148,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20714 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58148,
            "unit": "ns/op",
            "extra": "20714 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20714 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20714 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 58152,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20492 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 58152,
            "unit": "ns/op",
            "extra": "20492 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20492 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20492 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 252516,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4671 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 252516,
            "unit": "ns/op",
            "extra": "4671 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4671 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4671 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 252158,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4244 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 252158,
            "unit": "ns/op",
            "extra": "4244 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4244 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4244 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 256720,
            "unit": "ns/op\t  114000 B/op\t    2407 allocs/op",
            "extra": "4891 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 256720,
            "unit": "ns/op",
            "extra": "4891 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 114000,
            "unit": "B/op",
            "extra": "4891 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4891 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 923736,
            "unit": "ns/op\t  359391 B/op\t    8078 allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 923736,
            "unit": "ns/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359391,
            "unit": "B/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 896641,
            "unit": "ns/op\t  359387 B/op\t    8078 allocs/op",
            "extra": "1299 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 896641,
            "unit": "ns/op",
            "extra": "1299 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359387,
            "unit": "B/op",
            "extra": "1299 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1299 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 910244,
            "unit": "ns/op\t  359380 B/op\t    8078 allocs/op",
            "extra": "1218 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 910244,
            "unit": "ns/op",
            "extra": "1218 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 359380,
            "unit": "B/op",
            "extra": "1218 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8078,
            "unit": "allocs/op",
            "extra": "1218 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1004,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1004,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1019,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1177166 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1019,
            "unit": "ns/op",
            "extra": "1177166 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1177166 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1177166 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1059,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1059,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5665,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "212336 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5665,
            "unit": "ns/op",
            "extra": "212336 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "212336 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "212336 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5581,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "214928 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5581,
            "unit": "ns/op",
            "extra": "214928 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "214928 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "214928 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 6036,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "217711 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 6036,
            "unit": "ns/op",
            "extra": "217711 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "217711 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "217711 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10152,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "117738 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10152,
            "unit": "ns/op",
            "extra": "117738 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "117738 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "117738 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10219,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "110770 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10219,
            "unit": "ns/op",
            "extra": "110770 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "110770 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "110770 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10084,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "118726 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10084,
            "unit": "ns/op",
            "extra": "118726 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "118726 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "118726 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14989,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80108 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14989,
            "unit": "ns/op",
            "extra": "80108 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80108 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80108 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15014,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "79746 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15014,
            "unit": "ns/op",
            "extra": "79746 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "79746 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "79746 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14898,
            "unit": "ns/op\t    6216 B/op\t     137 allocs/op",
            "extra": "80946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14898,
            "unit": "ns/op",
            "extra": "80946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6216,
            "unit": "B/op",
            "extra": "80946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "80946 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15914,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "74440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15914,
            "unit": "ns/op",
            "extra": "74440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "74440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "74440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16996,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75009 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16996,
            "unit": "ns/op",
            "extra": "75009 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75009 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75009 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15912,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "75097 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15912,
            "unit": "ns/op",
            "extra": "75097 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "75097 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "75097 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14711,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82486 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14711,
            "unit": "ns/op",
            "extra": "82486 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82486 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82486 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14486,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82753 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14486,
            "unit": "ns/op",
            "extra": "82753 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82753 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82753 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14546,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "82434 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14546,
            "unit": "ns/op",
            "extra": "82434 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "82434 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "82434 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16657,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "70984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16657,
            "unit": "ns/op",
            "extra": "70984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "70984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "70984 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16737,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "70995 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16737,
            "unit": "ns/op",
            "extra": "70995 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "70995 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "70995 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16703,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "71524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16703,
            "unit": "ns/op",
            "extra": "71524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "71524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "71524 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10017,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "119455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10017,
            "unit": "ns/op",
            "extra": "119455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "119455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "119455 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10787,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "113781 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10787,
            "unit": "ns/op",
            "extra": "113781 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "113781 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "113781 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10218,
            "unit": "ns/op\t    4040 B/op\t      96 allocs/op",
            "extra": "117782 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10218,
            "unit": "ns/op",
            "extra": "117782 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4040,
            "unit": "B/op",
            "extra": "117782 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117782 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6356,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "186298 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6356,
            "unit": "ns/op",
            "extra": "186298 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "186298 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "186298 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6357,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "186534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6357,
            "unit": "ns/op",
            "extra": "186534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "186534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "186534 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6362,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "188367 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6362,
            "unit": "ns/op",
            "extra": "188367 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "188367 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "188367 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12880,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "90906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12880,
            "unit": "ns/op",
            "extra": "90906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "90906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "90906 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12830,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "92779 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12830,
            "unit": "ns/op",
            "extra": "92779 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "92779 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92779 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 12901,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "92518 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 12901,
            "unit": "ns/op",
            "extra": "92518 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "92518 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "92518 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rpf3.io",
            "name": "Richard P. Field III"
          },
          "committer": {
            "email": "github.reorder159@passmail.net",
            "name": "Richard P. Field III",
            "username": "rpf3"
          },
          "distinct": true,
          "id": "6e60bcb1c860fdf1439e04579387ca78e3469507",
          "message": "feat: parse and format IDENTITY column attribute\n\nAdds support for T-SQL IDENTITY on column definitions.\nBoth bare IDENTITY and IDENTITY(seed, increment) are handled.\n\nThe seed and increment are stored as raw string token values in\nIdentitySpec so no numeric conversion is needed — the formatter\nround-trips them directly, matching the existing pattern for DataType\nand Default which are also raw strings.\n\nIDENTITY is added to the keyword map so the parser can detect it with\ncurKeyword(). It is parsed immediately after the data type and before\nPRIMARY KEY, matching T-SQL column definition order.\n\nCloses #158",
          "timestamp": "2026-03-13T08:26:18-04:00",
          "tree_id": "f009bd33f1ce8c819c5fad3e362441488aae3103",
          "url": "https://github.com/rpf3/sqlfmt/commit/6e60bcb1c860fdf1439e04579387ca78e3469507"
        },
        "date": 1773404850547,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 359433,
            "unit": "ns/op\t  165560 B/op\t    2895 allocs/op",
            "extra": "3200 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 359433,
            "unit": "ns/op",
            "extra": "3200 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 165560,
            "unit": "B/op",
            "extra": "3200 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2895,
            "unit": "allocs/op",
            "extra": "3200 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 363908,
            "unit": "ns/op\t  165560 B/op\t    2895 allocs/op",
            "extra": "2848 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 363908,
            "unit": "ns/op",
            "extra": "2848 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 165560,
            "unit": "B/op",
            "extra": "2848 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2895,
            "unit": "allocs/op",
            "extra": "2848 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 363705,
            "unit": "ns/op\t  165560 B/op\t    2895 allocs/op",
            "extra": "3126 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 363705,
            "unit": "ns/op",
            "extra": "3126 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 165560,
            "unit": "B/op",
            "extra": "3126 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/tables (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2895,
            "unit": "allocs/op",
            "extra": "3126 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 198905,
            "unit": "ns/op\t   66000 B/op\t    2103 allocs/op",
            "extra": "5595 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 198905,
            "unit": "ns/op",
            "extra": "5595 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66000,
            "unit": "B/op",
            "extra": "5595 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5595 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 208104,
            "unit": "ns/op\t   66000 B/op\t    2103 allocs/op",
            "extra": "5934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 208104,
            "unit": "ns/op",
            "extra": "5934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66000,
            "unit": "B/op",
            "extra": "5934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "5934 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 193868,
            "unit": "ns/op\t   66000 B/op\t    2103 allocs/op",
            "extra": "6168 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 193868,
            "unit": "ns/op",
            "extra": "6168 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 66000,
            "unit": "B/op",
            "extra": "6168 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/views (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2103,
            "unit": "allocs/op",
            "extra": "6168 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 59366,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20138 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 59366,
            "unit": "ns/op",
            "extra": "20138 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20138 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20138 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 60479,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 60479,
            "unit": "ns/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "20275 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 60389,
            "unit": "ns/op\t   21536 B/op\t     676 allocs/op",
            "extra": "19602 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 60389,
            "unit": "ns/op",
            "extra": "19602 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 21536,
            "unit": "B/op",
            "extra": "19602 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/indexes (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 676,
            "unit": "allocs/op",
            "extra": "19602 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 262677,
            "unit": "ns/op\t  115185 B/op\t    2407 allocs/op",
            "extra": "4549 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 262677,
            "unit": "ns/op",
            "extra": "4549 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 115185,
            "unit": "B/op",
            "extra": "4549 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4549 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 263233,
            "unit": "ns/op\t  115184 B/op\t    2407 allocs/op",
            "extra": "4538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 263233,
            "unit": "ns/op",
            "extra": "4538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 115184,
            "unit": "B/op",
            "extra": "4538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4538 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 266853,
            "unit": "ns/op\t  115184 B/op\t    2407 allocs/op",
            "extra": "4338 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 266853,
            "unit": "ns/op",
            "extra": "4338 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 115184,
            "unit": "B/op",
            "extra": "4338 times\n2 procs"
          },
          {
            "name": "BenchmarkFormat/migrations (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 2407,
            "unit": "allocs/op",
            "extra": "4338 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 988266,
            "unit": "ns/op\t  368318 B/op\t    8081 allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 988266,
            "unit": "ns/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 368318,
            "unit": "B/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8081,
            "unit": "allocs/op",
            "extra": "1300 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 954156,
            "unit": "ns/op\t  368318 B/op\t    8081 allocs/op",
            "extra": "1232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 954156,
            "unit": "ns/op",
            "extra": "1232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 368318,
            "unit": "B/op",
            "extra": "1232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8081,
            "unit": "allocs/op",
            "extra": "1232 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter)",
            "value": 949819,
            "unit": "ns/op\t  368315 B/op\t    8081 allocs/op",
            "extra": "1230 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - ns/op",
            "value": 949819,
            "unit": "ns/op",
            "extra": "1230 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - B/op",
            "value": 368315,
            "unit": "B/op",
            "extra": "1230 times\n2 procs"
          },
          {
            "name": "BenchmarkFormatFull (github.com/rpf3/sqlfmt/internal/formatter) - allocs/op",
            "value": 8081,
            "unit": "allocs/op",
            "extra": "1230 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1023,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1172020 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1023,
            "unit": "ns/op",
            "extra": "1172020 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1172020 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1172020 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1026,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1026,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 1013,
            "unit": "ns/op\t    1360 B/op\t      12 allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 1013,
            "unit": "ns/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/simple (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "1000000 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5695,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "194814 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5695,
            "unit": "ns/op",
            "extra": "194814 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "194814 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "194814 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5737,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "204010 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5737,
            "unit": "ns/op",
            "extra": "204010 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "204010 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "204010 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 5714,
            "unit": "ns/op\t    6224 B/op\t      59 allocs/op",
            "extra": "210026 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 5714,
            "unit": "ns/op",
            "extra": "210026 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 6224,
            "unit": "B/op",
            "extra": "210026 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/medium (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 59,
            "unit": "allocs/op",
            "extra": "210026 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 15071,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "113796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 15071,
            "unit": "ns/op",
            "extra": "113796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "113796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "113796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10322,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "114796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10322,
            "unit": "ns/op",
            "extra": "114796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "114796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "114796 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer)",
            "value": 10369,
            "unit": "ns/op\t   12584 B/op\t      94 allocs/op",
            "extra": "116600 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - ns/op",
            "value": 10369,
            "unit": "ns/op",
            "extra": "116600 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - B/op",
            "value": 12584,
            "unit": "B/op",
            "extra": "116600 times\n2 procs"
          },
          {
            "name": "BenchmarkTokenize/complex (github.com/rpf3/sqlfmt/internal/lexer) - allocs/op",
            "value": 94,
            "unit": "allocs/op",
            "extra": "116600 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15533,
            "unit": "ns/op\t    6280 B/op\t     137 allocs/op",
            "extra": "74569 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15533,
            "unit": "ns/op",
            "extra": "74569 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6280,
            "unit": "B/op",
            "extra": "74569 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "74569 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15550,
            "unit": "ns/op\t    6280 B/op\t     137 allocs/op",
            "extra": "75579 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15550,
            "unit": "ns/op",
            "extra": "75579 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6280,
            "unit": "B/op",
            "extra": "75579 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75579 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16024,
            "unit": "ns/op\t    6280 B/op\t     137 allocs/op",
            "extra": "75556 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16024,
            "unit": "ns/op",
            "extra": "75556 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 6280,
            "unit": "B/op",
            "extra": "75556 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/ddl (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 137,
            "unit": "allocs/op",
            "extra": "75556 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16380,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "70387 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16380,
            "unit": "ns/op",
            "extra": "70387 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "70387 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "70387 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 16362,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "73032 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 16362,
            "unit": "ns/op",
            "extra": "73032 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "73032 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "73032 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 17524,
            "unit": "ns/op\t    4304 B/op\t     201 allocs/op",
            "extra": "72163 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 17524,
            "unit": "ns/op",
            "extra": "72163 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "72163 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/select (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 201,
            "unit": "allocs/op",
            "extra": "72163 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14993,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "80440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14993,
            "unit": "ns/op",
            "extra": "80440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "80440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "80440 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 15137,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "79425 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 15137,
            "unit": "ns/op",
            "extra": "79425 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "79425 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "79425 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter)",
            "value": 14797,
            "unit": "ns/op\t    4304 B/op\t     185 allocs/op",
            "extra": "81549 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - ns/op",
            "value": 14797,
            "unit": "ns/op",
            "extra": "81549 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - B/op",
            "value": 4304,
            "unit": "B/op",
            "extra": "81549 times\n2 procs"
          },
          {
            "name": "BenchmarkLint/dml (github.com/rpf3/sqlfmt/internal/linter) - allocs/op",
            "value": 185,
            "unit": "allocs/op",
            "extra": "81549 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16779,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "70879 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16779,
            "unit": "ns/op",
            "extra": "70879 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "70879 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "70879 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16888,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "69970 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16888,
            "unit": "ns/op",
            "extra": "69970 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "69970 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "69970 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 16821,
            "unit": "ns/op\t    4232 B/op\t     216 allocs/op",
            "extra": "68758 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 16821,
            "unit": "ns/op",
            "extra": "68758 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4232,
            "unit": "B/op",
            "extra": "68758 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/select (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 216,
            "unit": "allocs/op",
            "extra": "68758 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10215,
            "unit": "ns/op\t    4104 B/op\t      96 allocs/op",
            "extra": "118238 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10215,
            "unit": "ns/op",
            "extra": "118238 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4104,
            "unit": "B/op",
            "extra": "118238 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "118238 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 10319,
            "unit": "ns/op\t    4104 B/op\t      96 allocs/op",
            "extra": "115562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 10319,
            "unit": "ns/op",
            "extra": "115562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4104,
            "unit": "B/op",
            "extra": "115562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "115562 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 11216,
            "unit": "ns/op\t    4104 B/op\t      96 allocs/op",
            "extra": "117600 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 11216,
            "unit": "ns/op",
            "extra": "117600 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 4104,
            "unit": "B/op",
            "extra": "117600 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/create_table (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "117600 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6695,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "178106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6695,
            "unit": "ns/op",
            "extra": "178106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "178106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "178106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6581,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6581,
            "unit": "ns/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "180513 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 6617,
            "unit": "ns/op\t    2904 B/op\t     129 allocs/op",
            "extra": "176466 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 6617,
            "unit": "ns/op",
            "extra": "176466 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 2904,
            "unit": "B/op",
            "extra": "176466 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/insert (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 129,
            "unit": "allocs/op",
            "extra": "176466 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13376,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "84370 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13376,
            "unit": "ns/op",
            "extra": "84370 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "84370 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "84370 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13299,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "90106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13299,
            "unit": "ns/op",
            "extra": "90106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "90106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "90106 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser)",
            "value": 13372,
            "unit": "ns/op\t    3288 B/op\t     151 allocs/op",
            "extra": "89899 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - ns/op",
            "value": 13372,
            "unit": "ns/op",
            "extra": "89899 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - B/op",
            "value": 3288,
            "unit": "B/op",
            "extra": "89899 times\n2 procs"
          },
          {
            "name": "BenchmarkParse/merge (github.com/rpf3/sqlfmt/internal/parser) - allocs/op",
            "value": 151,
            "unit": "allocs/op",
            "extra": "89899 times\n2 procs"
          }
        ]
      }
    ]
  }
}