-- Drops the employee_db if it exists currently --
-- DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- Make it so all of the following code will affect employee_db --
USE employee_db;

-- Creates the table "department" within employee_db --
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (  
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (  
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("IT"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 60000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 5), ("Legal Team Lead", 250000, 3), ("Lawyer", 190000, 3), ("Help Desk", 80000, 4);

select * from role;
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ellin"), ("Tjondrokusumo"), (2);
select * from employee;

delete from department where id =9;