const db = require("./connection");

//EMP QUERIES
//baseline query, then expand with functions
//need view, add, delete, get all, 
//need get employee by name; -> for remove, update mgr/role of employee
const baselineEmpQuery = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role_id = role.id
    LEFT JOIN department ON department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
`
//viewallemployees
function viewAllEmployees() {
    return db.query(baselineEmpQuery);
}
//getallemployees
//asynchronous (get list of employees, THEN store in array and return)
async function getAllEmployeeNames() {
    try {
        
        const employeeList = await viewAllEmployees();
        const employeeArr = employeeList.map(emp => {
            return emp.first_name + " " + emp.last_name;
        });
        
        return employeeArr;

    } catch (err) {
        console.log(err);
    }
}
//add and remove employee queries
function addEmployee(first_name, last_name, role_id, manager_id) {
    return db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
}
function removeEmployee(id) {
    return db.query("DELETE FROM employee WHERE id = ?", [id]);
}

//getbyname
function getEmployeebyName(first_name, last_name) {
    return db.query(baselineEmpQuery + " WHERE employee.first_name = ? AND employee.last_name = ?", [first_name, last_name]);
}

//update employee role
function updateEmployeeRole(role_id, id) {
    return db.query("UPDATE employee SET role_id = ? WHERE employee.id = ?", [role_id, id]);
}

//MANAGER QUERIES
//baseline query, then extend with functions
//need viewall, get manager list,
//need update employee's manager? -> update in mysql
const baselineMgrQuery = `
    SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
    FROM employee AS manager
    RIGHT JOIN employee ON employee.manager_id = manager.id
    RIGHT JOIN role ON employee.role_id = role.id
    RIGHT JOIN department ON department_id = department.id
`
//need viewallby to select employees by mgr
function viewAllByManager(first_name, last_name) {
    return db.query(baselineMgrQuery + " WHERE manager.first_name = ? AND manager.last_name = ?", [first_name, last_name]);
}

//get array of managers (need asynchronous)
//get list of managers, THEN store into array (*need to get back to this*)
async function getManagers() {
    try {
        
        const managerList = await db.query(baselineMgrQuery);
        const mgrArr = []; //declare empty array
        //loop, then push into array
        await managerList.forEach(manager => {
            if (manager.manager !== null) {
                mgrArr.push(manager.manager);
            }
        });
        //need to filter so there's no duplicates; loop and push 
        const mgrArrFiltered = [];
        await mgrArr.forEach(manager => {
            if (mgrArrFiltered.indexOf(manager) < 0) {
                mgrArrFiltered.push(manager)
            }
        });
        //return
        return mgrArrFiltered;
    } catch (err) {
        console.log(err);
    }
}
//update manager of selected employee
function updateEmployeeManager(manager_id, id) {
    return db.query("UPDATE employee SET manager_id = ? WHERE employee.id = ?", [manager_id, id]);
}

//ROLE QUERIES
//create baseline, then expand on queries with specialized functions
//need view, add, remove roles
const baselineRoleQuery = `
    SELECT role.id, role.title, role.salary, department.name
    FROM role
    LEFT JOIN department ON department_id = department.id
`
//view all roles
function viewAllRoles() {
    return db.query(baselineRoleQuery);
}
//async function to get an array of all the existing roles (get array)
async function getAllRoles() {
    try {
        const roleList = await db.query(baselineRoleQuery);
        const roleArr = [];
        await roleList.forEach(role => {
            roleArr.push(role.title);
        });
        return { roleArr, roleList };
    } catch (err) {
        console.log(err);
    }
}
//add and remove role queries
function addRole(title, salary, department_id) {
    return db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department_id]); 
}
function removeRole(title) {
    return db.query("DELETE FROM role WHERE title = ?", [title]);
}

//DEPARTMENT QUERIES
//create baseline, then expand
//need getall, view, add, remove depts
//get employees by department? get all -> view all
const baselineDeptQuery =`
    SELECT * FROM department
`
//query to get array of all depts
async function getAllDepts() {
    try {
        const departmentList = await db.query(baselineDeptQuery);
        const departmentArr = [];
        await departmentList.forEach(department => {
            departmentArr.push(department.name);
        });
        return { departmentArr };
    } catch (err) {
        console.log(err);
    }
}
// Query to view employees by department
function viewAllByDepartment(department) {
    return db.query(baselineEmpQuery + " WHERE department.name = ?", [department]);
}
//getdept by name -> ned for add role
function getDepartmentByName(name) {
    return db.query(baselineDeptQuery + " WHERE name = ?", [name])
}
//view all depts
function viewAllDepts() {
    return db.query(baselineDeptQuery);
}
//query for adding, removing depts
function addDepartment(name) {
    return db.query("INSERT INTO department (name) VALUES (?)", [name]);
}
function removeDepartment(name) {
    return db.query("DELETE FROM department WHERE name = ?", [name]);
}

module.exports = {
    db,
    viewAllEmployees,
    getAllEmployeeNames,
    addEmployee,
    removeEmployee,
    getEmployeebyName,
    updateEmployeeRole,
    viewAllByManager,
    getManagers,
    updateEmployeeManager,
    viewAllRoles,
    getAllRoles,
    addRole,
    removeRole,
    getAllDepts,
    viewAllByDepartment,
    getDepartmentByName,
    viewAllDepts,
    addDepartment,
    removeDepartment
    }