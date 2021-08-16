import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ImageUploader from "react-images-upload";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Styles = styled.div`
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

const uploadButtonStyle = {
    background: "#ffc107",
    color: "black",
    fontWeight: "bold",
    borderRadius: "5px",
};

const uploadLabelStyle = {
    fontSize: "20px",
};

function Signup(props) {
    //const [picture, setPicture] = useState();

    const [formData, setFormData] = useState({});

    const history = useHistory();

    const {
        firstname,
        lastname,
        email,
        password,
        cpass,
        phone,
        city,
        province,
        country,
    } = formData;

    const onUpload = (picture) => {
        //setPicture(picture);
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addUser = async (e) => {
        e.preventDefault();

        if (password !== cpass) {
            document.getElementById("wrong-credentials").style.visibility =
                "visible";
            return;
        }

        let data = {
            firstname,
            lastname,
            email,
            password,
            phone,
            city,
            province,
            country,
        };
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post(
                "https://coderstoryapi.herokuapp.com/api/users",
                data,
                config
            );
            localStorage.setItem("token", response.data.token);
            props.setLogin(true);
            history.push("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <Styles>
            <Container className="main-content">
                <h1 className="display-3">
                    Glad to see you <Badge variant="warning"> create </Badge>{" "}
                    your story.
                </h1>
                <hr />
                <Form className="my-5" method="POST" onSubmit={addUser}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                placeholder="Enter First Name"
                                name="firstname"
                                value={firstname}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                placeholder="Enter Last Name"
                                name="lastname"
                                value={lastname}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter Phone"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter Password"
                                name="cpass"
                                value={cpass}
                                onChange={onChange}
                                required
                            />
                            <Form.Text
                                className="text-danger"
                                id="wrong-credentials"
                                style={{ visibility: "hidden" }}
                            >
                                Password and Confirm password aren't matching
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                placeholder="Enter City"
                                name="city"
                                value={city}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Province</Form.Label>
                            <Form.Control
                                placeholder="Enter Province"
                                name="province"
                                value={province}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                placeholder="Enter Country"
                                name="country"
                                value={country}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                    </Form.Row>

                    <ImageUploader
                        className="my-5"
                        singleImage="true"
                        withPreview="true"
                        label="Only image extentions accepted 😉"
                        buttonStyles={uploadButtonStyle}
                        buttonText="Upload Profile Picture"
                        onChange={onUpload}
                        labelStyles={uploadLabelStyle}
                        imgExtension={[".jpg", ".png", ".jpeg"]}
                        maxFileSize={15000000}
                    />
                    <Button
                        variant="primary"
                        className="font-weight-bold my-5"
                        block
                        type="submit"
                        onClick={addUser}
                    >
                        Create my story
                    </Button>
                    <Form.Text className="text-muted text-center">
                        Already having a story with us?
                    </Form.Text>
                    <hr />
                    <Link to="/login" className="no-decor-link">
                        <Button
                            variant="warning"
                            className="my-5 font-weight-bold"
                            block
                        >
                            Login
                        </Button>
                    </Link>
                </Form>
            </Container>
        </Styles>
    );
}

export default Signup;
