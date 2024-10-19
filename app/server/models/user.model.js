"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.deleteUser = exports.registerUser = exports.getAllUsers = exports.getUserByEmail = exports.getUserById = void 0;
const database_model_1 = __importDefault(require("./database.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isErrorWithMessage = (error) => {
    return typeof error === "object" && error !== null && "message" in error && "code" in error;
};
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const { rows } = yield database_model_1.default.query(query, values);
        if (rows.length === 0) {
            throw { code: 404, message: "User not found" };
        }
        return rows[0];
    }
    catch (error) {
        if (isErrorWithMessage(error)) {
            throw {
                code: error.code || 500,
                message: error.message || "Error retrieving user",
            };
        }
        throw { code: 500, message: "Unknown error retrieving user" };
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_model_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0] || null;
    }
    catch (error) {
        if (isErrorWithMessage(error)) {
            throw {
                code: error.code || 500,
                message: error.message || "Error retrieving user by ID",
            };
        }
        throw { code: 500, message: "Unknown error retrieving user by ID" };
    }
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_model_1.default.query("SELECT * FROM users");
    return result.rows;
});
exports.getAllUsers = getAllUsers;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, email, password } = user;
    const encryptedPassword = bcryptjs_1.default.hashSync(password);
    const values = [name, last_name, email, encryptedPassword];
    const query = "INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)";
    yield database_model_1.default.query(query, values);
});
exports.registerUser = registerUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "DELETE FROM users WHERE id = $1";
        const values = [id];
        const result = yield database_model_1.default.query(query, values);
        if (result.rowCount === 0) {
            throw { code: 404, message: "User not found" };
        }
        console.log(`User with ID ${id} deleted successfully.`);
    }
    catch (error) {
        if (isErrorWithMessage(error)) {
            throw {
                code: error.code || 500,
                message: error.message || "Error deleting user",
            };
        }
        throw { code: 500, message: "Unknown error deleting user" };
    }
});
exports.deleteUser = deleteUser;
const editUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name, email, password } = userData;
        const updates = [];
        const values = [];
        if (name) {
            updates.push(`name = $${updates.length + 1}`);
            values.push(name);
        }
        if (last_name) {
            updates.push(`last_name = $${updates.length + 1}`);
            values.push(last_name);
        }
        if (email) {
            updates.push(`email = $${updates.length + 1}`);
            values.push(email);
        }
        if (password) {
            const encryptedPassword = bcryptjs_1.default.hashSync(password);
            updates.push(`password = $${updates.length + 1}`);
            values.push(encryptedPassword);
        }
        if (updates.length === 0) {
            throw { code: 400, message: "No data provided to update" };
        }
        values.push(id);
        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $${updates.length + 1}`;
        const result = yield database_model_1.default.query(query, values);
        if (result.rowCount === 0) {
            throw { code: 404, message: "User not found" };
        }
        console.log(`User with ID ${id} updated successfully.`);
    }
    catch (error) {
        if (isErrorWithMessage(error)) {
            throw {
                code: error.code || 500,
                message: error.message || "Error updating user",
            };
        }
        throw { code: 500, message: "Unknown error updating user" };
    }
});
exports.editUser = editUser;
