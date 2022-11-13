import {Navbar, Nav, Container} from 'react-bootstrap';
import logo from '../Resources/Images/Logo.png';
import React, { useState, useEffect } from "react";
import './Styles/navbar.js.css';
import CheckAuth from '../Firebase/checkAuth';

export default function Navi() {

    return (
        <Navbar bg="dark" variant="dark" className='navi'>
        <Container>
          <img
              alt="logo"
              src={logo}
              width='15%'
              className="d-inline-block align-top"
            />
          <Navbar.Brand href="/home">
            Barren and Beyond
          </Navbar.Brand>
          <Nav className="me-auto links">
              <Nav.Link href='/home'>Home</Nav.Link>
              {CheckAuth() ? <Nav.Link href='/logout'>Logout</Nav.Link>: <Nav.Link href='/login'>Login</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    );
  }
  