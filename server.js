const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes");

dotenv.config();
connectDB();

app.use(express.json());
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.listen(5000, console.log("Server started on PORT 5000"));
