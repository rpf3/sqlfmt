CREATE INDEX idx_products_category_id ON products (category_id ASC);
CREATE INDEX idx_products_is_active ON products (is_active ASC, base_price ASC);
CREATE UNIQUE INDEX uix_products_sku ON products (sku ASC);
CREATE INDEX idx_products_created_at ON products (created_at DESC);
