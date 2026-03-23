-- Minimal form
DECLARE vend_cursor CURSOR FOR SELECT vendor_id, name FROM purchasing.vendor WHERE preferred_vendor_status = 1 ORDER BY vendor_id;

-- ISO: INSENSITIVE only
DECLARE vend_cursor INSENSITIVE CURSOR FOR SELECT vendor_id FROM purchasing.vendor;

-- ISO: SCROLL only
DECLARE vend_cursor SCROLL CURSOR FOR SELECT vendor_id FROM purchasing.vendor;

-- ISO: INSENSITIVE SCROLL
DECLARE vend_cursor INSENSITIVE SCROLL CURSOR FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: LOCAL
DECLARE vend_cursor CURSOR LOCAL FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: GLOBAL FORWARD_ONLY
DECLARE vend_cursor CURSOR GLOBAL FORWARD_ONLY FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: SCROLL STATIC READ_ONLY
DECLARE vend_cursor CURSOR SCROLL STATIC READ_ONLY FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: KEYSET SCROLL_LOCKS
DECLARE vend_cursor CURSOR KEYSET SCROLL_LOCKS FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: DYNAMIC OPTIMISTIC TYPE_WARNING
DECLARE vend_cursor CURSOR DYNAMIC OPTIMISTIC TYPE_WARNING FOR SELECT vendor_id FROM purchasing.vendor;

-- T-SQL extended: all options
DECLARE vend_cursor CURSOR LOCAL SCROLL FAST_FORWARD READ_ONLY TYPE_WARNING FOR SELECT vendor_id FROM purchasing.vendor;

-- FOR UPDATE (no column list)
DECLARE vend_cursor CURSOR FOR SELECT vendor_id FROM purchasing.vendor FOR UPDATE;

-- FOR UPDATE OF column list
DECLARE vend_cursor CURSOR FOR SELECT vendor_id, name FROM purchasing.vendor FOR UPDATE OF vendor_id, name;
