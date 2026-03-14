begin try
	insert into orders
	(
		customer_id
	)
	values
	(
		42
	);

	commit transaction;
end try
begin catch
	rollback transaction;

	throw;
end catch;

throw 50001, 'Order not found', 1;

throw;

create procedure dbo.usp_SafeInsert
(
	@customer_id int
)
as begin
	begin try
		insert into orders
		(
			customer_id
		)
		values
		(
			@customer_id
		);
	end try
	begin catch
		rollback transaction;

		throw;
	end catch;
end;
