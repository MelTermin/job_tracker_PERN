 create table users (
	user_id serial primary key,
	user_name varchar (100) not null ,
	user_lastname varchar(100) not null unique,
  user_email varchar (100) not null ,	
  password varchar (255) not null 
);