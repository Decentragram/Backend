import express from "express";
import AuthController from "../controllers/admin/AuthController";

const router = express.Router();

router.get("/users", AuthController.getAllUsers);
router.get("/posts", AuthController.getAllPosts);

export default router;
