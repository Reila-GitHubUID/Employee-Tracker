const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 2020,
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
        if (answer.FirstLayer === "Departments record") {
            // Do some adding to the database
            enterDept();
        } else if (answer.firstLayer === "Job roles record") {
            enterRoles();
        } else if (answer.firstLayer === "Employees record") {
            enterEmployees();
        } else if (answer.firstLayer === "Exit") {
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

function enterEmployees() {
    inquirer.prompt([
        {
            name: "EmpFirstLayer",
            type: "rawlist",
            message: "What would you like to do in the employee record?",
            choices: [
                "View employees",
                "Add an employee",
                "Update an employee"
            ]
        }
    ]).then(answer => {
        if (answer.EmpFirstLayer === "View employees") {
            connection.query('SELECT * FROM employee', (err, items) => {
                if (err) throw err;

            });

        } else if (answer.firstLayer === "Add an employee") {
            
            inquirer.prompt([
                {
                    name: "fName",
                    type: "input",
                    message: "What is the new employee's first name?"
                },
                {
                    name: "lName",
                    type: "input",
                    message: "What is the new employee's last name?"
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the new employee's role?",
                    choices: []
                }, 
                {
                    name: "manager",
                    type: "rawlist",
                    message: "What is the new employee's manager?",
                    choices: []
                }
            ]).then(ans => {

            });
        } else if (answer.firstLayer === "Update an employee") {
        } else {
            console.log("Sorry, your input is incorrect");
        }




        // connection.query("SELECT * FROM auctions WHERE id = ? ", id, (err, res) => {
        //     const actualItem = res[0];
        //     if (actualItem.highest_bid < parseInt(answer.bid)) {
        //         connection.query('UPDATE auctions SET ? WHERE ?',
        //             [
        //                 {
        //                     highest_bid: parseInt(answer.bid)
        //                 },
        //                 {
        //                     id: actualItem.id
        //                 }
        //             ], function (err) {
        //                 if (err) throw err;
        //                 console.log("Bid was placed successfuly!");
        //                 start();
        //             }
        //         )
        //     } else {
        //         console.log("Your bid was too low! Try again");
        //         // call rebid here with the items id
        //         reBid(actualItem.id);
        //     }
        // })
    });
}

function enterDept() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the item you want to submit?"
        },
        {
            name: "category",
            type: "input",
            message: "What category do you want your item in?"
        },
        {
            name: "startingBid",
            type: 'input',
            message: "What would you like the starting bid to be?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(answer => {
        connection.query("INSERT INTO auctions SET ?",
            {
                item_name: answer.name,
                category: answer.category,
                starting_bid: answer.startingBid,
                highest_bid: answer.startingBid
            }, (err) => {
                if (err) throw err;
                console.log("Successfully entered your item");
                start();
            });
    })
}

function enterRoles() {
    connection.query('SELECT * FROM auctions', (err, items) => {
        if (err) throw err;
        const choices = items.map(item => item.item_name);
        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices,
                message: "What would you like to make a bid on?"
            },
            {
                name: "bid",
                type: "input",
                message: "How much would you like to bid?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(answer => {
            let chosenItem;
            console.log(answer);
            for (let i = 0; i < items.length; i++) {
                if (items[i].item_name === answer.choice) {
                    chosenItem = items[i];
                }
            }
            if (chosenItem.highest_bid < parseInt(answer.bid)) {
                connection.query('UPDATE auctions SET ? WHERE ?',
                    [
                        {
                            highest_bid: parseInt(answer.bid)
                        },
                        {
                            id: chosenItem.id
                        }
                    ], function (err) {
                        if (err) throw err;
                        console.log("Bid was placed successfuly!");
                        start();
                    }
                )
            } else {
                console.log("Your bid was too low! Try again");
                // call rebid here with the items id
                reBid(chosenItem.id);
            }
        })
    })
}
