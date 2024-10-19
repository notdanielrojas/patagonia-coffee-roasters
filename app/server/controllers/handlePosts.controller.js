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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllPosts = exports.handleDeletePostUser = exports.handleEditPostUser = exports.handleGetPostsByUserId = exports.handlePostUser = void 0;
const posts_model_1 = require("../models/posts.model");
const codes_utils_1 = require("../utils/codes.utils");
const handlePostUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image_url, title, description, user } = req.body;
    console.log("Request Body:", req.body);
    console.log("User ID:", user === null || user === void 0 ? void 0 : user.id);
    if (!image_url || !title || !description || !(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        yield (0, posts_model_1.postUser)({ image_url, title, description, user_id: user.id });
        const successResponse = (0, codes_utils_1.handleSuccess)(201);
        res.status(successResponse.status).json(successResponse.message);
    }
    catch (error) {
        console.error(error);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).json({ message: errorResponse.message, error: error.message });
    }
});
exports.handlePostUser = handlePostUser;
const handleGetPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = Number(id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const posts = yield (0, posts_model_1.getPostsByUserId)(userId);
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.handleGetPostsByUserId = handleGetPostsByUserId;
const handleGetAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, posts_model_1.getAllPosts)();
        if (!posts || posts.length === 0) {
            res.status(404).json({ message: "No posts found" });
            return;
        }
        res.status(200).json(posts);
    }
    catch (error) {
        console.error(error);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).json({ message: errorResponse.message, error: error.message });
    }
});
exports.handleGetAllPosts = handleGetAllPosts;
const handleEditPostUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { image_url, title, description } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!image_url || !title || !description || !userId) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        yield (0, posts_model_1.editPostUser)(Number(id), { image_url, title, description, user_id: Number(userId) });
        const successResponse = (0, codes_utils_1.handleSuccess)(200);
        res.status(successResponse.status).json(successResponse.message);
    }
    catch (error) {
        console.error(error);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).json({ message: errorResponse.message, error: error.message });
    }
});
exports.handleEditPostUser = handleEditPostUser;
const handleDeletePostUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, posts_model_1.deletePostUser)(Number(id));
        const successResponse = (0, codes_utils_1.handleSuccess)(204);
        res.status(successResponse.status).send(successResponse.message);
    }
    catch (error) {
        console.error(error);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).json({ message: errorResponse.message, error: error.message });
    }
});
exports.handleDeletePostUser = handleDeletePostUser;
