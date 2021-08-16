import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import coderstory from "../assets/coderstory.png";
import {
    Row,
    Col,
    Badge,
    Accordion,
    Button,
    Card,
    OverlayTrigger,
    Nav,
} from "react-bootstrap";
import moment from "moment";

const Styles = styled.div`
    .box{
        background: url('${coderstory}');
        background-size: 20%;
        height: 20em;
    }

    .line {
        width: 33em;
        color: white;
        background: black;
        border-right: 2px solid rgba(255, 255, 255, 0.75);
        font-size: 200%;
        text-align: center;
        white-space: nowrap;
        margin: auto;
        overflow: hidden;
        transform: translateY(-50%);
    }

    .anim-typewriter {
        animation: typewriter 7s steps(50) 1s 1 normal both,
            blinkTextCursor 500ms steps(50) infinite normal;
    }

    @keyframes typewriter {
        from {
            width: 0;
        }
        to {
            width: 33em;
        }
    }

    @keyframes blinkTextCursor {
        from {
            border-right-color: rgba(255, 255, 255, 0.75);
        }
        to {
            border-right-color: transparent;
        }
    }

    .no-bold{
        font-weight: normal;
    }

    .certificates-div{
        margin: 1em 10em;
    }

    .certificates-title{
        font-size: 3em;
    }

    .tooltip-card{
        background-color: black;
        color: white;
        border-radius: 20px;
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

const Story = (props) => {
    const { params } = props.routeProps.match;

    const storyState = Object.freeze({ LOADING: 0, NOT_FOUND: 1, FOUND: 2 });

    const [story, setStory] = useState({});

    const [firstname, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [linkedin, setlinkedin] = useState();
    const [github, setgithub] = useState();
    const [twitter, settwitter] = useState();
    const [stackoverflow, setstackoverflow] = useState();
    const [codepen, setcodepen] = useState();
    const [languages, setlanguages] = useState();
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const [isStory, setIsStory] = useState(storyState.LOADING);

    const setDetails = useCallback(async () => {
        if (story.user) {
            console.log("Hello");
            setFirstName(story.user.firstname + " " + story.user.lastname);
            setEmail(story.user.email);
            setAddress(
                story.user.city +
                    ", " +
                    story.user.province +
                    ", " +
                    story.user.country
            );

            if (story.user.linkedin) {
                if (story.user.linkedin !== " ")
                    setlinkedin(story.user.linkedin);
            }
            if (story.user.github) {
                if (story.user.github !== " ") setgithub(story.user.github);
            }
            if (story.user.stackoverflow) {
                if (story.user.stackoverflow !== " ")
                    setstackoverflow(story.user.stackoverflow);
            }
            if (story.user.twitter) {
                if (story.user.twitter !== " ") settwitter(story.user.twitter);
            }
            if (story.user.codepen) {
                if (story.user.codepen !== " ") setcodepen(story.user.codepen);
            }
        }
        setlanguages(story.languages);
        setProjects(story.projects);
        setCertificates(story.certificates);
    }, [story.certificates, story.languages, story.projects, story.user]);

    useEffect(() => {
        async function fetchStory() {
            try {
                const response = await axios.get(
                    "https://coderstoryapi.herokuapp.com/api/story/" +
                        params.email
                );
                setStory(response.data);
                setDetails();
                setIsStory(storyState.FOUND);
            } catch (error) {
                setIsStory(storyState.NOT_FOUND);
                console.log(error);
            }
        }
        fetchStory();
    }, [params.email, setDetails, storyState.FOUND, storyState.NOT_FOUND]);

    /*useEffect(() => {
        setDetails();
    }, [story, setDetails]);

    useEffect(() => {
        setDetails();
    }, [projects, setDetails]);

    useEffect(() => {
        setDetails();
    }, [certificates]);*/

    useEffect(() => {
        setDetails();
    }, [setDetails]);

    return (
        <Styles>
            <div className="box p-4">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="line anim-typewriter my-5 text-center">
                    A portfolio for a Coder by a Coder ; printf("%s Rule
                    World!", "Coders");
                </p>
            </div>

            {
                {
                    [storyState.LOADING]: <Loading />,
                    [storyState.NOT_FOUND]: <NotFound email={email} />,
                    [storyState.FOUND]: (
                        <FoundStory
                            email={email}
                            firstname={firstname}
                            address={address}
                            linkedin={linkedin}
                            github={github}
                            stackoverflow={stackoverflow}
                            twitter={twitter}
                            codepen={codepen}
                            languages={languages}
                            projects={projects}
                            certificates={certificates}
                        />
                    ),
                }[isStory]
            }
            <hr className="mx-5 mt-5 p-5" />
            <div className="text-center m-5" style={{ fontSize: "25px" }}>
                <br />
                <br />
                Are you in IT space? You too can create your story{" "}
                <Nav.Link href="/signup">
                    <Badge variant="warning">here.</Badge>
                </Nav.Link>
            </div>
        </Styles>
    );
};

const Loading = () => {
    return (
        <h1 className="my-5 text-center display-1">
            <Badge variant="warning">Story</Badge> Loading !!
        </h1>
    );
};

const NotFound = (props) => {
    return (
        <div className="my-5 text-center">
            <h1 className="my-3 display-1">¯\_(ツ)_/¯</h1>
            <h1 className="my-3 display-1">
                Story <Badge variant="warning">not</Badge> found for{" "}
                {props.email} !!
            </h1>
            <br />
            <br />
            <div className="display-4">
                You might want to check the email in the URL.
            </div>
        </div>
    );
};

const FoundStory = (props) => {
    return (
        <div>
            <h1 className="my-5 text-center display-1">
                Story of <Badge variant="warning">{props.firstname}</Badge>
            </h1>
            <Row className="m-5 h2 no-bold">
                <Col>
                    <a href={"mailto:" + props.email}>{props.email}</a>
                </Col>
                <Col className="text-center">{props.address}</Col>
                <Col className="text-right">
                    {props.linkedin ? (
                        <a
                            href={
                                "https://www.linkedin.com/in/" + props.linkedin
                            }
                            target="blank"
                            className="no-decor-link mx-3"
                            style={{ color: "#0077b5" }}
                        >
                            <span className="fa fa-linkedin"></span>
                        </a>
                    ) : (
                        ""
                    )}
                    {props.github ? (
                        <a
                            href={"https://github.com/" + props.github}
                            target="blank"
                            className="no-decor-link mx-3"
                            style={{ color: "#211F1F" }}
                        >
                            <span className="fa fa-github"></span>
                        </a>
                    ) : (
                        ""
                    )}
                    {props.stackoverflow ? (
                        <a
                            href={
                                "https://stackoverflow.com/users/" +
                                props.stackoverflow
                            }
                            target="blank"
                            className="no-decor-link mx-3"
                            style={{ color: "#f48024" }}
                        >
                            <span className="fa fa-stack-overflow"></span>
                        </a>
                    ) : (
                        ""
                    )}
                    {props.twitter ? (
                        <a
                            href={"https://twitter.com/" + props.twitter}
                            target="blank"
                            className="no-decor-link mx-3"
                            style={{ color: "#1DA1F2" }}
                        >
                            <span className="fa fa-twitter"></span>
                        </a>
                    ) : (
                        ""
                    )}
                    {props.codepen ? (
                        <a
                            href={"https://codepen.io/" + props.codepen}
                            target="blank"
                            className="no-decor-link mx-3"
                            style={{ color: "#FF3C41" }}
                        >
                            <span className="fa fa-codepen"></span>
                        </a>
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
            <hr className="mx-5" />
            <div className="mx-5">
                <div className="mx-5 display-4 mb-5 text-center">
                    {props.languages
                        ? props.languages
                              .split(",")
                              .map((singleLanguage) => (
                                  <Badge variant="info m-3">
                                      {singleLanguage}
                                  </Badge>
                              ))
                        : "No Languages Available"}
                </div>
            </div>
            <hr className="mx-5" />
            <h1 className="my-5 text-center display-3">
                What did {props.firstname} made so far..
            </h1>
            <Accordion className="my-5">
                {props.projects ? (
                    props.projects.map((singleProject, index) => (
                        <div>
                            <Card
                                style={{
                                    width: "35rem",
                                    margin: "auto",
                                }}
                                className="my-5"
                            >
                                <Card.Header className="text-center">
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey={index}
                                    >
                                        <p className="h2">
                                            {singleProject.title}
                                        </p>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <Card.Body>
                                        {singleProject.description}
                                        <br />
                                        <br />
                                        <p className="h2 text-center">
                                            {singleProject.tech
                                                .split(",")
                                                .map((singleTech) => (
                                                    <Badge
                                                        variant="warning"
                                                        className="mx-1"
                                                    >
                                                        {singleTech}
                                                    </Badge>
                                                ))}
                                        </p>
                                        <p className="my-3 text-center h2">
                                            <a
                                                href={singleProject.link}
                                                target="blank"
                                            >
                                                View Project
                                            </a>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </div>
                    ))
                ) : (
                    <i>No Projects Available So far</i>
                )}
            </Accordion>
            <div
                style={{ clear: "both", paddingBottom: "20px" }}
                className="my-5"
            />
            <hr className="mx-5" />
            <h1 className="my-5 text-center display-3">
                What does {props.firstname} proudly own..
            </h1>
            <div className="certificates-div my-3 pb-5">
                {props.certificates ? (
                    props.certificates.map((singleCertificate) => (
                        <div style={{ paddingBottom: "20px" }}>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom-start"
                                overlay={
                                    <div
                                        className="tooltip-card"
                                        style={{
                                            backgroundColor: "black",
                                            color: "white",
                                            borderRadius: "20px",
                                            padding: "1em",
                                        }}
                                    >
                                        Certificate Id:{" "}
                                        {singleCertificate.CertificateId} <br />{" "}
                                        Certificate Validity:{" "}
                                        {moment(
                                            singleCertificate.CertificateExpDate
                                        )
                                            .utcOffset("+0000")
                                            .format("MMMM Do YYYY") ===
                                        "Invalid date"
                                            ? "Always"
                                            : moment(
                                                  singleCertificate.CertificateExpDate
                                              )
                                                  .utcOffset("+0000")
                                                  .format("MMMM Do YYYY")}
                                    </div>
                                }
                            >
                                <div className="certificates-title my-3">
                                    {singleCertificate.CertificateName} by{" "}
                                    <Badge variant="warning">
                                        {singleCertificate.CertificateProvider}
                                    </Badge>
                                </div>
                            </OverlayTrigger>
                        </div>
                    ))
                ) : (
                    <i>No Certifications Available so far</i>
                )}
            </div>
            <div className="text-center m-5" style={{ fontSize: "40px" }}>
                <span role="img" aria-label="Thank You">
                    🙏
                </span>
            </div>
            <div className="text-center m-5" style={{ fontSize: "25px" }}>
                Thank you for reading. Hope you liked this coder's story. Want
                to share some exciting opportunity or feedback regarding the
                story with the coder? You can contact the coder at{" "}
                {<a href={"mailto:" + props.email}>{props.email}</a>}.
            </div>
        </div>
    );
};

export default Story;
