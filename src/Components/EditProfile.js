import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Toast } from "react-bootstrap";

const Styles = styled.div`
    .custom-save {
        float: right;
    }
`;

const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        city: "",
        province: "",
        country: "",
    });

    const [showUpdateToast, setUpdateToastVisibitity] = useState(false);

    const { firstname, lastname, email, city, province, country } = formData;

    async function fetchUser() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            const response = await axios.get(
                "https://coderstoryapi.herokuapp.com/api/users",
                config
            );
            const loggedUser = response.data.user;
            setFormData({
                firstname: loggedUser.firstname,
                lastname: loggedUser.lastname,
                email: loggedUser.email,
                city: loggedUser.city,
                province: loggedUser.province,
                country: loggedUser.country,
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const saveUser = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        let data = {
            firstname,
            lastname,
            email,
            city,
            province,
            country,
        };
        try {
            const response = await axios.patch(
                "https://coderstoryapi.herokuapp.com/api/users",
                data,
                config
            );
            const loggedUser = response.data;
            setFormData({
                firstname: loggedUser.firstname,
                lastname: loggedUser.lastname,
                email: loggedUser.email,
                city: loggedUser.city,
                province: loggedUser.province,
                country: loggedUser.country,
            });
            setUpdateToastVisibitity(true);
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Styles>
            <p className="display-4 text-center">Edit Profile</p>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <p>First Name</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control
                                    value={firstname}
                                    name="firstname"
                                    onChange={onChange}
                                />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Last Name</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control
                                    value={lastname}
                                    name="lastname"
                                    onChange={onChange}
                                />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Email</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control disabled value={email} />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>City</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control
                                    value={city}
                                    name="city"
                                    onChange={onChange}
                                />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Province</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control
                                    value={province}
                                    name="province"
                                    onChange={onChange}
                                />
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Country</p>
                        </td>
                        <td>
                            <p>
                                <Form.Control
                                    value={country}
                                    name="country"
                                    onChange={onChange}
                                />
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button
                variant="outline-primary"
                className="custom-save"
                onClick={saveUser}
            >
                Save Changes
            </Button>
            <Toast
                onClose={() => setUpdateToastVisibitity(false)}
                show={showUpdateToast}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="mr-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Your details are updated successfully.</Toast.Body>
            </Toast>
            <div style={{ clear: "both" }}></div>
        </Styles>
    );
};

export default EditProfile;
