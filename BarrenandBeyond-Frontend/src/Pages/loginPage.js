import {React, useState, useRef} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import './Styles/loginPage.style.css';
import logo from '../Resources/Images/Logo.png';

export default function LoginPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const [formData, updateFormData] = useState({
        email: '',
        password: ''
    });

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate(`/home?user=${user.displayName};email=${user.email}`)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
            navigate('/');
        });
    }

    const handleChange = event => {
        updateFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (formData.email && formData.password) {
            login(formData.email, formData.password)
        } else {
            alert(`email or password was left blank`);
        }
      };

    return (
        <>
            <Card className='login-card'>
                <Card.Header className='login-card-header'>
                    <img alt="logo" src={logo} width='15%'/>
                </Card.Header>
                <Card.Title style={{textAlign: 'center', padding: '15px'}}>Please login or signup to continue to Barren and Beyond</Card.Title>
                <Card.Body className='login-card-body'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" autoComplete='email' onChange={event => handleChange(event)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" autoComplete='current-password' onChange={event => handleChange(event)}/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" className='submitBtn' onClick={handleSubmit}>Login!</Button>
                        <br/><br/>
                        <Button variant="success" type="link" href='/signup' className='signupBtn'>Goto Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='copyright'>Copyright &copy; Barren and Beyond</div>
        </>
    );
}
