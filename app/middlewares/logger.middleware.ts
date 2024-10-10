const fs = require("fs");
const path = require("path");
const logFilePath = path.join(__dirname, "../logs/access.log");

const logger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const logEntry = `${new Date().toISOString()} | ${req.method} ${
      req.originalUrl
    } | ${res.statusCode} | ${duration}ms\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error("Error writing to the log file:", err);
      }
    });
  });

  next();
};

module.exports = { logger };
