import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Products.css";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { getPosts, createPost } from "../service"; 

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  status: string;
}

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const apiData = await getPosts('posts');
      const formattedData = apiData.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.body,
        category: item.category,
        status: item.status,
      }));
      console.log(apiData.data);
      setProducts(formattedData);
    } catch (error) {
      console.error("Failed to fetch products", error); 
    }
  };

  // Handle adding new product
  const handleAddProduct = async (newProduct: Product) => {
    try {
      const addedProduct = await createPost(newProduct); // Add product via API
      
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <>
      <Dashboard />
      <br />
      <Container>
        <div className="parent">
          <h3>Products</h3>
          <Button className="addbtn" onClick={() => navigate("/dashboard/products/AddProduct")}>
            Add Product
          </Button>
        </div>
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td><input type="checkbox" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price !== "N/A" ? `$${product.price}` : "N/A"}</td>
                <td>{product.description}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Products;



