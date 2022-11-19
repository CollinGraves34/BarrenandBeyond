import {Navbar, Nav, Container} from 'react-bootstrap';
import logo from '../Resources/Images/Logo.png';
import React, { useState, useEffect } from "react";
import './Styles/navbar.js.css';
import CheckAuth from '../Firebase/checkAuth';
import {Link} from "react-router-dom";
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
            <Nav.Link><Link to='/home' className='link'>Home</Link></Nav.Link>
            <Nav.Link><Link to='/latest-posts' className='link'>Latest Posts</Link></Nav.Link>
            <Nav.Link><Link to='/account' className='link'>My Profile</Link></Nav.Link>
            <Nav.Link><Link to='/members' className='link'>Members</Link></Nav.Link>
              {CheckAuth() ? <Nav.Link><Link to='/logout' className='link'>Logout</Link></Nav.Link>: <Nav.Link><Link to='/' className='link'>Login</Link></Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    );
  }
  