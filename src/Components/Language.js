import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Badge, Modal, Form } from "react-bootstrap";

const Styles = styled.div``;

const AddLanguageModal = (props) => {
    const [languageName, setLanguageName] = useState("");

    const onChange = (e) => {
        setLanguageName(e.target.value);
    };

    const hideModal = () => {
        props.hideModal();
    };

    const addLanguage = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };

        let data = {
            languageName,
        };
        try {
            const response = await axios.post(
                "https://coderstoryapi.herokuapp.com/api/languages",
                data,
                config
            );
            setLanguageName("");
            props.addLanguage(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">
                    Add a Language
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            value={languageName}
                            onChange={onChange}
                            placeholder="Enter Language"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={addLanguage}>
                        Add Language
                    </Button>
                    <Button variant="outline-danger" onClick={hideModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    );
};

const DeleteModal = (props) => {
    const deleteLanguage = async (id) => {
        try {
            await axios.delete(
                "https://coderstoryapi.herokuapp.com/api/languages",
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    data: {
                        id,
                    },
                }
            );
            props.deleteLanguage();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">
                    Delete "{props.singleLanguage.languageName}"?
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="outline-danger"
                        onClick={() => deleteLanguage(props.singleLanguage._id)}
                    >
                        Delete Language
                    </Button>
                    <Button variant="outline-primary" onClick={props.hideModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    );
};

const LanguageCard = (props) => {
    const [showDeleteModal, setDeleteModalVisibitlity] = useState(false);

    const deleteLanguage = () => {
        setDeleteModalVisibitlity(false);
        props.deleteLanguage();
    };

    return (
        <span>
            <Badge variant="warning mr-5 my-2">
                <p className="display-4 px-3">
                    {props.singleLanguage.languageName}
                </p>
                <span
                    className="fa fa-trash"
                    style={{ float: "right" }}
                    onClick={() => setDeleteModalVisibitlity(true)}
                ></span>
                <DeleteModal
                    deleteLanguage={deleteLanguage}
                    show={showDeleteModal}
                    singleLanguage={props.singleLanguage}
                    hideModal={() => setDeleteModalVisibitlity(false)}
                />
            </Badge>
        </span>
    );
};

const Language = () => {
    const [languages, setLanguages] = useState([]);

    const [showLanguageModal, setLanguageModalVisibility] = useState(false);

    async function fetchLanguages() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };

        try {
            const response = await axios.get(
                "https://coderstoryapi.herokuapp.com/api/languages",
                config
            );

            setLanguages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchLanguages();
    }, []);

    const addLanguage = () => {
        setLanguageModalVisibility(false);
        setLanguages([]);
        fetchLanguages();
        window.scrollTo(0, 0);
    };

    return (
        <Styles>
            <p className="display-4 text-center">Languages</p>
            <Button
                variant="outline-primary"
                onClick={() => setLanguageModalVisibility(true)}
            >
                Add a Language
            </Button>
            <br />
            <AddLanguageModal
                show={showLanguageModal}
                addLanguage={addLanguage}
                hideModal={() => setLanguageModalVisibility(false)}
            />
            {languages.map((singleLanguage) => (
                <LanguageCard
                    singleLanguage={singleLanguage}
                    deleteLanguage={addLanguage}
                />
            ))}
            <hr />
            <p className="display-4 text-center my-5">
                Most Popular Languages.
            </p>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <div className="devicon-python-plain-wordmark colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                Python is an interpreted, high-level,
                                general-purpose programming language. Created by
                                Guido van Rossum and first released in 1991,
                                Python's design philosophy emphasizes code
                                readability with its notable use of significant
                                whitespace.Python is dynamically typed and
                                garbage-collected. It supports multiple
                                programming paradigms, including structured
                                (particularly, procedural), object-oriented, and
                                functional programming. Python is often
                                described as a "batteries included" language due
                                to its comprehensive standard library.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="devicon-java-plain-wordmark colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                Java is a general-purpose programming language
                                that is class-based, object-oriented, and
                                designed to have as few implementation
                                dependencies as possible. It is intended to let
                                application developers write once, run anywhere
                                (WORA),meaning that compiled Java code can run
                                on all platforms that support Java without the
                                need for recompilation. Java applications are
                                typically compiled to bytecode that can run on
                                any Java virtual machine (JVM) regardless of the
                                underlying computer architecture.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="devicon-javascript-plain colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                JavaScript, often abbreviated as JS, is a
                                programming language that conforms to the
                                ECMAScript specification. JavaScript is
                                high-level, often just-in-time compiled, and
                                multi-paradigm. It has curly-bracket syntax,
                                dynamic typing, prototype-based
                                object-orientation, and first-class functions.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Styles>
    );
};

export default Language;
