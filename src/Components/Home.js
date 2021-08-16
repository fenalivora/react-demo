import React from "react";
import Card from "react-bootstrap/Card";
import project from "../assets/project.jpg";
import languages from "../assets/languages.png";
import certified from "../assets/certified.png";
import CardDeck from "react-bootstrap/CardDeck";
import Badge from "react-bootstrap/Badge";
import styled from "styled-components";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Jumbotron from "./Jumbotron";
import { Container } from "react-bootstrap";

const Styles = styled.div`
    .size-m {
        font-size: 100%;
    }

    .home-text {
        font-family: "Helvetica";
        font-size: 120%;
        text-align: center;
    }
`;

const Home = () => (
    <Styles>
        <div>
            <Jumbotron />
            {/* <div className="box p-4">
                <div className="overlay"></div>
                <p className="line anim-typewriter my-5">
                    A portfolio for a Coder by a Coder ; printf("%s Rule
                    World!", "Coders");
                </p>
            </div> */}

            <Container>
                <div className="my-5 home-text">
                    CoderStory is a platform where we give an opportunity to the
                    people working in IT, to create their portfolio online. We
                    have seen a lot of websites which provides the same service,
                    but we are different. We have built a seperate platform for
                    all our coders who can create their own story through our
                    medium and showcase it to the outer world. This is a
                    specific place to find portfolios for none other than IT
                    specialists. This website is our way to give a shoutout to
                    every single coder in the world to make their life easy,
                    fast and reliable. We believe CoderStory will keep the jobs
                    alive in this pandemic scenario.
                </div>

                <h1 className="display-3 text-center">Features</h1>
                <CardDeck>
                    <Card style={{ width: "18rem" }} className="my-5">
                        <Accordion>
                            <Card.Img variant="top" src={languages} />
                            <Card.Body>
                                <Card.Title>Add Languages</Card.Title>
                                <Card.Text>
                                    Add your favourite languages to your
                                    profile. Choose from the wide options we
                                    provide or if we don't have a language you
                                    want to add, then feel free to add custom as
                                    well.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                Click{" "}
                                <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="0"
                                >
                                    <Badge className="size-m" variant="warning">
                                        {" "}
                                        here{" "}
                                    </Badge>
                                </Accordion.Toggle>
                                to know more.
                            </Card.Footer>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ul>
                                        <li>Python</li>
                                        <li>Java</li>
                                        <li>C++</li>
                                        <li>Kotlin</li>
                                        <li>Go</li>
                                        <li>JS</li>
                                        <li>And many more</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                    </Card>
                    <Card style={{ width: "18rem" }} className="my-5">
                        <Accordion>
                            <Card.Img variant="top" src={project} />
                            <Card.Body>
                                <Card.Title>Add Projects</Card.Title>
                                <Card.Text>
                                    Add your amazing projects to showcase your
                                    passion towards development. You can even
                                    add team members to your project if they
                                    also have their story setup with CoderStory.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                Click{" "}
                                <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="1"
                                >
                                    <Badge className="size-m" variant="warning">
                                        {" "}
                                        here{" "}
                                    </Badge>
                                </Accordion.Toggle>
                                to know more.
                            </Card.Footer>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ul>
                                        <li>Android</li>
                                        <li>MERN / MEAN</li>
                                        <li>iOS</li>
                                        <li>Flutter</li>
                                        <li>System Admin</li>
                                        <li>Networking</li>
                                        <li>And many more</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                    </Card>
                    <Card style={{ width: "18rem" }} className="my-5">
                        <Accordion>
                            <Card.Img variant="top" src={certified} />
                            <Card.Body>
                                <Card.Title>Add Certifications</Card.Title>
                                <Card.Text>
                                    Got some awesome certifications? Woah, add
                                    them and showcase it in your story. We have
                                    some of the popular companies in IT
                                    certifications already added to the list,
                                    feel free to add others.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                Click{" "}
                                <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="2"
                                >
                                    <Badge className="size-m" variant="warning">
                                        {" "}
                                        here{" "}
                                    </Badge>
                                </Accordion.Toggle>
                                to know more.
                            </Card.Footer>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <ul>
                                        <li>AWS</li>
                                        <li>Oracle</li>
                                        <li>Microsoft</li>
                                        <li>IBM</li>
                                        <li>PMP</li>
                                        <li>Cisco</li>
                                        <li>And many more</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                    </Card>
                </CardDeck>
            </Container>
        </div>
    </Styles>
);

export default Home;
