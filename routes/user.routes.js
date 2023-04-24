import express from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/me", auth, UserController.getUser);
router.get("/getFollowers/:id", auth, UserController.FollowerList);
router.get("/getFollowings/:id", auth, UserController.FollowingList);

router.get("/user/:id", auth, UserController.getUserById);
router.post("/:operation/:id", auth, UserController.followUser);

router.post("/editProfile", auth, UserController.editProfile);

export default router;
