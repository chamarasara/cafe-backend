const { Router } = require('express');
const { createEmployee, getAllEmployees, getEmployee, updateEmployee, deleteEmployee } = require('./controllers');

const EmployeesRoutes = new Router();

EmployeesRoutes.post('/v1/employee', createEmployee);
EmployeesRoutes.get('/v1/employees', getAllEmployees);
EmployeesRoutes.get('/v1/employee/:id', getEmployee);
EmployeesRoutes.put('/v1/employee/:id', updateEmployee);
EmployeesRoutes.delete('/v1/employee/:id', deleteEmployee);


module.exports = EmployeesRoutes;