import {React, useState, useRef, useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import './Styles/signupPage.style.css';
import logo from '../Resources/Images/Logo.png';

export default function SignupPage() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [passMatch, setPassMatch] = useState(false)

    const [wasCreated, setCreated] = useState({
      state: false,
      message: '',
      type: ''
    })
    
    const [formData, updateFormData] = useState({
      email: '',
      password: '',
      confirm: ''
    });

    function signUp(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setCreated({
          ['state']: true,
          ['message']: 'Account was created',
          ['type']: 'success'
        });
      })
      .catch((error) => {
        console.log(error.message)
        setCreated({
          ['state']: true,
          ['message']: `${error.message}`,
          ['type']: 'danger'
        })
      });
    }

    const handleChange = event => {
      updateFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (passMatch && formData.email && formData.password && formData.confirm) {
          signUp(formData.email, formData.password)
        } if(!passMatch) {
          setCreated({
            ['state']: true,
            ['message']: `Password's don't match`,
            ['type']: 'danger'
          });
          console.log(wasCreated.state, wasCreated.message, wasCreated.type)
        } else {
          setCreated({
            ['state'] : true,
            ['message']: 'Some info is still needded',
            ['type']: 'danger'
          });
          console.log(wasCreated.state, wasCreated.message, wasCreated.type)
        }   
      };

    const checkPassMatch = () => {
      if (formData.password === formData.confirm) {
        setPassMatch(true);
      } else {
        setPassMatch(false);
      }
    }

    useEffect(() => {
      checkPassMatch();
    });

    return (
        <>
            <Card className='signup-card'>
                <Card.Header className='signup-card-header'>
                    <img alt="logo" src={logo} width='15%'/>
                </Card.Header>
                <Card.Title style={{textAlign: 'center', padding: '15px'}}>Please signup to Barren and Beyond</Card.Title>
                <Alert show={wasCreated.state} style={{textAlign: 'center'}} variant={wasCreated.type}>{wasCreated.message}</Alert>
                <Card.Body className='signup-card-body'>
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>{passMatch ? <span style={{color: 'green'}}className='alert-confirmpass' variant="success">Passwords match</span>:<span style={{color: 'red'}} className='alert-confirmpass' variant="danger">Passwords don't match</span>}</Form.Label>
                            <Form.Control type="password" name="confirm" placeholder="Confirm Password" autoComplete='current-password' onChange={event => handleChange(event)}/>
                        </Form.Group>
                        <br/>
                        <Button variant="success" type="submit" onClick={event => handleSubmit(event)} className='submitBtn'>Sign Up!</Button>
                        <br/><br/>
                        <a href='/' className='signinLink'>Already have an account?</a>
                    </Form>
                </Card.Body>
            </Card>
            <div className='copyright'>Copyright &copy; Barren and Beyond</div>
        </>
    );
}
