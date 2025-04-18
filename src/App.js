import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlog from "./components/createblog";
import BlogList from "./components/bloglist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateBlog />} />
        <Route path="/blogpage" element={<BlogList />} />
      </Routes>
    </Router>
  );
};

export default App;
