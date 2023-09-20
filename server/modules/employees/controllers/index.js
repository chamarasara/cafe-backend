const models = require('../../../../database/models');
const { Op } = require("sequelize");
const moment = require('moment');


const createEmployee = async (req, res) => {
  
    try {
      const cafeId = req.body.cafe_id;
        
      const cafeResponse = await models.cafes.findOne({
        where: { id: cafeId }
      });
  
      let cafeName = null;
  
      if (cafeResponse) {
        cafeName = cafeResponse.dataValues.name;
      }
  
      const payload = {
        name: req.body.name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        cafe_id: req.body.cafe_id,
        cafe_name: cafeName
      };
  
      const data = await models.employees.create(payload);
      const empResponse = data.toJSON();
  
      return res.status(200).json({ employee: empResponse });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  

const getAllEmployees = async (req, res) => {
    const cafeName = req.query.cafe;

    try {
        const data = await models.employees.findAll({
            where: {
                cafe_name: {
                    [Op.like]: `%${cafeName}%`
                }
            }
        });

        const employeeResponse = data.map(employee => {
            if (employee.start_date) {
                const startDate = moment(employee.start_date, 'YYYY-MM-DD');
                const currentDate = moment();
                const daysWorked = currentDate.diff(startDate, 'days');
                return {
                    ...employee.toJSON(),
                    days_worked: daysWorked
                };
            } else {
                return employee.toJSON();
            }
        });

        return res.status(200).json({ employees: employeeResponse });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employeeResponse = await models.employees.findOne({
            where: { id: id }
        });

        return res.status(200).json({ employee: employeeResponse });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateEmployee = async (req, res) => {

    const { id } = req.params;
    const { name, email_address, phone_number, gender, cafe_id } = req.body;

    let cafeResponse = {}
    try {
        cafeResponse = await models.cafes.findOne({
            where: { id: cafe_id }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    try {
        const employee = await models.employees.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: "employee not found" });
        }

        employee.name = name;
        employee.email_address = email_address;
        employee.phone_number = phone_number;
        employee.gender = gender;
        employee.cafe_id = cafe_id;
        employee.cafeId = cafe_id;
        employee.cafe_name = cafeResponse.dataValues.name;


        await employee.save();

        return res.status(200).json({ employee });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {

    const { id } = req.params;

    try {
        const employee = await models.employees.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: "employee not found" });
        }

        await employee.destroy();

        return res.status(200).send({ meeseage: "employee deleted", id:id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
};
