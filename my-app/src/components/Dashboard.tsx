import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Products from './Products';
import Demoform from './demoform';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = loggedInUser ? JSON.parse(loggedInUser) : null;
        if (!loggedInUser) {
            navigate('/');  
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');  
        navigate('/');  
    };

    // Get the logged-in user's name from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    return (
            <div>
                <Navbar bg="primary" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
                        <Nav className="me-auto">
                            <div className="d-flex gap-4">
                                <Button onClick={() => navigate('/dashboard/products')} variant="light">
                                    Products
                                </Button>
                                <Button onClick={() => navigate('/dashboard/category')} variant="light">
                                    Category
                                </Button>
                                <Button onClick={() => navigate('/dashboard/demoform')} variant="light">
                                    DemoForm
                                </Button>
                                <Button onClick={() => navigate('/dashboard/demoapi')} variant="light">
                                    Demoapi
                                </Button>
                            </div>
                        </Nav>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </Container>
                </Navbar>
            </div>
    );
}

export default Dashboard;




