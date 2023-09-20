const EmployeeRoutes  = require('../modules/employees/routes');
const CafeRoutes  = require('../modules/cafe/routes');


const Routes = [
    EmployeeRoutes,
    CafeRoutes
]

module.exports = Routes;