import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {MDBContainer,  MDBInput} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

interface User {
    name: string;
    email: string;
    password: string;
}

function Signup() {
    const [name, setname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    

    const navigate = useNavigate();

    // Handle registration
    const handleRegister = () => {
        if (email && password && name) {
            
            const existingData = localStorage.getItem('RegisteredUserData');
            const parsedData: User[] = existingData ? JSON.parse(existingData) : [];

            // Add the new user data to the array
            parsedData.push({ name, email, password });

            // Save the updated user data array back to localStorage
            localStorage.setItem('RegisteredUserData', JSON.stringify(parsedData));
            setToastMessage('Registration successful!');
            setShowToast(true);
            setTimeout(() => navigate('/'), 1000);
        } else {
            setToastMessage('Incomplete details try again !!');
            setShowToast(true);
            setTimeout(() => navigate('/Signup'),1000)
        }
    };

    const handleBLogin = () => {
        navigate('/');
    };


    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
            <br></br>
            <label>Enter Your Name</label>
          <MDBInput wrapperClass='mb-4' id='form1' type='name' value={name}
                    onChange={(e) => setname(e.target.value)}/>
            <label>Enter Your Email address</label>
            <MDBInput wrapperClass='mb-4' id='form2' type='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            <label>Enter Your Password</label>
          <MDBInput wrapperClass='mb-4' id='form3' type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
    
          
          <Button  type="button" value="Sign in" onClick={handleRegister}>Register</Button>
          <br />
          <Button  type="button" value="Sign in" onClick={handleBLogin}>Back to Login</Button>

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

export default Signup;
