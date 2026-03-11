window.BENCHMARK_DATA = {
  "lastUpdate": 1773247640367,
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
      }
    ]
  }
}