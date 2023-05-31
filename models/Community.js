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
});

const Community = mongoose.model("Community", communitySchema);
export default Community;
