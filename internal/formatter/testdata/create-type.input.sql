-- alias type (FROM base_type)
CREATE TYPE dbo.SSN FROM varchar(11) NOT NULL;

-- alias type without nullability
CREATE TYPE dbo.OrderStatus FROM nvarchar(20);

-- alias type with NULL
CREATE TYPE dbo.Notes FROM nvarchar(500) NULL;

-- table type (AS TABLE)
CREATE TYPE dbo.OrderList AS TABLE (order_id int NOT NULL, order_date date NOT NULL, amount decimal(10, 2) NOT NULL);

-- table type with primary key
CREATE TYPE dbo.EmployeeList AS TABLE (employee_id int NOT NULL, name nvarchar(100) NOT NULL, CONSTRAINT pk_employee_list PRIMARY KEY (employee_id));

-- table type with default
CREATE TYPE dbo.ProductList AS TABLE (product_id int NOT NULL, status nvarchar(20) CONSTRAINT df_status DEFAULT 'active' NOT NULL);
