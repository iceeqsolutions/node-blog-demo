import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/blog.js";

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

// Register public folder
app.use(express.static("public"));

// Render views
app.get("/", (req, res) => {
    res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// Test MongoDB routes
app.get("/blogs/create", (req, res) => {
    const blog = new Blog({
      title: "Test Blog",
      author: "John Doe",
      blogText:
        "My first blog.",
    });
  
    blog
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
});

// Test redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404
app.use((_req, res) => {
    res.status(404).render("404", { title: "404" });
});