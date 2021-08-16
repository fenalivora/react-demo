import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import styled from "styled-components";
import coderstory from "../assets/coderstory.png";
import Summary from "./Summary";
import Project from "./Project";
import Certification from "./Certification";
import Language from "./Language";
import Links from "./Links";
import EditProfile from "./EditProfile";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Styles = styled.div`
    .box{
        background: url('${coderstory}');
        background-size: 20%;
        z-index: -2;
    }

    .line {
        width: 33em;
        color: white;
        background: black;
        margin: 0 auto;
        border-right: 2px solid rgba(255, 255, 255, 0.75);
        font-size: 200%;
        text-align: center;
        white-space: nowrap;
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

    .overlay{
        background-color: black;
        opacity: 0.5;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    .image{
        width:10%;
        height:10%;
        margin:auto;
    }

    .cards{
        color: white;
        border-radius: 5px;
    }

    .showcase-text{
        text-align: right;
        vertical-align: bottom;
    }
`;

const Profile = (props) => {
    const history = useHistory();

    const handleSelect = (key) => {
        if (key === "logout") {
            localStorage.removeItem("token");
            props.setLogin(false);
            history.push("/login");
        }
    };

    const [loggedUser, setLoggedUser] = useState({});

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
            setLoggedUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history.push("/login");
        }
        fetchUser();
    }, [history]);

    return (
        <Styles>
            <Container className="my-5">
                <Tabs defaultActiveKey="overview" onSelect={handleSelect}>
                    <Tab eventKey="overview" title="Summary">
                        <Summary loggedUser={loggedUser} />
                    </Tab>
                    <Tab eventKey="projects" title="Projects" id="projects">
                        <Project />
                    </Tab>
                    <Tab eventKey="certifications" title="Certifications">
                        <Certification />
                    </Tab>
                    <Tab eventKey="languages" title="Languages">
                        <Language />
                    </Tab>
                    <Tab eventKey="social" title="Links">
                        <Links />
                    </Tab>
                    <Tab eventKey="edit" title="Edit Profile">
                        <EditProfile />
                    </Tab>
                    <Tab eventKey="logout" title="Log Out" />
                </Tabs>
            </Container>
        </Styles>
    );
};

export default Profile;
