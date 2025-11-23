const Team = require("../models/Team");
const Employee = require("../models/Employee");
const logger = require("../config/logger");

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const team = await Team.create({
      name,
      UserId: req.userId
    });

    logger.info(`User '${req.userId}' created team '${team.id}'`);

    res.json({ message: "Team created", team });
  } catch (err) {
    res.status(400).json({ error: "Error creating team" });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { UserId: req.userId },
      include: Employee
    });

    res.json(teams);
  } catch (err) {
    res.status(400).json({ error: "Error fetching teams" });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Team.update(req.body, {
      where: { id, UserId: req.userId }
    });

    if (!updated) return res.status(404).json({ error: "Team not found" });

    logger.info(`User '${req.userId}' updated team ${id}`);

    res.json({ message: "Team updated" });
  } catch (err) {
    res.status(400).json({ error: "Error updating team" });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Team.destroy({
      where: { id, UserId: req.userId }
    });

    if (!deleted) return res.status(404).json({ error: "Team not found" });

    logger.info(`User '${req.userId}' deleted team ${id}`);

    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting team" });
  }
};
