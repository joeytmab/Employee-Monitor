require("dotenv").config();
const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    });

db.query = util.promisify(db.query);
 

//--QUERIES!--//

// employee table query
const viewAllEmployeesQuery = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    RIGHT JOIN role ON role_id = role.id
    RIGHT JOIN department ON department_id = department.id
    RIGHT JOIN employee AS manager ON employee.manager_id = manager.id
`

// manager table query
const viewByManagerQuery = `
    SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
    FROM employee AS manager
    RIGHT JOIN role ON employee.role_id = role.id
    RIGHT JOIN department ON department_id = department.id
    RIGHT JOIN employee ON employee.manager_id = manager.id
    
`

// role query
const viewAllRolesQuery = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON department_id = department.id
`

// dept view query
const viewAllDepartmentsQuery = `
    SELECT * FROM department
`

// view all employees; module.export
const viewAllEmployees = () => {
    return db.query(viewAllEmployeesQuery);
}

// add employee query
const addEmployee = () => {
    return db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", (first_name, last_name, role_id, manager_id) => {
        console.table(first_name, last_name, role_id, manager_id)
    });
}

// function to get ALL EMPLOYEES and list names
async function getAllEmployeeNames() {
    try {
        //get list of employees
        const empList = await viewAllEmployees();
        //use map to create stored array?
        const employeeNames = empList.map(employee => {
            return employee.first_name + " " + employee.last_name;
        });
        
        return employeeNames;

    } catch (err) {
        console.log(err);
    }
}

// remove employee by id
const removeEmployee = () => {
    return db.query("DELETE FROM employee WHERE id = ?", (id) => {
        console.table(id)
    });
}

// query for finding employee by first and last name.
const getEmployeebyName = () => {
    return db.query(viewAllEmployeesQuery + " WHERE employee.first_name = ? AND employee.last_name = ?", (first_name, last_name) => {
        console.table(first_name, last_name)
    });
}

// view all employees by dept
const viewAllbyDept = () => {
    return db.query(viewAllEmployeesQuery + " WHERE department.name = ?", (err, dept) => {
        if (err) throw err;
        console.table(dept)
    });
}

// view all employees by assigned manager
const viewAllByManager = () => {
    return db.query(viewByManagerQuery + " WHERE manager.first_name = ? AND manager.last_name = ?", (first_name, last_name) => {
        console.table(first_name, last_name)
    });
}

// function to get existing managers
async function getManagers() {
    try {
        // list of mgrs, with empty array for names
        const mgrTeam = await db.query(viewByManagerQuery);
        const mgrArray = [];
        //for each loop, then push names into mgrArray
        await mgrTeam.forEach(manager => {
            if (manager.manager !== null) {
                mgrArray.push(manager.manager);
            }
        });
        
    } catch (err) {
        console.log(err);
    }
}

// view all roles function
const viewAllRoles = () => {
    return db.query(viewAllRolesQuery);
}

// function to obtain array of roles
async function getAllRoles() {
    try {
        //list of roles, with array to house roles that exist
        const listOfRoles = await db.query(viewAllRolesQuery);
        const roleTitles = [];
        await listOfRoles.forEach(role => {
            if (role.title !== null) {
            roleTitles.push(role.title);
            }
        });
        return { roleTitles, listOfRoles };
    } catch (err) {
        console.log(err);
    }
}



// update employee role via query
const updateEmployeeRole = () => {
    return db.query("UPDATE employee SET role_id = ? WHERE employee.id = ?", (role_id, id) => {
        console.table(role_id, id)
    });
}

// query to update manager of an employee
const updateEmployeeManager = () => {
    return db.query("UPDATE employee SET manager_id = ? WHERE employee.id = ?", (manager_id, id) => {
        console.table(manager_id, id)
    });
}



// add role query
const addRole = () => {
    return db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", (title, salary, department_id) => {
        console.table(title, salary, department_id)
    }); 
}

// function to get an array containing all available depts
async function getAllDepts() {
    try {
        const departmentList = await db.query(viewAllDepartmentsQuery);
        const deptArray = [];
        await departmentList.forEach(department => {
            deptArray.push(department.name);
        });
        return { deptArray };
    } catch (err) {
        console.table(err);
    }
}

// query to get dept by name param
const getDeptByName = () => {
    return db.query(viewAllDepartmentsQuery + " WHERE name = ?", (name) => {
        console.table(name)
    });
}

// remove role query
const removeRole = () => {
    return db.query("DELETE FROM role WHERE title = ?", (title) => {
        console.table(title)
    });
}

// view all depts
const viewAllDepts = () => {
    return db.query(viewAllDepartmentsQuery);
}

// query for adding dept
const addDept = () => {
    return db.query("INSERT INTO department (name) VALUES (?)", (name) => {
        console.table(name)
    });
}

// Query to remove a department
const removeDept = () => {
    return db.query("DELETE FROM department WHERE name = ?", (name) => {
        console.table(name)
    });
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    getAllEmployeeNames,
    removeEmployee,
    getEmployeebyName,
    viewAllbyDept,
    getManagers,
    viewAllByManager,
    viewAllRoles,
    getAllRoles,
    updateEmployeeRole,
    updateEmployeeManager,
    addRole,
    getAllDepts,
    getDeptByName,
    removeRole,
    viewAllDepts,
    addDept,
    removeDept,
    db
}