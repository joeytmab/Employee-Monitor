const queries = require("./utils/queries");
const prompts = require("./utils/questionprompts");
const logo = require("asciiart-logo");
require("console.table");

//initialize app function
async function init() {
    try {

        const logoText = logo({name: "Employee Monitor MK2"}).render();
        console.log(logoText);

        runMainLoop();

    } catch (err) {
        console.log(err);
    }
};

//mainloop function for each choice on main menu
async function runMainLoop() {
    try {
        // Prompt for mainmenuPrompt questions
        const {option} = await prompts.mainMenuPrompt();

        
        if (option === "View all departments") {
            
            const data = await queries.db.query("SELECT * FROM department")
            console.table(data);
           
            runMainLoop();

        } else if (option === "View all roles") {
            
            const data = await queries.viewAllRoles();
            console.table(data);
            
            runMainLoop();

        } else if (option === "View all employees") {
            
            const data = await queries.viewAllEmployees();
            console.table(data);
            
            runMainLoop();

        

        } else if (option === "View all employees by department") {
            
            const {departmentArr} = await queries.getAllDepts();
            const {department} = await prompts.deptPrompt(departmentArr);
            const data = await queries.viewAllByDepartment(department);
            console.table(data);
            
            runMainLoop();

        } else if (option === "View all employees by Manager") {
            
            const managerList = await queries.getManagers();
            const {manager} = await prompts.managerPrompt(managerList);
           
            const managerName = await manager.split(" ");
            const data = await queries.viewAllByManager(managerName[0], managerName[1]);
            console.table(data);
            
            runMainLoop();

        } else if (option === "Add a department") {
            
            const { department } = await prompts.addDeptPrompt();
            await queries.addDepartment(department);
            
            runMainLoop();

        } else if (option === "Remove a department") {
           
            const {departmentArr} = await queries.getAllDepts();
            const {department, department_id} = await prompts.removeDeptPrompt(departmentArr);

            //console.log (department, department_id)
            await queries.removeDepartment(department);

            console.log("\n----------------------------------------------")
            console.log(`The ${department} Department has been liquidated.`)
            console.log("----------------------------------------------\n")
            
            runMainLoop();

        } else if (option === "Add a role") {
            
            const {departmentArr} = await queries.getAllDepts();
            const {title, salary, department} = await prompts.addRolePrompt(departmentArr);
            
            const selectedDeptObject = await queries.getDepartmentByName(department);
            const department_id = selectedDeptObject[0].id;
            await queries.addRole(title, salary, department_id);

            runMainLoop();

        } else if (option === "Remove a role") {
            
            const {roleArr, roleLis } = await queries.getAllRoles();
            const {role} = await prompts.removeRolePrompt(roleArr);
            await queries.removeRole(role);

            console.log("\n----------------------------------------------")
            console.log(`The position of ${role} has been removed.`)
            console.log("----------------------------------------------\n")
            
            runMainLoop();    

        } else if (option === "Add an employee") {
            
            const managerList = await queries.getManagers();
            const {roleArr, roleList} = await queries.getAllRoles();
            const { first_name, last_name, role, manager } = await prompts.addEmployeePrompt(roleArr, managerList);

            const chosenRole = roleList.filter(data => data.title === role);
            const role_id = chosenRole[0].id;
            const chosenManager = await manager.split(" ");
            const data = await queries.viewAllByManager(chosenManager[0], chosenManager[1]);
            const manager_id = data[0].id;
            await queries.addEmployee(first_name, last_name, role_id, manager_id);

            console.log("\n----------------------------------------------")
            console.log(`Please welcome ${first_name} ${last_name} to the team!`)
            console.log(`${first_name} will be taking the role of ${role} and be working under ${manager}.`)
            console.log("----------------------------------------------\n")
            
            runMainLoop();

        } else if (option === "Remove an employee") {
            
            const employeeNames = await queries.getAllEmployeeNames();
            const {employee} = await prompts.removeEmpPrompt(employeeNames);
            
            const selectedEmployee = await employee.split(" ");
            const employeeData = await queries.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
            await queries.removeEmployee(id);

            console.log("\n----------------------------------------------")
            console.log(`${employee} has been terminated, effective immediately.`)
            console.log("----------------------------------------------\n")
            
            runMainLoop();

        } else if (option === "Update an employee's role") {
            
            const employeeNames = await queries.getAllEmployeeNames();
            const {roleArr, roleList} = await queries.getAllRoles();
            const { employee, role } = await prompts.updateEmpRolePrompt(employeeNames, roleArr);

            const selectedEmployee = await employee.split(" ");
            const chosenRole = roleList.filter(roleItem => roleItem.title === role);
            const role_id = chosenRole[0].id;
            const employeeData = await queries.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
            await queries.updateEmployeeRole(role_id, id);

            console.log("\n----------------------------------------------")
            console.log(`${employee} has been redesignated and will take on the position of ${role}.`)
            console.log("----------------------------------------------\n")

            runMainLoop();

        } else if (option === "Update an employee's manager") {
            
            const employeeNames = await queries.getAllEmployeeNames();
            const managerList = await queries.getManagers();
            const {employee, manager} = await prompts.updateEmpMgrPrompt(employeeNames, managerList);
            
            const selectedEmployee = await employee.split(" ");
            const employeeData = await queries.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
        
            const managerName = await manager.split(" ");
            const data = await queries.viewAllByManager(managerName[0], managerName[1]);
            const manager_id = data[0].id;
            await queries.updateEmployeeManager(manager_id, id);
        
            console.log("\n----------------------------------------------")
            console.log(`${manager} has been redesignated as the direct superior of ${employee}.`)
            console.log("----------------------------------------------\n")
        
            runMainLoop();

        } else if (option === "View a department's budget") {

            const {departmentArr} = await queries.getAllDepts();
            const {department} = await prompts.deptPrompt(departmentArr);
            const data = await queries.viewAllByDepartment(department);
            let budget = 0;
            data.forEach(emp => {
                return budget += emp.salary;
            });
            
            console.log("\n----------------------------------------------")
            console.log("Department selected: " + department + ";")
            console.log("Budget: $" + budget);
            console.log("----------------------------------------------\n")
            
            runMainLoop();

        } else if (option === "Exit") {

            console.log("\n----------------------------------------------")
            console.log(`Connection to Employee Monitor terminated.`)
            console.log("----------------------------------------------\n")

            const goodbyeLogo = logo({name: "Goodbye!"}).render();
            console.log(goodbyeLogo);



            queries.db.end();
        }
 
    } catch (err) {
        console.log(err);
    }
};
//initialize app
init();