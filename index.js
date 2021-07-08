const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'Mariners1st',
    database: 'employee_tracker'
});

const start = () => {

    inquirer.prompt({
        name: "startMenu",
        type: "list",
        message: "choose a query",
        choices: ["Add departments, roles, or employees", "View departments, roles, and employees", "Exit"]
    }).then(answer => {
        if(answer.startMenu === "Add departments, roles, or employees"){
            inquirer.prompt({
                name: "addPrompt",
                type: "list",
                message: "Choose a query: ",
                choices: ["Add to department", "Add to role", "Add to employee", "EXIT"]
            }).then(answer => {
                if(answer.addPrompt === "Add to department"){
                    addDepartment();
                } else if(answer.addPrompt === "Add to role"){
                    addRole();
                } else if(answer.addPrompt === "Add to employee"){
                    addEmployee();
                } else {
                    start();
                }
            })
        } else if(answer.startMenu === "View departments, roles, and employees"){
            connection.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                department = res;
                console.table(department);
            })
            connection.query('SELECT * FROM employee', (err, res) => {
                if (err) throw err;
                employee = res;
                console.table(employee);
            })
            connection.query('SELECT * FROM role', (err, res) => {
                if (err) throw err;
                role = res;
                console.table(role);
            })
            start();
        } else {
            connection.end();
        }
    })

}

const addDepartment = () => {
     inquirer.prompt({
        name: 'addDepartment',
        type: 'input',
        message: 'Enter a department to add.'
    })
        .then((answer) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: answer.name,
                },
                err => {
                    if (err) throw err;
                    start();
                })
        })
}

const addRole = () => {
    connection.query('SELECT * FROM department',
        (err, res) => {
            if (err) throw err;
    inquirer.prompt([{
        name: "department",
        type: "list",
        message: "Input the new role's department: ",
        choices: () => {
            const departments = [];
            for (const item of res) {
                departments.push({
                    name: item.name,
                    value: item.id
                });
            }
            return departments;
        },
    },
    ]).then(answer => {
        let department_id = answer.department;
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the role\'s title to add.'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the role salary.',
                validate(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
        ]).then((answer) => {
            connection.query('INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: department_id,
                },
                err => {
                    if (err) throw err;
                    start();
                });
        });
});
});
        
}

const addEmployee = () => {
    let departmentID;
    let managerID;
    let roleID;
    connection.query(
        `SELECT * FROM department`,
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'department',
                    type: 'list',
                    message: 'Select the department of the new employee.',
                    choices: () => {
                        let departments = [];
                        for (const item of res) {
                            departments.push({ 
                                name: item.name, 
                                value: item.id
                            });
                        }
                        return departments;
                    },
                },
            ])
        }
    )
    
}





connection.connect(err => {
    if (err) throw err;
    console.log(`connected to a database ${connection.threadId}`);
    start();
})