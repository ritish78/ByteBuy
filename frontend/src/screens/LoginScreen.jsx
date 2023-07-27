import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useAuthUserMutation } from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [authUser, { isLoading }] = useAuthUserMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await authUser({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    return (
        <FormContainer>
            <Meta title='Log In - ByteBuy' />
            <h1>Log In</h1>

            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='example@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password: </Form.Label>
                    <div className='password-input'>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
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
                    className='mt-3 px-5'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <> 
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />  
                                {' '}Logging in...
                            </>
                        ) : (
                        <>Log In {' '} <FaSignInAlt /></>
                    )}
                </Button>
          
                
                <Row className='py-3'>
                    <Col>
                        Don't have an account? <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Create an account</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;