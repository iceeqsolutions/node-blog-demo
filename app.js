import express from "express";

const app = express();

// Specify which view engine to use
app.set("view engine", "ejs");

app.listen(3000);

// Render views
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/blogs/create", (req, res) => {
    res.render("create");
});

// Test redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404
app.use((req, res) => {
    res.status(404).render("404");
});