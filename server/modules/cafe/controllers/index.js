const models = require('../../../../database/models');
const { Op } = require("sequelize");
const fs = require('fs');


const createCafe = async (req, res) => {

    const reqData = JSON.parse(req.body.data);

    try {
        const payload = {
            name: reqData.name,
            description: reqData.description,
            location: reqData.location,
        };

        if (req.file) {
            const fileData = fs.readFileSync(req.file.path);
            const mimeType = req.file.mimetype;
            const base64Data = fileData.toString('base64');
            payload.logo = `data:${mimeType};base64,${base64Data}`;
        }

        const data = await models.cafes.create(payload);

        const cafe = await models.cafes.findByPk(data.id, {
            include: {
                model: models.employees,
                as: 'employees',
            },
        });

        const employees = cafe.employees;
        const employeeCount = employees.length;

        const cafeResponse = {
            id: cafe.id,
            name: cafe.name,
            description: cafe.description,
            location: cafe.location,
            logo: cafe.logo,
            created_at: cafe.created_at,
            updated_at: cafe.updated_at,
            employeeCount: employeeCount,
        };

        return res.status(200).json({ cafe: cafeResponse });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



const getAllCafes = async (req, res) => {

    const location = req.query.location;

    try {
        const data = await models.cafes.findAll({
            include: {
                model: models.employees,
                as: 'employees'
            },
            where: {
                location: {
                    [Op.like]: `%${location}%`
                }
            }
        });

        if (!data) {
            return res.status(404).json({ error: 'No cafes found' });
        }

        const cafeResponse = data.map(cafe => {

            const employees = cafe.employees;
            const employeeCount = employees.length;

            const cafeWithEmployeeCount = {
                id: cafe.id,
                name: cafe.name,
                description: cafe.description,
                location: cafe.location,
                logo: cafe.logo,
                created_at: cafe.created_at,
                updated_at: cafe.updated_at,
                employeeCount: employeeCount,
            };

            return cafeWithEmployeeCount;
        });

        cafeResponse.sort((a, b) => b.employeeCount - a.employeeCount);

        return res.status(200).json({ cafes: cafeResponse });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


const getCafe = async (req, res) => {
    const { id } = req.params;

    try {
        const cafeResponse = await models.cafes.findOne({
            where: { id: id }
        });

        return res.status(200).json({ cafe: cafeResponse });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateCafe = async (req, res) => {
    const { id } = req.params;
    const reqData = JSON.parse(req.body.data);

    try {
        const cafe = await models.cafes.findByPk(id, {
            include: {
                model: models.employees,
                as: 'employees'
            }
        });

        if (!cafe) {
            return res.status(404).json({ error: "Cafe not found" });
        }

        if (reqData.name) {
            cafe.name = reqData.name;
        }
        if (reqData.description) {
            cafe.description = reqData.description;
        }
        if (reqData.location) {
            cafe.location = reqData.location;
        }

        if (req.file) {
            const fileData = fs.readFileSync(req.file.path);
            const mimeType = req.file.mimetype;
            const base64Data = fileData.toString('base64');
            cafe.logo = `data:${mimeType};base64,${base64Data}`;
        }

        await cafe.save();

        // Calculate the employee count
        const employees = cafe.employees;
        const employeeCount = employees.length;

        // Prepare the response with employeeCount
        const cafeResponse = {
            id: cafe.id,
            name: cafe.name,
            description: cafe.description,
            location: cafe.location,
            logo: cafe.logo,
            created_at: cafe.created_at,
            updated_at: cafe.updated_at,
            employeeCount: employeeCount,
        };

        return res.status(200).json({ cafe: cafeResponse });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




const deleteCafe = async (req, res) => {

    const { id } = req.params;

    try {
        const employees = await models.employees.findAll({
            where: { cafe_id: id }
        });

        await Promise.all(employees.map(async (employee) => {
            await employee.destroy();
        }));

        const cafe = await models.cafes.findByPk(id);

        if (!cafe) {
            return res.status(404).json({ error: "Cafe not found" });
        }

        await cafe.destroy();

        return res.status(200).send({ message: "Cafe deleted", id:id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createCafe,
    getAllCafes,
    getCafe,
    deleteCafe,
    updateCafe
};
