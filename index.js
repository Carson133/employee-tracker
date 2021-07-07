const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'Mariners1st',
    database: 'employee_tracker'
});

const x = ['department', 'employee', 'role']

const start = () => {
    for (let i = 0; i < x.length; i++) {
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;

            console.log(res);
            connection.end;
        })
    }
    // inquirer.prompt({

    // })
}

connection.connect(err => {
    if (err) throw err;
    console.log(`connected to a database ${connection.threadId}`);
    start();
})