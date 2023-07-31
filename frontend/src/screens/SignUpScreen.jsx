import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import SpinnerButton from '../components/SpinnerButton';
import { useRegisterUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
// import { format, parseISO, differenceInYears } from 'date-fns';

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dob, setDob] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const dobChangeHandler = (date) => {
        setDob(date);
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                toast.error('Passwords don\'t match!');
                return;
            }

            // const currentDate = new Date();
            // const selectedDateObj = new Date(dob);
    
            // const diffYears = differenceInYears(currentDate, selectedDateObj);

            // if (diffYears < 17) {
            //     toast.error('User needs to be of age 17 to register for this website!');
            //     return;
            // }

            const res = await registerUser({ name, email, password, confirmPassword, dob }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success(`Registered ${name} succesfully.`);
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }


    return (
        <FormContainer>
            <Meta title='Sign Up - ByteBuy' />
            <h1>Sign Up</h1>

            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='John Doe'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

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

                <Form.Group controlId='confirm-password' className='my-3'>
                    <Form.Label>Confirm Password: </Form.Label>
                    <div className='password-input'>
                        <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        >
                        </Form.Control>
                        <span 
                            className='password-toggle'
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}                        

                        </span>
                    </div>
                </Form.Group>

                <Form.Group controlId='dob' className='my-3'>
                    <Form.Label>Select your date of birth: </Form.Label>
                    <Form.Control
                        type='date'
                        value={dob}
                        onChange={e => dobChangeHandler(e.target.value)}
                    />
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
                                {' '}Registering...
                            </>
                        ) : (
                        <>Sign Up {' '} <FaSignInAlt /></>
                    )}
                </Button>
                
                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In instead</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SignUpScreen;