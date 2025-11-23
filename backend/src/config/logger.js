const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.simple()
  ),
  transports: [
    new transports.File({ filename: "logs.log" }),
    new transports.Console()
  ]
});

module.exports = logger;
