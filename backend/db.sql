create database cars;
use cars;

create table users (
	id int primary key auto_increment,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    cpf varchar(11) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table parking_spaces (
    id varchar(5) primary key
);

create table cars (
    id int primary key auto_increment,
    brand varchar(255) not null,
    license_plate varchar(7) not null,
    driver int not null,
    parking_space varchar(5) unique,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (driver) references users(id),
    foreign key (parking_space) references parking_spaces(id)
);

INSERT INTO users (name, email, password, cpf) VALUES ("Bruno", "bruno@email.com", "admin123", "12345678910");

INSERT INTO parking_spaces(id) VALUES ("3B7"), ("1A1"), ("1A2"), ("1A3"), ("1B1"), ("1B2"), ("1B3");

INSERT INTO cars (brand, license_plate, driver, parking_space) VALUES ("Chevrolet", "IOD-469", 1, "3B7");