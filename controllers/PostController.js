import CustomErrorHandler from "../utils/CustomErrorHandler";
import catchAsync from "../utils/catchAsync";
import joi from "joi";
import uploadFile from "../utils/cloudinary";
import Post from "../models/Post";
import Comment from "../models/Comment";

class PostController {
  static createPost = catchAsync(async (req, res, next) => {
    try {
      const { _id, username } = req.user;
      let { caption, tags } = req.body;

      const schema = joi.object({
        caption: joi.string(),
        //   visibility: joi.string().valid("public", "followers"),
        //   mediaType: joi.string().valid("media", "text").required(),
        tags: joi.string(),
        //   taggedUsers: joi.array().items(joi.string()),
        //   type: joi.string().valid("post", "repost"),
        //   parentPost: joi.string(),
      });

      const { error } = schema.validate({ caption, tags });
      if (error) {
        return next(new CustomErrorHandler(400, error.details[0].message));
      }

      let media = [];

      const getBlobName = (originalName) => {
        const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
        return `${identifier}-${originalName}`;
      };
      let url;
      console.log(req.files, "files");

      let filedata;

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          //   add logic to upload file and store in media array
          filedata = await uploadFile(req.files[i].buffer);

          if (!filedata) {
            return res.status(500).send("Error while uploading file. Try again later.");
          }

          media.push({
            url: filedata.secure_url,
            type: req.files[i].mimetype,
          });
        }
      }
      // console.log(media, "media");
      console.log(tags, "tags");

      tags = tags.split(",");

      for (let i = 0; i < tags.length; i++) {
        tags[i] = String(tags[i]).slice(1).toLowerCase();
      }

      console.log(tags, "tags");

      // Logic for tagged users

      const newPost = await Post.create({
        userId: _id,
        caption,
        tags,
        media,
      });

      res.status(201).json({
        success: true,
        data: newPost,
      });
    } catch (error) {
      console.log("error=>", error);
      return next(new CustomErrorHandler(400, error.message));
    }
  });

  static getUserPosts = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    const posts = await Post.find({
      userId: _id,
    }).populate("userId", "username profilePic");

    res.status(200).json({
      success: true,
      data: posts,
    });
  });

  static getFeedPosts = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    const posts = await Post.find({}).populate("userId", "username profilePic").lean();

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].likes.map(String).includes(_id)) {
        posts[i].isLiked = true;
      } else {
        posts[i].isLiked = false;
      }
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  });

  static addComment = catchAsync(async (req, res, next) => {
    let { comment } = req.body;
    const { _id } = req.user;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return next(new CustomErrorHandler(400, "Post not found"));
    }

    const newComment = await Comment.create({
      userId: _id,
      postId: post._id,
      comment,
    });

    console.log("newComment", newComment);

    // if (req.user._id !== post.userId.toString()) {
    //   await NotificationController.sendNotification(
    //     _id,
    //     post.userId,
    //     "post",
    //     "New Comment",
    //     `${username ? username : "Someone"} has commented on your post`,
    //     post._id
    //   );
    // }

    // send notification to tagged users
    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  });

  static getComments = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const comments = await Comment.find({ postId: id })
      .populate("userId", "username profilePic")
      .lean();

    return res.status(200).json({
      success: true,
      data: comments,
    });
  });
}

export default PostController;
