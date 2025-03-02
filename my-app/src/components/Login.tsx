import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

interface User {
    name: string;
    email: string;
    password: string;
}

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Prevents any unintended UI behavior
        const userSessionData = localStorage.getItem('RegisteredUserData');
        const users: User[] = userSessionData ? JSON.parse(userSessionData) : [];
        
        const foundUser = users.find((user) => user.email === email && user.password === password);
        
        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            setIsLoggedIn(true);
            setToastMessage('Login successful!');
            setShowToast(true);
            setTimeout(() => navigate('/dashboard'), 1000);
        } else {
            setToastMessage('Invalid credentials!');
            setShowToast(true);
            setTimeout(() => navigate('/'),1000)
        }
    };

    const handleRegister = () => {
        navigate('/signup');
    };

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#f8f9fa' }}>
            <MDBCard className="shadow p-4" style={{ width: '30rem' }}>
                <MDBCardBody>
                    <MDBCardTitle className="text-center mb-3 text-primary fw-bold">Welcome Back</MDBCardTitle>
                    <MDBCardText className="text-center text-muted mb-4">Sign in to continue</MDBCardText>
                    <form onSubmit={handleLogin}>
                    <label>Enter Email address</label>
                        <MDBInput wrapperClass='mb-3' id='form1' type='email' value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    <label>Enter Password</label>
                        <MDBInput wrapperClass='mb-3' id='form2' type='password' value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <div className="d-flex justify-content-between mb-3">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="#!" className="text-primary">Forgot password?</a>
                        </div>
                        <Button  type="button" value="Sign in" onClick={handleLogin}>Login</Button>
                    </form>
                    <p className="text-center text-muted mt-3">Don't have an account? <a href="#!" onClick={handleRegister} className="text-primary">Register</a></p>
                </MDBCardBody>
            </MDBCard>
            {showToast && (
                <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center w-100 position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Notification</strong>
                            <small>Just now</small>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
                        </div>
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}
        </MDBContainer>
    );
}

export default Login;



