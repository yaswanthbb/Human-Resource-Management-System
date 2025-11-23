const Employee = require("../models/Employee");
const Team = require("../models/Team");
const logger = require("../config/logger");

exports.assignEmployee = async (req, res) => {
  try {
    const { employeeId, teamId } = req.body;

    // check employee
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // check team
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // assign
    await employee.addTeam(team);

    res.json({ message: "Employee assigned successfully" });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.removeEmployee = async (req, res) => {
  try {
    const { employeeId, teamId } = req.body;

    const employee = await Employee.findOne({
      where: { id: employeeId, UserId: req.userId }
    });

    const team = await Team.findOne({
      where: { id: teamId, UserId: req.userId }
    });

    if (!employee || !team)
      return res.status(404).json({ error: "Employee or team not found" });

    await team.removeEmployee(employee);

    logger.info(`User '${req.userId}' removed employee ${employeeId} from team ${teamId}`);

    res.json({ message: "Removed successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error removing assignment" });
  }
};
