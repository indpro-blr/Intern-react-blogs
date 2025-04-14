import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the server
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch("http://localhost:5000/list")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/bloglist/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        fetchBlogs(); // Refresh the blog list
      } else {
        alert("Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  // Handle edit blog
  const handleEdit = (blog) => {
    navigate("/create", { state: { blog } }); // Pass the blog data to the CreateBlog page
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Blogs</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/create")}>
          Create New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center">No blogs available.</p>
      ) : (
        <div className="row">
          {blogs.map((blog, index) => (
            <div className="col-md-12 mb-4" key={blog.id}>
              <div className="custom-card p-4 position-relative shadow">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="mb-3">
                    #{index + 1} {blog.title}
                  </h5>
                  <div>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"

                      onClick={() => handleEdit(blog)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
                <div className="mb-3 fs-3 fw-bold" style={{ wordBreak: "break-word" }}>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className="text-muted mb-2">#{blog.category}</div>
                <div className="d-flex justify-content-end text-muted small">
                  <div>
                    Published: {blog.date}
                    <br />
                    By: {blog.postedBy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
