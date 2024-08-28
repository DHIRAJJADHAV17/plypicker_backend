import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./routes/MyUserRoutes";
import ProductRoutes from "./routes/MyProductRoute";
import ReviewRoutes from "./routes/MyReviewRoutes";
import mongoose from "mongoose";
// firebaseConfig.js

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => console.log("connected to database"));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello !",
  });
});

app.use("/api/my/user", UserRoutes);
app.use("/api/my/product", ProductRoutes);
app.use("/api/my/review", ReviewRoutes);

app.listen(7000, () => {
  console.log("Server started");
});
