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


// * The command-line application should allow users to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
//   * Update employee managers
//   * View employees by manager
//   * Delete departments, roles, and employees
//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

