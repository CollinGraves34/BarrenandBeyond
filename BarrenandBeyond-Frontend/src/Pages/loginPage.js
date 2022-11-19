import {React, useState, useRef} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Card, Button, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import './Styles/loginPage.style.css';
import logo from '../Resources/Images/Logo.png';
import {Link} from "react-router-dom";
export default function LoginPage() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [wasCreated, setCreated] = useState({
        state: false,
        message: '',
        type: ''
    })
    
    const [formData, updateFormData] = useState({
        email: '',
        password: ''
    });

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate(`/home`)
        })
        .catch((error) => {
            const errorCode = error.code;
            setCreated({
                ['state']: true,
                ['message']: `${errorCode}`,
                ['type']: 'danger'
              });
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
            setCreated({
                ['state']: true,
                ['message']: `Email or Password was left blank`,
                ['type']: 'danger'
              });
        }
      };

    return (
        <>
            <Card className='login-card'>
                <Card.Header className='login-card-header'>
                    <img alt="logo" src={logo} width='15%'/>
                </Card.Header>
                <Card.Title style={{textAlign: 'center', padding: '15px'}}>Please login or signup to continue to Barren and Beyond</Card.Title>
                <Alert show={wasCreated.state} style={{textAlign: 'center'}} variant={wasCreated.type}>{wasCreated.message}</Alert>
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
                        <Link to='/signup' className='signupLink'>Don't have an account?</Link>
                    </Form>
                </Card.Body>
            </Card>
            <div className='copyright'>Copyright &copy; Barren and Beyond</div>
        </>
    );
}
