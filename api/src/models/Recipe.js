const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('recipe', {

        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4 //
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        healthScore: {
            type: DataTypes.INTEGER
        },

        steps: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },

        image: {
            type: DataTypes.STRING(500),
          }
    }, {
        timestamps: false
    });
};