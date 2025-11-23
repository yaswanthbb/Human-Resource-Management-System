const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmployeeTeam = sequelize.define("EmployeeTeam", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

module.exports = EmployeeTeam;
