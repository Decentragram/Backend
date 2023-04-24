import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
      maxlength: 2000,
    },
    media: [Object],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    // mediaType: {
    //   type: String,
    //   enum: ["media", "text"],
    // },
    // visibility: {
    //   type: String,
    //   enum: ["public", "followers"],
    // },
    tags: {
      type: [String],
    },
    // isPrivate: {
    //   type: Boolean,
    //   default: false,
    // },
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // taggedUsers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "UserDeta",
    //   },
    // ],
    hidden: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    // type: {
    //   type: String,
    //   enum: ["post", "repost"],
    //   default: "post",
    // },
    // parentPost: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    // },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
