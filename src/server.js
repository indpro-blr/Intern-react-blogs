const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dbFilePath = path.join(__dirname, "db.json");

const readDataFromFile = () => {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dbFilePath, "utf-8");
  return JSON.parse(data);
};

const writeDataToFile = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Create a new blog
app.post("/bloglist", (req, res) => {
  const { title, category, content, postedBy, date } = req.body;

  if (!title || !category || !content || !postedBy || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const blogs = readDataFromFile();

  const newBlog = {
    id: blogs.length + 1,
    title,
    category,
    content,
    postedBy,
    date,
  };

  blogs.push(newBlog);
  writeDataToFile(blogs);

  res.status(201).json({
    message: "Blog post created successfully!",
    blog: newBlog,
  });
});

// Get all blogs
app.get("/list", (req, res) => {
  const blogs = readDataFromFile();
  res.json(blogs);
});

// Update a blog
app.put("/bloglist/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, content, postedBy, date } = req.body;

  if (!title || !category || !content || !postedBy || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const blogs = readDataFromFile();
  const blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));

  if (blogIndex === -1) {
    return res.status(404).json({ message: "Blog not found." });
  }

  blogs[blogIndex] = { id: parseInt(id), title, category, content, postedBy, date };
  writeDataToFile(blogs);

  res.status(200).json({
    message: "Blog updated successfully!",
    blog: blogs[blogIndex],
  });
});

// Delete a blog
app.delete("/bloglist/:id", (req, res) => {
  const { id } = req.params;

  const blogs = readDataFromFile();
  const filteredBlogs = blogs.filter((blog) => blog.id !== parseInt(id));

  if (blogs.length === filteredBlogs.length) {
    return res.status(404).json({ message: "Blog not found." });
  }

  writeDataToFile(filteredBlogs);

  res.status(200).json({ message: "Blog deleted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});