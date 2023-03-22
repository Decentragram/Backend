import express from "express";
import cors from "cors";
import { PORT, NODE_ENV } from "./config";
import connectToDB from "./database";
import errorHandler from "./utils/errorHandler";
import router from "./routes/api.routes";
const morgan = require("morgan");

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
      { stream: { write: (message) => logger.log("info", message.trim(), { tags: ["http"] }) } }
    )
  );
}

app.get("/", (req, res) => {
  res.send("Decentragram Backend V1.0.0");
});

app.use("/api", router);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
