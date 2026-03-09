CREATE INDEX idx_payments_order_id ON payments (order_id ASC);
CREATE INDEX idx_payments_status ON payments (status ASC, processed_at DESC);
CREATE INDEX idx_payments_processed_at ON payments (processed_at DESC);
CREATE UNIQUE INDEX uix_payments_gateway_ref ON payments (gateway_reference ASC);
