import express from "express";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import authRoute from "./src/routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Bintang oy oy");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
