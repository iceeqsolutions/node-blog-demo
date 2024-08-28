import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
    console.log(err.message);
  }
};

start();

// Temporary blog data

const blogs = [
    {
      id: 1,
      title: "Blog 1",
      blogText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sunt quo possimus est commodi doloremque ipsam laudantium suscipit, dolore dignissimos optio, minima quas aperiam cum omnis tenetur qui quidem reiciendis. Rerum ipsa nobis repellat porro maxime quis quam recusandae est.",
    },
    {
      id: 2,
      title: "Blog 2",
      blogText:
        "Lorem ipsum est commodi doloremque ipsam laudantium suscipit, dolore dignissimos optio, minima quas aperiam cum omnis tenetur qui quidem reiciendis.",
    },
    {
      id: 3,
      title: "Blog 3",
      blogText:
        "Lorem quo possimus est commodi doloremque ipsam laudantium suscipit, dolore dignissimos optio, minima quas aperiam cum omnis tenetur qui quidem reiciendis. Rerum ipsa nobis repellat porro maxime quis quam recusandae est.",
    },
];

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

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Add Blog" });
});

// Test redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404
app.use((_req, res) => {
    res.status(404).render("404", { title: "404" });
});