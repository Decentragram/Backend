import express from "express";
import PostController from "../controllers/PostController";
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
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.get("/", auth, PostController.getUserPosts);
router.get("/feed", auth, PostController.getFeedPosts);
router.get("/feedguest", PostController.getFeedPostsGuest);
router.post(
  "/createPost",
  auth,
  upload.array("images", 10),
  PostController.createPost
);
router.post("/addComment/:id", auth, PostController.addComment);
router.post("/like/:id", auth, PostController.addLike);

export default router;
