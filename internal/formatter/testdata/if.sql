if @count > 0
begin
	update
		orders
	set
		status = 'active';
end;

if @count > 0
begin
	select @count;
end
else
begin
	select 0;
end;

if @x > 0
begin
	select 1;
end;
