import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dashboard from './Dashboard';
import { Container } from 'react-bootstrap';

// Define a type for the post data
interface Post {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: number;
  website: string;
  company: string;
}

function Category() {
  const [posts, setPosts] = useState<Post[]>([]);  // Type the posts state


  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        
      });
  }, []);

  return (
    <>
      <Dashboard />
      <br />
      <Container mb-4>
        <div className="parent">
          <h3>Category</h3>
          <Button className="addbtn">Add Category</Button>
        </div>

        <br />
          <div>   
            <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">ID</th>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">UserName</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Website</th>
                        <th className="border border-gray-400 px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                <tr key={post.id} className="border border-gray-400">
                <td className="border border-gray-400 px-4 py-2">{post.id}</td>
                <td className="border border-gray-400 px-4 py-2">{post.name}</td>
                <td className="border border-gray-400 px-4 py-2">{post.username}</td>
                <td className="border border-gray-400 px-4 py-2">{post.email}</td>
                <td className="border border-gray-400 px-4 py-2">{post.website}</td>
                <td className="border border-gray-400 px-4 py-2">{post.phone}</td>
                </tr>
                 ))}
           </tbody>
            </table>
          </div>
        
      </Container>
    </>
  );
}

export default Category;

