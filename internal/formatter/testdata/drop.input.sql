DROP TABLE IF EXISTS ingredients;
DROP VIEW my_view;
DROP INDEX IF EXISTS ix_recipe_ingredients_ingredient;
DROP PROCEDURE dbo.usp_ProcessOrders;
DROP PROC dbo.usp_ArchiveOldOrders;
DROP FUNCTION dbo.fn_get_total;
DROP FUNCTION IF EXISTS dbo.fn_calc_tax;
DROP SEQUENCE dbo.order_seq;
DROP SEQUENCE IF EXISTS dbo.order_seq;
