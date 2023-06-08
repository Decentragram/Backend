import express from "express";
import CommunityController from "../controllers/CommunityController";
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

router.post(
  "/createCommunity",
  auth,
  upload.array("images", 10),
  CommunityController.createCommunity
);
router.post(
  "/createCommunityPost",
  auth,
  upload.array("images", 10),
  CommunityController.createCommunityPost
);
router.post(
  "/joinCommunity/:id",
  auth,

  CommunityController.joinCommunity
);

router.get("/getAllCommunities", auth, CommunityController.getAllCommunity);
router.get("/getCommunities/:id", auth, CommunityController.getCommunityById);
router.get(
  "/getJoinedCommunities",
  auth,
  CommunityController.getJoinedCommunities
);

export default router;
