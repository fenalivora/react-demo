import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Styles = styled.div`
    .navbar-brand,
    .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;

const NavigationBar = (props) => (
    <Styles>
        <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{" "}
                CoderStory
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav.Item>
                    <Nav.Item hidden={props.isLoggedIn}>
                        <Nav.Link href="/login">Login/Signup</Nav.Link>
                    </Nav.Item>
                    <Nav.Item hidden={!props.isLoggedIn}>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);

export default NavigationBar;
