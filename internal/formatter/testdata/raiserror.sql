raiserror('Something went wrong', 16, 1);

raiserror(@msg, 16, 1);

raiserror(50001, 16, 1);

raiserror('Processing...', 10, 1) with nowait;

raiserror('Critical error', 16, 1) with log;

raiserror('Critical error', 16, 1) with seterror, log;

begin try
	insert into dbo.orders
	(
		customer_id
	)
	values
	(
		42
	);
end try
begin catch
	rollback transaction;

	raiserror('Insert failed', 16, 1);
end catch;
