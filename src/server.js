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


app.get("/getblogs", (req, res) => {
  const blogs = readDataFromFile();
  res.json(blogs);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});