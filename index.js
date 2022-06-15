const cq = require("./connectionquery");
const questions = require("./questions")

async function init() {
    try {

        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

init();



async function mainMenu() {
    try {
        // main menu prompt
        const {option} = await questions.mainMenu();
        
        if (option === "View all departments") {
            // use query to view all departments, then log data
            const deptData = await cq.viewAllDepts();
            //console.log NOT like console.table
            //console.table prints array as a table in console
            console.table(deptData);
             //return to main menu
            mainMenu();

        } else if (option === "View a department's budget") {
            //use query to get list of all departments
            const {deptArray} = await cq.getAllDepts();
            //prompt user to view desired department
            const dept = await questions.DeptPrompt(deptArray);
            //desired department passed through viewAllbyDept query to bring up all employees.
            const data = await cq.viewAllbyDept(dept);
            //for each loop; used to add up all salaries
            let budget = 0;
            data.forEach(employee => {
                return budget = budget + employee.salary;
            });
            console.log("----------------------------------------------");
            console.log("Department selected: " + dept + "; Budget: $" + budget);
            console.log("----------------------------------------------");
           
            mainMenu();

        } else if (option === "View all roles") {
            //query to view roles, log roledata
            const roleData = await cq.viewAllRoles();
            console.table(roleData);
            
            mainMenu();

        } else if (option === "View all employees") {
            //query to view all employees
            const empData = await cq.viewAllEmployees();
            console.table(empData);
            
            mainMenu();

        } else if (option === "View all employees by department") {
            //use query to get list of all departments
            const {deptArray} = await cq.getAllDepts();
            //prompt user to view desired department
            const dept = await questions.deptPrompt(deptArray);
            //desired department passed through viewallbyDept query to bring up all employees
            const data = await cq.viewAllByDept(dept);
            
            console.table(data);
            
            mainMenu();

        } else if (option === "View all employees by Manager") {
            //use query to get list of managers via getManagers in connectionquery.js
            const {mgrArray} = await cq.getManagers();
            //prompt user to view desired manager
            const mgr = await questions.managerPrompt(mgrArray);
            //managername split into first and last name into array
            const mgrName = await mgr.split(" ");
            //pass first and last name into viewallbymanager query; 
            //brings up employees under that manager
            const mgrData = await cq.viewAllByManager(mgrName[0], mgrName[1]);
            
            console.table(mgrData);
            
            mainMenu();

        } else if (option === "Add a department") {
            //prompt user to add dept
            const dept = await questions.addDeptPrompt();
            //pass to add dept query
            await cq.addDept(dept);
           
            mainMenu();

        } else if (option === "Remove a department") {
            //use query to get list of departments
            const {deptArray} = await cq.getAllDepts();
            //prompt for selecting department for removal
            const {dept} = await questions.removeDeptPrompt(deptArray);
            //pass dept into removeDept query
            await cq.removeDept(dept);
            
            mainMenu();

            } else if (option === "Add a role") {
            //use query to get list of departments
            const {deptArray} = await cq.getAllDepts();
            //addRolePrompt to input title, salary, dept
            const { title, salary, department } = await questions.addRolePrompt(deptArray);
            //get selected dept by getdeptbyname query
            const selectedDept = await cq.getDepartmentByName(department);
            //department_id from selectedDept.id
            const department_id = selectedDept[0].id;
            //pass the variable into addrole query
            await cq.addRole(title, salary, department_id);
            
            mainMenu();

        } else if (option === "Remove a role") {
            //get list
            const { roleTitles, listofRoles } = await cq.getAllRoles();
            //removerolePrompt to remove desired role
            const role = await questions.removeRolePrompt(roleTitles);
            //pass role to removeRole query
            await cq.removeRole(role);
            
            mainMenu();

        } else if (option === "Add an employee") {
            //get list of managers via getmanagers query, and list of roles
            const {mgrArray} = await cq.getManagers();
            const { roleTitles, listofRoles } = await cq.getAllRoles();
            //addemployeeprompt
            const { first_name, last_name, role, manager } = await questions.addEmployeePrompt(roleTitles, mgrArray);
            //use role and manager data to get id's
            const selectedMgrName = await manager.split(" "); //again, split first and last name of mgr into array
            const mgrData = await cq.viewAllByManager(selectedMgrName[0], selectedMgrName[1]);
            const manager_id = mgrData[0].id;

            const selectedRole = listofRoles.filter(chosenRole => chosenRole.title === role);
            const role_id = selectedRole[0].id;

            
            //data for first_name, last_name, role_id, and manager_id
            //pass this data into cq and addEmployee query
            await cq.addEmployee(first_name, last_name, role_id, manager_id);
            
            mainMenu();

        } else if (option === "Remove an employee") {
            //get list of employees via getallemployeenames query
            const employeeNames = await cq.getAllEmployeeNames();
            //user prompt to choose employee for removal
            const employee = await questions.removeEmployeePrompt(employeeNames);
            //split into first and last name
            const selectedEmployee = await employee.split(" ");
            //get id by passing name array into getEmp query to create datum
            const employeeData = await cq.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
            //id is selected to pass through remove query, deleting employee
            await cq.removeEmployee(id);
            
            mainMenu();

        } else if (option === "Update an employee's role") {
            //need to first get list of employees, then list of roles
            const employeeNames = await cq.getAllEmployeeNames();
            const { roleTitles, listofRoles } = await cq.getAllRoles();
            //update employee prompt
            const { employee, role } = await questions.updateEmployeeRole(employeeNames, roleTitles);
            //split array into first and last name
            const selectedEmployee = await employee.split(" ");
            //use role data to get id
            const selectedRole = listofRoles.filter(chosenRole => chosenRole.title === role);
            const role_id = selectedRole[0].id;
            //get id of employee by first and last name
            const employeeData = await cq.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
            //use role_id and id and pass them on to query to update employee's role
            await cq.updateEmployeeRole(role_id, id);
            
            mainMenu();

        } else if (option === "Update an employee's manager") {
            //first need list of employees, then list of managers
            const employeeNames = await cq.getAllEmployeeNames();
            const managerList = await cq.getManagers();
            //prompt user for the employee and manager
            const { employee, manager } = await questions.updateEmployeeManager(employeeNames, managerList);
            
            const selectedEmployee = await employee.split(" ");
            //id of emp by first and last name
            const employeeData = await cq.getEmployeebyName(selectedEmployee[0], selectedEmployee[1]);
            const id = employeeData[0].id;
            //split name into array
            const selectedMgrName = await manager.split(" ");
            //pass first and last name to query viewAllByManager and get id of manager
            const mgrData = await cq.viewAllByManager(selectedMgrName[0], selectedMgrName[1]);
            const manager_id = mgrData[0].id;
            //pass manager_id and id into query to update an employee's manager
            await cq.updateEmployeeManager(manager_id, id);
            
            mainMenu();

        }  else if (option === "Exit") {
            // End connection
         cq.db.end();    
        }
 
    } catch (err) {
        console.log(err);
    }
};