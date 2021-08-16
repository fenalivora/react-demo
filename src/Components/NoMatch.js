import React from 'react';
import { Container } from 'react-bootstrap';
import Jumbotron from './Jumbotron';

const NoMatch = () => (
    <div>
        <Jumbotron/>
    <Container>
    <div className="text-center">
        <h1 className="display-1 my-3">¯\_(ツ)_/¯</h1>
        <h3 className="display-4 my-2">I have nothing with this url to show</h3>
    </div>
    </Container>
    </div>
)

export default NoMatch;