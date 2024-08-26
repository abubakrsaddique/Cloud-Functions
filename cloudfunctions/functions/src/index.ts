import * as functions from "firebase-functions";
import * as express from "express";
import { authenticate } from "./middleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);

export const api = functions.https.onRequest(app);
