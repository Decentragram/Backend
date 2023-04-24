import express from "express";
import authRoutes from "./auth.routes";
import user from "./user.routes";
const app = express();

app.use("/auth", authRoutes);
app.use("/user", user);

export default app;
