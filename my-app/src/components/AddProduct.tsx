import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { createPost } from "../service";

interface Product {
  id?: number;
  name: string;
  category: string;
  price: string;
  description: string;
  status: string;
}

function AddProduct({ setProducts }: { setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
  const [product, setProduct] = useState<Product>({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "New",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const payload = {
        title: product.name,
        body: product.description,
        userId: 1, 
      };
  
      const newProduct = await createPost("posts", payload);
  
      const formattedProduct = {
        id: newProduct.id,
        name: newProduct.title,
        category: product.category,
        price: product.price,
        description: newProduct.body,
        status: product.status,
      };
  
      
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedProducts = [...storedProducts, formattedProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
  
      setProducts(updatedProducts);
  
      alert("Product added successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };
  

  return (
    <>
      <Dashboard />
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <h3>Product Details</h3>

          <Form.Group className="mb-4">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter name" value={product.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Category</Form.Label>
            <Form.Select name="category" value={product.category} onChange={handleChange} required>
              <option value="">Choose...</option>
              <option value="B2B">B2B</option>
              <option value="D2C">D2C</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="number" name="price" placeholder="Enter price" value={product.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" name="description" placeholder="Enter description" value={product.description} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          <br />
          <Button className="backbtn" variant="secondary" onClick={() => navigate("/dashboard/products")}>
            Back
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddProduct;





