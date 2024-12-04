const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user")
const connectToDB = require("./connections/index");
const { checkAuth } = require("./middlewares/auth");
require("dotenv").config();

// middlewares
app.use(cors({origin : "http://localhost:3001", credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to MongoDB
connectToDB("todo");

// routes
app.use("/api/todos", checkAuth, todoRouter);
app.use("/api/user", userRouter);

// listener
app.listen(5050, () => {
  console.log("Server is running on port 5050");
});