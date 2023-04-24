import catchAsync from "../../utils/catchAsync.js";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../config";
import User from "../../models/user.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

class AuthController {
  static getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({})
      .select("-password")
      .sort({
        createdAt: -1,
      })
      .lean();

    for (let i = 0; i < users.length; i++) {
      users[i].postsCount = await Post.countDocuments({ userId: users[i]._id });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  });

  static getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find().populate("userId", "username profilePic").lean();

    for (let i = 0; i < posts.length; i++) {
      posts[i].commentsCount = await Comment.countDocuments({ postId: posts[i]._id });
      posts[i].comments = await Comment.find({ postId: posts[i]._id })
        .populate("userId", "username profilePic")
        .lean();
      posts[i].likesCount = posts[i].likes.length;
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  });
}

export default AuthController;
