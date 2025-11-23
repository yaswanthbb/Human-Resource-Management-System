const User = require("./User");
const Employee = require("./Employee");
const Team = require("./Team");
const EmployeeTeam = require("./EmployeeTeam");

User.hasMany(Employee);
Employee.belongsTo(User);

User.hasMany(Team);
Team.belongsTo(User);

Employee.belongsToMany(Team, { through: EmployeeTeam });
Team.belongsToMany(Employee, { through: EmployeeTeam });

module.exports = {
  User,
  Employee,
  Team,
  EmployeeTeam
};
