import mongoose from "mongoose";
import { DB_URL, NODE_ENV, TEST_DB_URL } from "../config";

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
};

const connectToDB = () => {
  if (NODE_ENV === "production") {
    mongoose.connect(DB_URL, opts, () => {
      console.log("Connected to PROD_DB_URL");
    });
  } else if (NODE_ENV === "development") {
    mongoose.connect(DB_URL, opts, () => {
      console.log("Connected to TEST_DB_URL");
    });
  }
};

export default connectToDB;
