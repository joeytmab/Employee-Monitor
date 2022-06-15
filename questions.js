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