const inquirer = require("inquirer");
//main menu 
function mainMenuPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Main Menu. Please select an option below:",
            choices: [
                "View all departments",
                "View a department's budget",
                "View all roles",
                "View all employees",
                "View all employees by department",
                "View all employees by Manager",
                "Add a department",
                "Remove a department",
                "Add a role",
                "Remove a role",
                "Add an employee",
                "Remove an employee",
                "Update an employee's role",
                "Update an employee's manager",
                "Exit"
            ]
        }
    ])
}
//deptPrompt for department selection
function deptPrompt(departmentArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Please select a department:",
            choices: departmentArr
        }
    ])
}
//managerPrompt for manager selection
function managerPrompt(mgrArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Select manager from list for employee designation:",
            choices: mgrArr
        }
    ])
}
//addDeptPrompt to add department
function addDeptPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Please enter a name for this department:"
        }
    ])
}
//removeDeptPrompt to remove selected department
function removeDeptPrompt(departmentArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Select a department to remove:",
            choices: departmentArr
        }
    ])
}
//addRolePrompt to add role to list, then append to a department (deptArr)
function addRolePrompt(departmentArr) {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the name of the role or job:"
        },
        {
            type: "input",
            name: "salary",
            message: "Input starting salary for new role:"
        },
        {
            type: "list",
            name: "department",
            message: "Select from which department this new role is designated:",
            choices: departmentArr
        }
    ])
}
//remove role
function removeRolePrompt(roleArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose a role to remove:",
            choices: roleArr
        }
    ])
}
//add employee (includes name, role, and new addition's manager)
function addEmployeePrompt(roleArr, mgrArr) {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter the employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter the employee's last name:"
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's role:",
            choices: roleArr
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee's manager:",
            choices: mgrArr
        }
    ])
}
//remove emp
function removeEmpPrompt(employeeArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please choose an employee to remove:",
            choices: employeeArr
        }
    ])
}
//updateemprole: select employee from employeeArr, select new role from roleArr
function updateEmpRolePrompt(employeeArr, roleArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Select employee for new role designation:",
            choices: employeeArr
        },
        {
            type: "list",
            name: "role",
            message: "Select employee's new role:",
            choices: roleArr
        }
    ])
}
//update employee's manager: select employee from employeeArr, select manager from mgrArr
function updateEmpMgrPrompt(employeeArr, mgrArr) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Select employee for new manager designation:",
            choices: employeeArr
        },
        {
            type: "list",
            name: "manager",
            message: "Select new manager of selected employee:",
            choices: mgrArr
        }
    ])
}

module.exports = {
    mainMenuPrompt,
    deptPrompt,
    managerPrompt,
    addEmployeePrompt,
    removeEmpPrompt,
    updateEmpRolePrompt,
    updateEmpMgrPrompt,
    addRolePrompt,
    removeRolePrompt,
    addDeptPrompt,
    removeDeptPrompt
}