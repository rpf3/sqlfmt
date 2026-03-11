package formatter

import (
	"strings"
	"testing"

	"github.com/rpf3/sqlfmt/internal/config"
)

func TestQuoteIdentifiers(t *testing.T) {
	cfg := config.Default()
	cfg.QuoteIdentifiers = true

	t.Run("bare table name gets bracketed", func(t *testing.T) {
		out, err := Format(`select id from orders as o;`, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !strings.Contains(out, "[orders]") {
			t.Errorf("expected [orders] in output, got:\n%s", out)
		}
		if !strings.Contains(out, "[o]") {
			t.Errorf("expected alias [o] in output, got:\n%s", out)
		}
	})

	t.Run("bracket-quoted input is normalised then re-bracketed", func(t *testing.T) {
		out, err := Format(`select id from [orders] as o;`, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !strings.Contains(out, "[orders]") {
			t.Errorf("expected [orders] in output, got:\n%s", out)
		}
	})

	t.Run("reserved-word table name always bracketed even without QuoteIdentifiers", func(t *testing.T) {
		plain := config.Default()
		out, err := Format(`select id from [order] as o;`, plain)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !strings.Contains(out, "[order]") {
			t.Errorf("expected [order] in output, got:\n%s", out)
		}
	})

	t.Run("QuoteIdentifiers false: bare names passed through unchanged", func(t *testing.T) {
		plain := config.Default()
		out, err := Format(`select id from orders as o;`, plain)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if strings.Contains(out, "[") {
			t.Errorf("expected no brackets with QuoteIdentifiers=false, got:\n%s", out)
		}
	})

	t.Run("CREATE TABLE with QuoteIdentifiers", func(t *testing.T) {
		out, err := Format(`create table orders (id int not null, constraint pk_orders primary key (id));`, cfg)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !strings.Contains(out, "[orders]") {
			t.Errorf("expected [orders] in output, got:\n%s", out)
		}
		if !strings.Contains(out, "[pk_orders]") {
			t.Errorf("expected [pk_orders] in output, got:\n%s", out)
		}
	})
}
