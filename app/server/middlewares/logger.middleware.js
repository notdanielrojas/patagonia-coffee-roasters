"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logFilePath = path_1.default.join(__dirname, "../logs/access.log");
const logger = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        const logEntry = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms\n`;
        fs_1.default.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error("Error writing to the log file:", err);
            }
        });
    });
    next();
};
exports.logger = logger;
