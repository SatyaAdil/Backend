import express from "express";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import authRoute from "./src/routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use("/auth", authRoute);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
