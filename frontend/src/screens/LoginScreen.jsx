import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        alert('Form Submitted!');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormContainer>
            <h1>Log In</h1>

            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='example@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password: </Form.Label>
                    <div className='password-input'>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        >
                        </Form.Control>
                        <span 
                            className='password-toggle'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}                        

                        </span>
                    </div>
                </Form.Group>

                <Button 
                    type='submit'
                    variant='primary'
                    className='mt-3'
                >
                    Log In
                </Button>

                <Row className='py-3'>
                    <Col>
                        Don't have an account? <Link to='/signup'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;