begin transaction;

begin transaction;

begin transaction MyTxn;

commit;

commit;

commit;

rollback;

rollback;

rollback transaction MyTxn;

save transaction MySavepoint;

save transaction sp1;
