USE employeesDB;

INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 80000, 1),
    ("Salesperson", 65000, 1),
    ("Lead Engineer", 110000, 2),
    ("Software Engineer", 85000, 2),
    ("Account Manager", 120000, 3),
    ("Accountant", 80000, 3),
    ("Legal Team Lead", 130000, 4),
    ("Lawyer", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Anthony", "Stark", 1, Null),
    ("Steve", "Rodgers", 2, 5),
    ("Thor", "Odinson", 3, 5),
    ("Natasha", "Romanoff", 4, 1),
    ("Bruce", "Banner", 5, Null),
    ("Clint", "Barton", 6, 1),
    ("Maria", "Hill", 7, 1),
    ("Nicolas", "Fury", 8, 1);
