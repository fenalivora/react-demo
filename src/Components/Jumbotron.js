import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import coderstory from "../assets/coderstory3.png";
import { Link } from "react-router-dom";

const Styles = styled.div`
    .jumbo {
        background: url(${coderstory}) no-repeat bottom;
        background-size: 100%;
        color: white;
        height: 600px;
        position: relative;
        z-index: -2;
    }

    .welcome-tag {
        margin-left: 5%;
        padding-top: 230px;
    }

    .font-weight-custom {
        font-weight: 500;
    }

    .overlay-jumbo {
        background: green;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
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

const Jumbotron = () => (
    <Styles>
        <div className="jumbo">
            <div className="overlay-jumbo"></div>
            <div className="welcome-tag">
                <h1 className="display-3 font-weight-custom">Welcome</h1>
                <h3 className="display-4">
                    Create your story{" "}
                    <Link to="/signup">
                        <Badge variant="warning"> here. </Badge>
                    </Link>
                </h3>
            </div>
        </div>
    </Styles>
);

export default Jumbotron;
