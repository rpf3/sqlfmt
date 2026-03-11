window.BENCHMARK_DATA = {
  "lastUpdate": 1773238256667,
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
      }
    ]
  }
}