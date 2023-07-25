import express from "express";
import SearchController from "../controllers/SearchController";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/username", SearchController.searchUser);

export default router;
