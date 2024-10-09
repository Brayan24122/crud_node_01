create database proyecto;

use proyecto;

create table registros(
    id int auto_increment primary key,
    nombre_r varchar(50) not null,
    apellido_r varchar(50) not null,
    edad_r int

);

select * from registros;