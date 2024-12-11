import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const Product = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    size: "",
    color: "",
    unitPrice: "",
    quantity: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data as a JSON object
      const response = await axios.post(
        "http://localhost:8000/inventory/products", // backend api endpoint fro add poduct
        formData
      );

      // this for show a success message if the request is successful
      setSuccessMessage("Product added successfully!");
      setErrorMessage(""); // Clear any previous error messages

      // Clear the form data
      setFormData({
        category: "",
        subCategory: "",
        size: "",
        color: "",
        unitPrice: "",
        quantity: "",
      });
    } catch (error) {
      // show the error message
      setErrorMessage("Something went wrong! Procudt cannot be added");
      setSuccessMessage("");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Roofing">Roofing</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="subCategory">
              <Form.Label>Sub-Category</Form.Label>
              <Form.Select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Sub-Category</option>
                <option value="Normal Roofing">Normal Roofing</option>
                <option value="Tile Roofing">Tile Roofing</option>
                <option value="Sub Product 1">Sub Product 1</option>
                <option value="Sub Product 2">Sub Product 2</option>
                <option value="Sub Product 3">Sub Product 3</option>
                <option value="Sub Product 4">Sub Product 4</option>
                <option value="Sub Product 5">Sub Product 5</option>
                <option value="Sub Product 6">Sub Product 6</option>
                <option value="Sub Product 7">Sub Product 7</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="size">
              <Form.Label>Size (Gauge)</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Enter size"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Enter color"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="unitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder="Enter unit price"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Button variant="primary" type="submit" className="w-100">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default Product;
