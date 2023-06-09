import express from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import multer from "multer";
const router = express.Router();

let storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
  limits: {
    fileSize: 10000000, // max file size 10MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error("only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.")
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.get("/me", auth, UserController.getUser);
router.get("/getFollowers/:id", auth, UserController.FollowerList);
router.get("/getFollowings/:id", auth, UserController.FollowingList);

router.get("/user/:id", auth, UserController.getUserById);
router.post("/:operation/:id", auth, UserController.followUser);

router.post("/editProfile", auth, upload.single("profilePic"), UserController.editProfile);

export default router;
