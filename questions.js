const inquirer = require("inquirer");

function mainMenu() {
    return inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
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

//need prompt for deptPrompt
function departmentPrompt(deptArray) {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Select a department:",
            choices: deptArray
        }
    ])
}

//need prompt for managerPrompt here
function managerPrompt(mgrArray) {
    return inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Select your manager:",
            choices: mgrArray
        }
    ])
}
//addDeptPrompt
function addDepartmentPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the name of this new department:"
        }
    ])
}

//removeDeptPrompt
function removeDeptPrompt(deptArray) {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Please select a department for liquidation:",
            choices: deptArray
        }
    ])
}

//addRolePrompt
function addRolePrompt(deptArray) {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the title of the new role:"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the role's salary:"
        },
        {
            type: "list",
            name: "department",
            message: "Select from which department the role is associated with:",
            choices: deptArray
        }
    ])
}
//removeRolePrompt
function removeRolePrompt(roleTitles) {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose a role to remove:",
            choices: roleTitles
        }
    ])
}
//addEmpPrompt
function addEmployeePrompt(roleTitles, mgrArray) {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:"
        },
        {
            type: "list",
            name: "role",
            message: "Select the employee's role:",
            choices: roleTitles
        },
        {
            type: "list",
            name: "manager",
            message: "Select the employee's manager:",
            choices: mgrArray
        }
    ])
}
//removeEmpPrompt
function removeEmployeePrompt(employeeNames) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please choose an employee to remove:",
            choices: employeeNames
        }
    ])
}

//updateEmpRolePrompt
function updateEmployeeRole(employeeNames, roleTitles) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please select your desired employee:",
            choices: employeeNames
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's new role:",
            choices: roleTitles
        }
    ])
}


//updateEmpMgrPrompt
function updateEmployeeManager(employeeNames, mgrArray) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please select your desired employee:",
            choices: employeeNames
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee's updated manager:",
            choices: mgrArray
        }
    ])
}


