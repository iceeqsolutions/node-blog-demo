import express from "express";
import Blog from "../models/blog.js";

const router = express.Router();

router.get("/blogs", (_req, res) => {
  Blog.find()
    .then((data) => {
      res.render("index", { title: "Home", blogs: data });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
});

router.post("/blogs", (req, res) => {
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

router.get("/blogs/create", (_req, res) => {
  res.render("create", { title: "Add Blog" });
});

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("blog-details", { title: "Blog Details", blog: data });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
});

router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((data) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
});

export default router;