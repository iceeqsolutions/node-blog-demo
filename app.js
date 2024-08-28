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

// Register public folder and middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Render views
/* app.get("/", (req, res) => {
    res.render("index", { title: "Home", blogs });
}); */

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// Test MongoDB routes
app.get("/blogs", (_req, res) => {
    Blog.find()
      .then((data) => {
        res.render("index", { title: "Home", blogs: data });
      })
      .catch((err) => {
        console.error("Encountered the following error: " + err);
      });
});

app.post("/blogs", (req, res) => {
    // Test the POST request
    /* console.log(req.body); */
    const blog = new Blog(req.body);
  
    blog
      .save()
      .then((data) => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.error("Encountered the following error: " + err);
      });
});

app.get("/blogs/create", (_req, res) => {
    res.render("create", { title: "Add Blog" });
});

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((data) => {
        res.render("blog-details", { title: "Blog Details", blog: data });
      })
      .catch((err) => {
        console.error("Encountered the following error: " + err);
      });
  });
  
  app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((data) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => {
        console.error("Encountered the following error: " + err);
      });
  });

// Test redirect
app.get("/about-us", (_req, res) => {
  res.redirect("/about");
});

// 404
app.use((_req, res) => {
    res.status(404).render("404", { title: "404" });
});