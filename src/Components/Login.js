import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Styles = styled.div`
    .form-login {
        width: 50%;
        margin: auto;
    }

    .main-content {
        margin-bottom: 10%;
        margin-top: 5%;
    }

    .no-decor-link {
        text-decoration: none;

        &:focus,
        &:hover,
        &:visited,
        &:link,
        &:active {
            text-decoration: none;
        }
    }
`;

const Login = (props) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showError, setShowError] = useState(false);

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const loginClicked = async (e) => {
        e.preventDefault();

        let data = {
            email,
            password,
        };
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.put(
                "https://coderstoryapi.herokuapp.com/api/users",
                data,
                config
            );
            localStorage.setItem("token", response.data.token);
            props.setLogin(true);
            history.push("/profile");
        } catch (error) {
            setShowError(true);
            console.log(error);
        }
    };

    useEffect(() => window.scrollTo(0, 0));

    return (
        <Styles>
            <Container className="main-content">
                <h1 className="display-3 my-5 text-center">
                    {" "}
                    Welcome Back <Badge variant="warning">Coder</Badge>
                </h1>
                <hr />
                <div className="form-login my-5">
                    <Form onSubmit={loginClicked}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                                Because that's how we load your unique story.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                            />
                            <Form.Text
                                className="text-danger"
                                hidden={!showError}
                            >
                                We can't find you with this credentials, you
                                might want to try checking your details.
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            block
                            className="my-5 font-weight-bold"
                        >
                            Login
                        </Button>
                        <Form.Text className="text-muted text-center">
                            Not having a story with us?
                        </Form.Text>
                    </Form>
                    <hr />
                    <Link to="/signup" className="no-decor-link">
                        <Button
                            variant="warning"
                            type="submit"
                            className="my-5 font-weight-bold"
                            block
                        >
                            Create a Story
                        </Button>
                    </Link>
                </div>
            </Container>
        </Styles>
    );
};

export default Login;
