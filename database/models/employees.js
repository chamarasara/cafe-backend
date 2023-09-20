'use strict';
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    const Employees = sequelize.define(
        'employees',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
                unique: true, 
                defaultValue: () => {
                    const uuid = uuidv4();
                    const alphanumericPart = uuid.replace(/-/g, '').substring(0, 7);
                    return `UI${alphanumericPart}`;
                },
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email_address: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        msg: 'Invalid email address format.',
                    },
                },
            },
            phone_number: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    isPhoneNumberValid(value) {
                        if (!/^[89]\d{7}$/.test(value)) {
                            throw new Error('Phone number must start with 8 or 9 and have 8 digits.');
                        }
                    },
                },
            },
            gender: {
                allowNull: false,
                type: DataTypes.STRING
            },
            cafe_id: {
                allowNull: true,
                type: DataTypes.UUID
            },
            cafe_name: {
                allowNull: true,
                type: DataTypes.STRING
            },
            start_date: {
                allowNull: true,
                type: DataTypes.STRING
            },
        },
        {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at', 
        }
    );
    Employees.associate = (models) => {
        Employees.belongsTo(models.cafes, {
            foreignKey: 'cafeId', 
        });
    };

    return Employees;
};
