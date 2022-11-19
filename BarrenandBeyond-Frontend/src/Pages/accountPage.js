import Navi from '../Components/navbar.js';
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './Styles/accountPage.style.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import Button from 'react-bootstrap/Button';

export default function AccountPage() {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  
  const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
          setUserData(user)
          console.log(user)
        } else {
          console.log('nope')
          setLoggedIn(false)
        }
    });
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      alert('Please check your email, You should have recieved a verification link.')
      alert('note: Also check your spam folder.')
      // ...
    });
  }

  const resetPassword = () => {
    const email = userData.email;
    alert('Password reset was sent to your email!')
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  useEffect(() => {
    checkAuth();
  });

    return (
      <div className="account-page">
            <Navi/>
            <Card className='account-card'>
                <Card.Title className='title'>My Account</Card.Title>
                <Card.Subtitle id='uid'>UID: <span style={{color: 'grey'}}>{userData.uid}</span></Card.Subtitle>
                {userData.emailVerified ? null: <Alert variant="danger" className='verifyEmail'><a onClick={verifyEmail}>You need to verify your Email, Click Here!</a></Alert>}
                <Card.Body>
                  <InputGroup className="mb-3 input">
                    <InputGroup.Text id="basic-addon1">Display Name:</InputGroup.Text>
                      <Form.Control
                        placeholder={userData.displayName}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        readOnly
                      />
                  </InputGroup>

                  <InputGroup className="mb-3 input">
                    <InputGroup.Text id="basic-addon2">Email:</InputGroup.Text>
                    <Form.Control
                      placeholder={userData.email}
                      aria-label="Email"
                      aria-describedby="basic-addon2"
                      readOnly
                    />
                  </InputGroup>
                  <InputGroup className='mb-3 input'>
                  {userData.emailVerified ? <Alert variant="success" className='verifiedEmail'>Email is Verified</Alert> : null}
                  </InputGroup>
                  <InputGroup className="mb-3 input">
                    <InputGroup.Text id="basic-addon3">Phone:</InputGroup.Text>
                    <Form.Control
                      placeholder={userData.phone}
                      aria-label="Phone"
                      aria-describedby="basic-addon3"
                      readOnly
                    />
                  </InputGroup>

                  <div className="controlGroup">
                    <a className='changePass' type='button' onClick={resetPassword}>Change your password?</a>
                    <Button variant="primary" className='editBtn' size="md">
                      Edit Profile
                    </Button>
                  </div>
                  
                  
                </Card.Body>
            </Card>
      </div>
    );
  }
  