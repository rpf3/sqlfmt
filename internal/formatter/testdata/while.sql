while @i < 10
begin
	set @i = @i + 1;
end;

while @i < 10
begin
	set @i = @i + 1;
end;

while 1 = 1
begin
	set @i = @i + 1;

	if @i > 10
	begin
		break;
	end;
end;

while @i < 10
begin
	if @i = 5
	begin
		continue;
	end;

	set @i = @i + 1;
end;
