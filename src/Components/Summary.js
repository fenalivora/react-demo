import React, { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import profileimg from "../assets/account.svg";
import copy from "copy-to-clipboard";
import { Modal } from "react-bootstrap";

const Styles = styled.div``;

const Summary = (props) => {
    const [showCopyModal, setShowCopyModal] = useState(false);

    const copyToClipboard = async (text) => {
        copy(text);
        setShowCopyModal(true);
        await new Promise((r) => setTimeout(r, 2000));
        setShowCopyModal(false);
    };

    return (
        <Styles>
            <Modal show={showCopyModal}>
                <Modal.Header>Link Copied to clipboard</Modal.Header>
            </Modal>
            <Container>
                <div className="text-center">
                    <Image
                        className="image my-5"
                        roundedCircle
                        src={profileimg}
                    />
                </div>

                <Row>
                    <Col>
                        <p className="display-4">
                            Hi{" "}
                            {props.loggedUser
                                ? props.loggedUser.user
                                    ? props.loggedUser.user.firstname
                                    : "Name"
                                : "Name"}
                            ,
                        </p>
                    </Col>
                    <Col>
                        <p className="display-4 showcase-text">
                            Showcase{" "}
                            {props.loggedUser ? (
                                props.loggedUser.user ? (
                                    <a
                                        href={
                                            "https://coder-story.herokuapp.com/story/" +
                                            props.loggedUser.user.email
                                        }
                                        target="blank"
                                    >
                                        <Badge variant="warning">here</Badge>
                                    </a>
                                ) : (
                                    <Badge variant="warning">loading</Badge>
                                )
                            ) : (
                                <Badge variant="warning">loading</Badge>
                            )}
                        </p>
                        <p className="showcase-text">
                            {props.loggedUser ? (
                                props.loggedUser.user ? (
                                    <span>
                                        <a
                                            href={
                                                "https://coder-story.herokuapp.com/story/" +
                                                props.loggedUser.user.email
                                            }
                                            target="blank"
                                        >
                                            {"https://coder-story.herokuapp.com/story/" +
                                                props.loggedUser.user.email}
                                        </a>
                                        <i
                                            class="fa fa-clipboard ml-3"
                                            aria-hidden="true"
                                            onClick={() =>
                                                copyToClipboard(
                                                    "https://coder-story.herokuapp.com/story/" +
                                                        props.loggedUser.user
                                                            .email
                                                )
                                            }
                                        />
                                    </span>
                                ) : (
                                    "story/email"
                                )
                            ) : (
                                "story/email"
                            )}
                        </p>
                    </Col>
                </Row>

                <div className="my-5">
                    <Row className="display-4 text-center my-5">
                        <Col
                            style={{ background: "#064789" }}
                            className="mx-4 cards"
                        >
                            <p>
                                Projects <br />
                                {props.loggedUser
                                    ? props.loggedUser.projectCount
                                    : 0}
                            </p>
                        </Col>
                        <Col
                            style={{ background: "#00241B" }}
                            className="mx-4 cards"
                        >
                            <p>
                                Certifications <br />
                                {props.loggedUser
                                    ? props.loggedUser.certificateCount
                                        ? props.loggedUser.certificateCount
                                        : 0
                                    : 0}
                            </p>
                        </Col>
                    </Row>
                    <Row className="display-4 text-center my-5">
                        <Col
                            style={{ background: "#A8763E" }}
                            className="mx-4 cards"
                        >
                            <p>
                                Languages <br />
                                {props.loggedUser
                                    ? props.loggedUser.languageCount
                                    : 0}
                            </p>
                        </Col>
                        <Col
                            style={{ background: "#3C0000" }}
                            className="mx-4 cards"
                        >
                            <p>
                                Profile Views <br />0
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Styles>
    );
};

export default Summary;
