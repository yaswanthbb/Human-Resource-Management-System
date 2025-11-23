const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {                       // ADD THIS
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Team;
