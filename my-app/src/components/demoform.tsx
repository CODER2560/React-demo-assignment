import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom';

function Demoform () {

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        status: ""
      });

      const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      alert('Form submitted successfully');
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

    return(  
    <>
    <Dashboard />
    <br />
    <Container mb-4>
    <Form onSubmit={handleSubmit}>
      <h3>Demo form</h3>

      <Form.Group className="mb-4">
        <Form.Label>Demo Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Demo Category</Form.Label>
        <Form.Select name="category"  value={formData.category}onChange={handleChange} required>
          <option value="">Choose...</option>
          <option value="B2B">B2B</option>
          <option value="D2C">D2C</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Demo Price</Form.Label>
        <Form.Control type="number" name="price" placeholder="Enter price" value={formData.price}onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Demo Description</Form.Label>
        <Form.Control as="textarea" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Demo Status Status</Form.Label>
        <Form.Select name="status"  value={formData.status}onChange={handleChange} required>
          <option value="">Choose...</option>
          <option value="New">New</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button>
      <br />
      <br />
      <Button className="backbtn" variant="secondary" onClick={()=> navigate('/dashboard')}>
        Back
      </Button>
    </Form>
    </Container>
    </>
    );
}

export default Demoform;