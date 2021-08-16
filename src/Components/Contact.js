import React from "react";
import Badge from "react-bootstrap/Badge";
import styled from "styled-components";
import Jumbotron from "./Jumbotron";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Styles = styled.div`
    .line {
        width: 3em;
        border-right: 2px solid rgba(255, 255, 255, 0.75);
        white-space: nowrap;
        overflow: hidden;
        transform: translateY(-50%);
    }

    .custom-margin {
        margin: 8% 0px;
    }

    .anim-typewriter {
        animation: typewriter 1s steps(50) 1s 1 normal both,
            blinkTextCursor 500ms steps(50) infinite normal;
    }

    @keyframes typewriter {
        from {
            width: 0;
        }
        to {
            width: 3em;
        }
    }

    @keyframes blinkTextCursor {
        from {
            border-right-color: rgba(0, 0, 0, 0.75);
        }
        to {
            border-right-color: transparent;
        }
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
const Contact = () => (
    <Styles>
        <Jumbotron />
        <Container>
            <div>
                <p className="display-4 custom-margin">
                    If you need{" "}
                    <Link to="/signup" className="no-decor-link">
                        {" "}
                        <Badge variant="warning"> us </Badge>{" "}
                    </Link>
                    , we are always here.
                </p>
                <br />
                <br />
                <br />
                <h3>
                    <p className="line anim-typewriter">&nbsp;FAQs</p>
                </h3>
                <ol>
                    <li className="h3 my-3">
                        How to link my github profile with CoderStory?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    After you log in, you can go to social
                                    profiles, find GitHub and then add your
                                    username to connect your CoderStory to
                                    GitHub.
                                </em>
                            </li>
                        </ul>
                    </li>
                    <li className="h3 my-3">
                        How to create an effective portofolio for IT?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    This is a very open-ended discussion, hence
                                    we are providing some valuable links, which
                                    you can refer for creating an effetctive
                                    Tech portfolio.
                                </em>
                            </li>
                        </ul>
                    </li>
                    <li className="h3 my-3">
                        What things shall I include in the project?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    Take all the major projects done by you and
                                    prioritize them. However, comparetively
                                    smaller projects should be listed after the
                                    major ones.
                                </em>
                            </li>
                        </ul>
                    </li>
                    <li className="h3 my-3">
                        Shall I only list out my strongest skills?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    You can add all the different skills you
                                    know, but you shall start with placing you
                                    strongest skills.
                                </em>
                            </li>
                        </ul>
                    </li>
                    <li className="h3 my-3">
                        Do I need a physical portfolio aswell?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    That is not required but surely preferred,
                                    as you can showcase all your projects on a
                                    digital portfolio because, nowadays, mostly
                                    in interviews they use online portfolios.
                                </em>
                            </li>
                        </ul>
                    </li>
                    <li className="h3 my-3">
                        Should I keep my projects created with not so popular
                        technologies?
                        <ul>
                            <li>
                                <em className="h5 font-weight-light">
                                    You may, if you want, as experiance always
                                    counts. But preferably you should keep your
                                    projects with the latest tech on the top, as
                                    it gives out that you are updated with the
                                    tech.
                                </em>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </Container>
    </Styles>
);

export default Contact;
