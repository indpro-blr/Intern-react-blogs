import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    postedBy: "",
    date: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (location.state && location.state.blog) {
      setFormData(location.state.blog);
    }
  }, [location.state]);

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
      const method = formData.id ? "PUT" : "POST"; // Use PUT if editing, POST if creating
      const url = formData.id
        ? `http://localhost:5000/bloglist/${formData.id}`
        : "http://localhost:5000/bloglist";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          formData.id
            ? "Blog updated successfully!"
            : "Blog created successfully!"
        );
        navigate("/list");
      } else {
        alert("Failed to save the blog.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while saving the blog.");
    }
  };

  return (
    <Container className="mt-3 mt-md-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-light py-3">
          <h3 className="m-0">{formData.id ? "Edit Blog" : "Create New Blog"}</h3>
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
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Enter blog category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
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
                <Form.Control
                  type="text"
                  name="postedBy"
                  placeholder="Enter author name"
                  value={formData.postedBy}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="date">
              <Form.Label column md={3} className="text-md-end">
                Publish Date
              </Form.Label>
              <Col md={7}>
                <Form.Control
                  type="text"
                  name="date"
                  placeholder="Enter publish date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button type="submit" variant="primary">
                {formData.id ? "Update" : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/list")}
              >
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
