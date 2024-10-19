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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCredentials = void 0;
const database_model_1 = __importDefault(require("./database.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verifyCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const values = [email];
    const query = "SELECT * FROM users WHERE email = $1";
    try {
        const { rows, rowCount } = yield database_model_1.default.query(query, values);
        if (rowCount === 0) {
            throw { code: 401, message: "Email or password incorrect" };
        }
        const user = rows[0];
        const { password: encryptedPassword } = user, userWithoutPassword = __rest(user, ["password"]);
        const passwordCorrect = bcryptjs_1.default.compareSync(password, encryptedPassword);
        if (!passwordCorrect) {
            throw { code: 401, message: "Email or password incorrect" };
        }
        return userWithoutPassword;
    }
    catch (error) {
        console.error("Database query failed:", error);
        throw { code: 500, message: "Internal server error" };
    }
});
exports.verifyCredentials = verifyCredentials;
