create table orders
(
	customer_id int not null references customers (id)
		on delete cascade on update no action
,	product_id int references products (id)
		on delete set null
,	category_id int references categories (id)
		on delete set default on update restrict
);

create table order_lines
(
	order_id int not null
,	product_id int not null

,	constraint fk_order_lines_order
		foreign key (order_id) references orders (id)
		on delete cascade
,	constraint fk_order_lines_product
		foreign key (product_id) references products (id)
		on delete set null on update no action
);

create table simple
(
	parent_id int references parents (id)
);
