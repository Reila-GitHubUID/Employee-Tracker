const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        name: 'FirstLayer',
        type: 'rawlist',
        message: "Which record are you interested in observing today?",
        choices: [
            "Departments records",
            "Job roles record",
            "Employees record",
            "Exit"
        ]
    }).then(answer => {
        if (answer.FirstLayer === "Departments records") {
            enterDept();
        } else if (answer.FirstLayer === "Job roles record") {
            enterRoles();
        } else if (answer.FirstLayer === "Employees record") {
            enterEmployees();
        } else if (answer.FirstLayer === "Exit") {
            console.log("Thank you for using Ellin's Employee Tracker. Good Bye!\n");
            connection.end();
        } else {
            connection.end();
        }
    });
}
// * The command-line application should allow users to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
//   * Update employee managers
//   * View employees by manager
//   * Delete departments, roles, and employees
//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


function enterDept() {
    inquirer.prompt([
        {            
            name: "DeptFirstLayer",
            type: "rawlist",
            message: "What would you like to do in the department record?",
            choices: [
                "View departments",
                "Add a department",
                "Delete a department",
                "Back",
                "Exit"
            ]
        }
    ]).then(answer => {
        if (answer.DeptFirstLayer === "View departments") {
            connection.query('SELECT * FROM department', (err, items) => {
                if (err) throw err;

                console.log(`id  department name`);
                console.log(`--  ---------------`);
                for (let i = 0; i < items.length; i++){
                    console.log(`${items[i].id}  ${items[i].name}`);
                }
                console.log("");

                enterDept();
            });

        } else if (answer.DeptFirstLayer === "Add a department") {
            inquirer.prompt([
                {
                    name: "deptName",
                    type: "input",
                    message: "What is the new department's name?",
                    validate: function (value) {
                        if (value === "") {
                            return false;
                        }
                        return true;
                    }
                }
            ]).then(ans => {
                connection.query("INSERT INTO department SET ?",
                    { 
                        name: ans.deptName
                    }, (err) => {
                        if (err) throw err;
                        console.log("Successfully adding a department");
                        enterDept();
                    });

            });                
            
        } else if (answer.DeptFirstLayer === "Delete a department") {
            connection.query('SELECT * FROM department', (err, items) => {
                if (err) throw err;
                const choices = items.map(item => item.item_name);

                inquirer.prompt([
                    {
                        name: "deptName",
                        type: "rawList",
                        message: "What is the department name that you want to delete?",
                        choices
                    }
                ]).then(ans => {connection.query(
                    "DELETE FROM department WHERE ?",
                    {
                        name: ans.deptName
                    },
                    function(err, res) {
                      if (err) throw err;
                      console.log("The department" + res.deptName + " is deleted!\n");
                      // Call readProducts AFTER the DELETE completes
                      enterDept();
                    }
                  );

                });   
            });                             

        } else if (answer.DeptFirstLayer === "Back") {
            start();
        } else if (answer.DeptFirstLayer === "Exit") {
            console.log("Thank you for using Ellin's Employee Tracker. Good Bye!\n");
            connection.end();
        } else {
            console.log("DEPARTMENT: Sorry, your input is incorrect");
            enterDept();
        }
    })
}

function enterRoles() {

    inquirer.prompt([
        {            
            name: "RoleFirstLayer",
            type: "rawlist",
            message: "What would you like to do in the role record?",
            choices: [
                "View roles",
                "Add a role",
                // "Update a role",
                // "Delete a role",
                "Back",
                "Exit"
            ]
        }
    ]).then(answer => {
        if (answer.RoleFirstLayer === "View roles") {
            connection.query('SELECT id, title FROM role', (err, items) => {
    
                if (err) throw err;

                console.log(`id  title            `);
                console.log(`--  ---------------  `);
                for (let i = 0; i < items.length; i++){
                    console.log(`${items[i].id}  ${items[i].title}  `);
                }
                console.log("");

                enterRoles();

            });

        } else if (answer.RoleFirstLayer === "Add a role") {
            inquirer.prompt([
                {
                    name: "roleName",
                    type: "input",
                    message: "What is the new role's name?",
                    validate: function (value) {
                        if (value === "") {
                            return false;
                        }
                        return true;
                    }
                }
            ]).then(ans => {
                connection.query("INSERT INTO department SET ?",
                    { 
                        name: ans.deptName
                    }, (err) => {
                        if (err) throw err;
                        console.log("Successfully adding a department");
                        enterDept();
                    });

            });
        // } else if (answer.firstLayer === "Update a role") {
        // } else if (answer.firstLayer === "Delete a role") {  
        } else if (answer.RoleFirstLayer === "Back") {
            start();
        } else if (answer.RoleFirstLayer === "Exit") {
            console.log("Thank you for using Ellin's Employee Tracker. Good Bye!\n");
            connection.end();
        } else {
            console.log("ROLE: Sorry, your input is incorrect");
        }
    })
}

function enterEmployees() {
    inquirer.prompt([
        {
            name: "EmpFirstLayer",
            type: "rawlist",
            message: "What would you like to do in the employee record?",
            choices: [
                "View employees",
                "Add an employee",
                "Update an employee",
                // "Delete an employee",
                "Back",
                "Exit"
            ]
        }
    ]).then(answer => {
        if (answer.EmpFirstLayer === "View employees") {
            connection.query('SELECT * FROM employee', (err, items) => {
                if (err) throw err;
                
            });

        } else if (answer.firstLayer === "Add an employee") {
            
            connection.query('SELECT * FROM role', (err, roleItems) => {
                if (err) throw err;
                const roleChoices = roleItems.map(item => item.title);

                connection.query('SELECT * FROM department', (err, deptItems) => {
                    if (err) throw err;
                    const deptChoices = deptItems.map(item => item.name);

                        inquirer.prompt([
                            {
                                name: "fName",
                                type: "input",
                                message: "What is the new employee's first name?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            },
                            {
                                name: "lName",
                                type: "input",
                                message: "What is the new employee's last name?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            },
                            {
                                name: "role",
                                type: "rawlist",
                                message: "What is the new employee's role?",
                                roleChoices
                            }, 
                            {
                                name: "manager",
                                type: "rawlist",
                                message: "What is the new employee's manager?",
                                deptChoices
                            }
                        ]).then(ans => {
                            connection.query("INSERT INTO auctions SET ?",
                                {
                                    first_name: ans.fName,
                                    lastName: ans.lName,
                                    role_id: answer.startingBid,
                                    manager_id: answer.startingBid
                                }, (err) => {
                                    if (err) throw err;
                                    console.log("Successfully adding an employee");
                                    start();
                                });
            
                        });
                });
            });
        } else if (answer.firstLayer === "Update an employee") {    
        } else if (answer.DeptFirstLayer === "Back") {
            start();
        } else if (answer.DeptFirstLayer === "Exit") {
            console.log("Thank you for using Ellin's Employee Tracker. Good Bye!\n");
            connection.end();
        } else {
            console.log("EMPLOYEE: Sorry, your input is incorrect");
        }




    });
}
