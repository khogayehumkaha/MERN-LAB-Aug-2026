
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
port: '5432',
database: 'MyDB',
});
module.exports=pool;

/*  PgAdmin - Query-Tool 7.

drop table users;

create table users( id serial primary key, name varchar(50) not null,email varchar(50) not null unique );



For Sign IN 10.JWT 

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Insert a client
INSERT INTO clients (username, password) VALUES ('student', 'student123');

*/