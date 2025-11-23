const Employee = require("../models/Employee");
const logger = require("../config/logger");
const Team = require("../models/Team");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const employee = await Employee.create({
      name,
      email,
      role,
      UserId: req.userId, // link to org user
    });

    logger.info(
      `User '${req.userId}' added a new employee with ID ${employee.id}`
    );

    res.json({ message: "Employee created", employee });
  } catch (err) {
    res.status(400).json({ error: "Error creating employee" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { UserId: req.userId },
      include: [
        {
          model: Team,
          through: { attributes: [] },
        },
      ],
    });

    res.json(employees);
  } catch (err) {
    res.status(400).json({ error: "Error fetching employees" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Employee.update(req.body, {
      where: { id, UserId: req.userId },
    });

    if (!updated) return res.status(404).json({ error: "Employee not found" });

    logger.info(`User '${req.userId}' updated employee ${id}`);

    res.json({ message: "Employee updated" });
  } catch (err) {
    res.status(400).json({ error: "Error updating employee" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Employee.destroy({
      where: { id, UserId: req.userId },
    });

    if (!deleted) return res.status(404).json({ error: "Employee not found" });

    logger.info(`User '${req.userId}' deleted employee ${id}`);

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting employee" });
  }
};
