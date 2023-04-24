import CustomErrorHandler from "../utils/CustomErrorHandler";
import catchAsync from "../utils/catchAsync";
import joi from "joi";

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

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          //   add logic to upload file and store in media array
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
}
