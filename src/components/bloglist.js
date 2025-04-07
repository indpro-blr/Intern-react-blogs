import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";


const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/getblogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Blogs</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
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
                  <h5 className="mb-3">#{index + 1} {blog.title}</h5>
                  <div>
                    <button className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
                <div className="mb-3 fs-3 fw-bold" style={{ wordBreak: 'break-word' }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  
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
