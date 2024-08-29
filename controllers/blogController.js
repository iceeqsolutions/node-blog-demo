// Naming convention: MDN-like

import Blog from "../models/blog.js";

const blog_index = (_req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((data) => {
      res.render("index", { title: "Home", blogs: data });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("blog-details", { title: "Blog Details", blog: data });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
};

const blog_create_get = (_req, res) => {
  res.render("create", { title: "Add Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((data) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((data) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.error("Encountered the following error: " + err);
    });
};

export {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};