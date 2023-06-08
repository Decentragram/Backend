import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  members: [
    {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      type: String,
      default: [],
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  images: [Object],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      media: [Object],
      caption: {
        type: String,
        maxlength: 2000,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: [],
        },
      ],
      tags: {
        type: [String],
      },
      views: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
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
    },
  ],
});

const Community = mongoose.model("Community", communitySchema);
export default Community;
