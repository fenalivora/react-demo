import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";

const Styles = styled.div`
    .custom-input {
        font-size: 90%;
    }

    .link-save-icon {
        color: green;
    }

    .custom-modal {
        background-color: red;
    }
`;

const Links = () => {
    const [links, setLinks] = useState({});

    const { linkedin, github, stackoverflow, twitter, codepen } = links;

    const [showSuccessModal, setSuccessModalVisibility] = useState(false);

    async function fetchLinks() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            const response = await axios.get(
                "https://coderstoryapi.herokuapp.com/api/links",
                config
            );

            setLinks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        setLinks({ ...links, [e.target.name]: e.target.value.trim() });
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const languageLogic = async (e) => {
        const linkOrg = e.target.getAttribute("name");
        let data;
        switch (linkOrg) {
            case "linkedin":
                if (typeof linkedin == "undefined" || linkedin === "") {
                    data = { linkedin: " " };
                } else data = { linkedin };
                break;
            case "github":
                if (typeof github == "undefined" || github === "") {
                    data = { github: " " };
                } else data = { github };
                break;
            case "stackoverflow":
                if (
                    typeof stackoverflow == "undefined" ||
                    stackoverflow === ""
                ) {
                    data = { stackoverflow: " " };
                } else data = { stackoverflow };
                break;
            case "twitter":
                if (typeof twitter == "undefined" || twitter === "") {
                    data = { twitter: " " };
                } else data = { twitter };
                break;
            case "codepen":
                if (typeof codepen == "undefined" || codepen === "") {
                    data = { codepen: " " };
                } else data = { codepen };
                break;
            default:
                break;
        }
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            await axios.post(
                "https://coderstoryapi.herokuapp.com/api/links",
                data,
                config
            );
            setSuccessModalVisibility(true);
            await new Promise((r) => setTimeout(r, 2000));
            setSuccessModalVisibility(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <p className="display-4 text-center">Links</p>
            <Modal show={showSuccessModal} size="lg">
                <Modal.Header
                    style={{ backgroundColor: "green", border: "0px" }}
                >
                    <p className="display-4" style={{ color: "white" }}>
                        Successfully updated !!!
                    </p>
                </Modal.Header>
            </Modal>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <div
                                className="fa fa-linkedin-square fa-5x"
                                style={{ color: "#0077b5" }}
                            ></div>
                        </td>
                        <td className="align-middle">
                            <h3>LinkedIn</h3>
                        </td>
                        <td className="align-middle">
                            <h4>
                                <Form className="form-inline">
                                    <kbd>https://www.linkedin.com/in/</kbd>{" "}
                                    <Form.Control
                                        className="mx-2 custom-input"
                                        name="linkedin"
                                        value={linkedin}
                                        onChange={onChange}
                                    />
                                </Form>
                            </h4>
                        </td>
                        <td className="align-middle">
                            <Form.Control
                                as="span"
                                className="fa fa-2x fa-check-square link-save-icon border-0"
                                name="linkedin"
                                onClick={languageLogic}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-github fa-5x"
                                style={{ color: "#211F1F" }}
                            ></div>
                        </td>
                        <td className="align-middle">
                            <h3>GitHub</h3>
                        </td>
                        <td className="align-middle">
                            <h4>
                                <Form className="form-inline">
                                    <kbd>https://github.com/</kbd>{" "}
                                    <Form.Control
                                        className="mx-2 custom-input"
                                        name="github"
                                        value={github}
                                        onChange={onChange}
                                    />
                                </Form>
                            </h4>
                        </td>
                        <td className="align-middle">
                            <Form.Control
                                as="span"
                                className="fa fa-2x fa-check-square link-save-icon border-0"
                                name="github"
                                onClick={languageLogic}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-stack-overflow fa-5x"
                                style={{ color: "#f48024" }}
                            ></div>
                        </td>
                        <td className="align-middle">
                            <h3>
                                stack <b>overflow</b>
                            </h3>
                        </td>
                        <td className="align-middle">
                            <h4>
                                <Form className="form-inline">
                                    <kbd>https://stackoverflow.com/users/</kbd>{" "}
                                    <Form.Control
                                        className="mx-2 custom-input"
                                        name="stackoverflow"
                                        value={stackoverflow}
                                        onChange={onChange}
                                    />
                                </Form>
                            </h4>
                        </td>
                        <td className="align-middle">
                            <Form.Control
                                as="span"
                                className="fa fa-2x fa-check-square link-save-icon border-0"
                                name="stackoverflow"
                                onClick={languageLogic}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-twitter fa-5x"
                                style={{ color: "#1DA1F2" }}
                            ></div>
                        </td>
                        <td className="align-middle">
                            <h3>Twitter</h3>
                        </td>
                        <td className="align-middle">
                            <h4>
                                <Form className="form-inline">
                                    <kbd>https://twitter.com/</kbd>{" "}
                                    <Form.Control
                                        className="mx-2 custom-input"
                                        name="twitter"
                                        value={twitter}
                                        onChange={onChange}
                                    />
                                </Form>
                            </h4>
                        </td>
                        <td className="align-middle">
                            <Form.Control
                                as="span"
                                className="fa fa-2x fa-check-square link-save-icon border-0"
                                name="twitter"
                                onClick={languageLogic}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-codepen fa-5x"
                                style={{ color: "#FF3C41" }}
                            ></div>
                        </td>
                        <td className="align-middle">
                            <h3>CodePen</h3>
                        </td>
                        <td className="align-middle">
                            <h4>
                                <Form className="form-inline">
                                    <kbd>https://codepen.io/</kbd>{" "}
                                    <Form.Control
                                        className="mx-2 custom-input"
                                        name="codepen"
                                        value={codepen}
                                        onChange={onChange}
                                    />
                                </Form>
                            </h4>
                        </td>
                        <td className="align-middle">
                            <Form.Control
                                as="span"
                                className="fa fa-2x fa-check-square link-save-icon border-0"
                                name="codepen"
                                onClick={languageLogic}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Styles>
    );
};

export default Links;
