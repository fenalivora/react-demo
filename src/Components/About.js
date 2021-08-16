import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Jumbotron from "./Jumbotron";
import { Container } from "react-bootstrap";

const Styles = styled.div`
  .size-m {
    font-size: 100%;
  }

  .overlay {
    background-color: black;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .text-custom{
    font-family: 'Helvetica';
    font-size: 110%;
  }
`;
const About = () => (
  <Styles>
    <Jumbotron/>
    <Container>
    <Form>
      <Form.Row className="my-5">
        <Col xs={7}>
          <h1 className="display-3 my-4">We are CoderStory</h1>
        </Col>
        <Col>
          <p className="text-custom">
            We felt that with all the other portfolio options out there, an
            urgent need for a portfolio exclusively for tech people was
            required. Our vision with CoderStory is to create a powerful yet
            minimalistic tool to create your portfolio by just adding the
            essesntial stuff and avoiding all extra unnecessary ingredients.
          </p>
        </Col>
      </Form.Row>
    </Form>
    </Container>
  </Styles>
);

export default About;
