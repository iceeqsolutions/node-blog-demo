import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRoutes.js";

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();

// Import environment variables
const PORT = process.env.PORT || 3010;
const dbConnection = process.env.CONNECTION;

// Add DB connection string, set up Mongoose and connect to DB
const start = async () => {
  try {
    await mongoose.connect(dbConnection);

    app.listen(PORT, () => {
      console.log("App listening to port " + PORT);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

start();

// Specify which view engine to use
app.set("view engine", "ejs");

// Register public folder and middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Render views
app.get("/", (_req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (_req, res) => {
    res.render("about", { title: "About" });
});

// Test redirect
app.get("/about-us", (_req, res) => {
  res.redirect("/about");
});

// Blog routes
app.use("/blogs", blogRouter);

// 404
app.use((_req, res) => {
    res.status(404).render("404", { title: "404" });
});