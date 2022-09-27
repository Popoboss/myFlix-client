import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import '/.registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(username);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="'formBasicUsername'">
                <Form.Label>
                    Username:
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        required
                        minLength="4"
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                    {' '}
                    Password:
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                        minLength="8"
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                    Email:
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email"
                        required
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthday">
                <Form.Label>
                    Birthdate:
                    <Form.Control
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        placeholder="enter your birthday"
                        required
                    />
                </Form.Label>
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>
                Register
            </Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};
