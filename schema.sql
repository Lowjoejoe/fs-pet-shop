DROP TABLE IF EXISTS pets CASCADE;

CREATE TABLE pets (
  pets_id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  pet_name varchar(255) default NULL,
  age integer, 
  kind varchar(200)
);

INSERT INTO pets (pet_name, age, kind) VALUES ('fido', 7, 'rainbow');
INSERT INTO pets (pet_name, age, kind) VALUES ('button', 5, 'snake');