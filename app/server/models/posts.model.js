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
exports.getAllPosts = exports.deletePostUser = exports.editPostUser = exports.getPostsByUserId = exports.postUser = void 0;
const database_model_1 = __importDefault(require("./database.model"));
const postUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, image_url, title, description }) {
    const query = `INSERT INTO posts ( user_id, image_url, title, description) VALUES ($1, $2, $3, $4)`;
    const values = [user_id, image_url, title, description];
    yield database_model_1.default.query(query, values);
});
exports.postUser = postUser;
const getPostsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM posts WHERE user_id = $1`;
    const values = [user_id];
    const result = yield database_model_1.default.query(query, values);
    return result.rows;
});
exports.getPostsByUserId = getPostsByUserId;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM posts`;
    const result = yield database_model_1.default.query(query);
    return result.rows;
});
exports.getAllPosts = getAllPosts;
const editPostUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { image_url, title, description } = user;
    const values = [image_url, title, description, id];
    const query = "UPDATE posts SET image_url = $1, title = $2, description = $3 WHERE id = $4";
    try {
        yield database_model_1.default.query(query, values);
    }
    catch (error) {
        console.error("Error updating user post:", error);
        throw new Error("Failed to update post in database");
    }
});
exports.editPostUser = editPostUser;
const deletePostUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM posts WHERE id = $1";
    try {
        const result = yield database_model_1.default.query(query, [id]);
        if (result.rowCount === 0) {
            throw new Error("No post found with the given ID");
        }
    }
    catch (error) {
        console.error("Error deleting user post:", error);
        throw new Error("Failed to delete post from database");
    }
});
exports.deletePostUser = deletePostUser;
