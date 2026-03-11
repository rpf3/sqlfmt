-- simple UNION ALL
select id, name from orders where status = 'active' union all select id, name from archived_orders where status = 'active';

-- simple UNION (distinct)
select t.customer_id from orders as t union select t.customer_id from archived_orders as t;

-- INTERSECT
select t.customer_id from orders as t intersect select t.customer_id from preferred_customers as t;

-- EXCEPT
select t.customer_id from all_customers as t except select t.customer_id from churned_customers as t;

-- three-branch UNION ALL
select id, name, status from orders union all select id, name, status from archived_orders union all select id, name, status from deleted_orders;

-- UNION ALL with ORDER BY on the whole set (ORDER BY applies to the combined result)
select id, name from orders where status = 'active' union all select id, name from archived_orders where status = 'active' order by name asc;

-- UNION ALL with complex branches (GROUP BY, HAVING)
select t.region, count(*) as order_count from orders as t group by t.region having count(*) > 10 union all select t.region, count(*) as order_count from archived_orders as t group by t.region having count(*) > 10;

-- UNION ALL inside a CTE
with combined as (select id, status from orders union all select id, status from archived_orders) select c.id, c.status from combined as c where c.status = 'active';

-- UNION ALL inside a CTE with ORDER BY on outer query
with combined as (select id, name from orders union all select id, name from archived_orders) select c.id, c.name from combined as c order by c.name asc;
