CREATE or REPLACE TRIGGER USER_ROLES_TRG
BEFORE INSERT
  ON USER_ROLES
FOR EACH ROW
  begin
    if :new.USER_ID is NULL then
      select (USERS_SEQ.nextval-1) into :new.USER_ID from dual;
    end if;
  end;
/
