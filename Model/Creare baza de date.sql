drop table Tranzactii;
drop table Imobile;
drop table Zona;
drop sequence id_imobil;
drop sequence id_zona;
--drop trigger id_imobil;
--drop trigger id_zona;

CREATE TABLE IMOBILE
(
  ID integer primary key,
  PRET integer not null,
  Descriere varchar2(3999) not null,
  date_contact varchar2(3999) not null,
  stare_cladire integer not null,
  facilitati VARCHAR2(3999) not null,
  riscuri varchar2(3999) not null
); 
/
CREATE TABLE ZONA
(
  ID integer primary key,
  PoluareF integer not null,
  PoluareA integer not null,
  Aglomeratie integer not null,
  Jafuri integer not null,
  Temperatura integer not null,
  Cost integer not null,
  Parcari integer not null
);
/
Create table TRANZACTII
(
    ID_IMOBIL integer NOT NULL,
    ID_Zona integer not null,
    Lat FLOAT(4) not null,
    Lon FLOAT(4) not null,
    Constraint imobil
        FOREIGN KEY(ID_imobil)
        references IMOBILE(id),
    CONSTRAINT zona
        foreign key(ID_zona)
        references Zona(ID)
);
/


CREATE SEQUENCE id_imobil START WITH 1;
CREATE SEQUENCE id_zona START WITH 1;

CREATE OR REPLACE TRIGGER id_imobil
BEFORE INSERT ON IMOBILE
FOR EACH ROW

BEGIN 
 SELECT id_imobil.NEXTVAL
 INTO :new.id
 from dual;
END;
/
CREATE OR REPLACE TRIGGER incr_idzona
BEFORE INSERT ON ZONA
FOR EACH ROW

BEGIN 
 SELECT id_zona.NEXTVAL
 INTO :new.id
 from dual;
END;
