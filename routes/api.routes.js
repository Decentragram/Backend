import express from "express";
import authRoutes from "./auth.routes";
import user from "./user.routes";
import postRoutes from "./post.routes";
import adminRoutes from "./admin.routes";

const app = express();

app.use("/auth", authRoutes);
app.use("/user", user);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);

export default app;
