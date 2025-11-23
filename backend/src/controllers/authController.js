const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../config/logger");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    logger.info(`User '${user.id}' registered.`);

    res.json({ message: "User registered", userId: user.id });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid creds" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid creds" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    logger.info(`User '${user.id}' logged in.`);

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "Error while logging in" });
  }
};

exports.logout = (req, res) => {
  try {
    const userId = req.userId;
    logger.info(`User '${userId}' logged out.`);
    return res.json({ message: "Logged out" });
  } catch (err) {
    return res.status(400).json({ error: "Logout error" });
  }
};

