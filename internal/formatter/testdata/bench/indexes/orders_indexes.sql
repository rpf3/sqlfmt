CREATE INDEX idx_orders_user_id ON orders (user_id ASC);
CREATE INDEX idx_orders_status ON orders (status ASC, placed_at DESC);
CREATE INDEX idx_orders_placed_at ON orders (placed_at DESC);
CREATE INDEX idx_orders_user_status ON orders (user_id ASC, status ASC, placed_at DESC);
CREATE UNIQUE INDEX uix_orders_gateway ON orders (user_id ASC, placed_at DESC);
