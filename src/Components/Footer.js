import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Styles = styled.div`
    .footer-bottom {
        position: relative;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .covid-bar {
        height: 50px;
        color: white;
        line-height: 50px;
        text-align: center;
        background: #2d7443;
    }
`;
const Footer = () => (
    <Styles>
        <div className="footer-bottom">
            <Navbar bg="dark" variant="dark">
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Item>
                            <Nav.Link
                                href="https://www.facebook.com/"
                                target="blank"
                                className="fa fa-facebook mx-2 fa-2x"
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="https://www.instagram.com/"
                                target="blank"
                                className="fa fa-instagram mx-2 fa-2x"
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="https://twitter.com/"
                                target="blank"
                                className="fa fa-twitter mx-2 fa-2x"
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="https://www.linkedin.com/"
                                target="blank"
                                className="fa fa-linkedin mx-2 fa-2x"
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="https://github.com/"
                                target="blank"
                                className="fa fa-github mx-2 fa-2x"
                            />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse>
                    <Nav className="mx-auto my-3">
                        <Nav.Link href="/">
                            <Nav.Item>
                                <img
                                    alt=""
                                    src={logo}
                                    width="60"
                                    height="60"
                                    className="d-inline-block align-top"
                                />
                            </Nav.Item>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="covid-bar">
                Hope you are staying safe in these Covid Times. #StayHome
                #StaySafe
            </div>
        </div>
    </Styles>
);

export default Footer;
