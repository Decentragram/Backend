import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    wallet_address: String,
    message_to_sign: String,
    name: String,
    email: String,
    phone: String,
    profilePic: String,
    dob: Date,
    interests: Array,
    isOnboarding: {
      type: Boolean,
      default: true,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
