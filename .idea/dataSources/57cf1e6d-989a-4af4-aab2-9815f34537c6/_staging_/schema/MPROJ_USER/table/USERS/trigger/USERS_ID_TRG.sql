create or replace trigger USER_ROLES_TRG
before insert on USER_ROLES
for each row
  begin
    if :new.USER_ID is null then
      select users_seq.nextval into :new.USER_ID from dual;
    end if;
  end;