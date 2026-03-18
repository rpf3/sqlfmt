SELECT t.permissions&4 AS has_flag FROM dbo.users AS t WHERE t.permissions&4<>0;
SELECT t.flags|128 AS new_flags,~t.flags AS inv_flags FROM dbo.items AS t;
SELECT t.a^t.b AS xor_result FROM dbo.t AS t;
SELECT t.id FROM dbo.t AS t WHERE (t.flags&4)=4 AND (t.flags|2)<>0;
