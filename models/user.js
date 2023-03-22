import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    wallet_address: String,
    message_to_sign: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
