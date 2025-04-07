import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    postedBy: "",
    date: "",
  });

  const navigate = useNavigate();

  // Auto-generate current date and time
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    setFormData((prev) => ({
      ...prev,
      date: `${formattedDate} ${formattedTime}`,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/bloglist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Blog created successfully:", result);
        alert("Blog created successfully!");
        navigate("/blogpage"); // Navigate to the blog list page
      } else {
        const error = await response.text();
        console.error("Failed to create blog:", error);
        alert("Something went wrong while creating the blog.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <Container className="mt-3 mt-md-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-light py-3">
          <h3 className="m-0">Create New Blog</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column md={3} className="text-md-end">
                Title
              </Form.Label>
              <Col md={7}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="category">
              <Form.Label column md={3} className="text-md-end">
                Category
              </Form.Label>
              <Col md={7}>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="tech">Tech</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="education">Education</option>
                  <option value="movies">Movies</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-5" controlId="content">
              <Form.Label column md={3} className="text-md-end">
                Content
              </Form.Label>
              <Col md={7}>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here..."
                  style={{ height: "350px" }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="postedBy">
              <Form.Label column md={3} className="text-md-end">
                Posted By
              </Form.Label>
              <Col md={7}>
                <Form.Select
                  name="postedBy"
                  value={formData.postedBy}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Posted by</option>
                  <option value="vijay">Vijay</option>
                  <option value="vinod">Vinod</option>
                  <option value="madhumitha">Madhumitha</option>
                  <option value="samantha">Samantha</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="date">
              <Form.Label column md={3} className="text-md-end">
                Publish Date
              </Form.Label>
              <Col md={7}>
                <Form.Control type="text" value={formData.date} readOnly />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate("/blogpage")}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateBlog;
