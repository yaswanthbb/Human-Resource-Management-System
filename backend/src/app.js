const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const logger = require("./config/logger");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const teamRoutes = require("./routes/teamRoutes");
const assignmentRoutes = require("./routes/teamAssignmentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require("./models");

app.use("/auth", authRoutes);

app.use("/employees", employeeRoutes);

app.use("/teams", teamRoutes);
app.use("/team-assign", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("HRMS Backend Running");
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("DB Error:", err));
