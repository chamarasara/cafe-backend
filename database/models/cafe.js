'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cafes = sequelize.define(
        'cafes',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING
            },
            location: {
                allowNull: true,
                type: DataTypes.STRING
            },
            logo: {
                allowNull: true,
                type: DataTypes.TEXT
            }
        },
        {
            underscored: true,
            timestamps: true, 
            createdAt: 'created_at',
            updatedAt: 'updated_at', 
        }
    );

    Cafes.associate = (models) => {
        Cafes.hasMany(models.employees, {
            foreignKey: 'cafeId',
        });
    };

    return Cafes;
};
