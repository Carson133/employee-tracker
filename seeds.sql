USE employee_tracker;


INSERT INTO department (name) VALUES 
(	'Research'	);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
(	'Carson', 'Carraher', 1, 1	);

INSERT INTO role (title, salary, department_id) VALUES 
(	'Head Research', 100000, 1	);