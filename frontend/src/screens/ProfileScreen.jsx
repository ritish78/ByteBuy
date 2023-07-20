import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Table, Col, Row, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import SpinnerGif from '../components/SpinnerGif';
import SpinnerButton from '../components/SpinnerButton';
import { toast } from 'react-toastify';
import { useUpdateUserProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateUserProfile, { isLoading: isUpdateProfileLoading }] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const showPasswordFields = () => {
        setChangePassword(!changePassword);
        if (changePassword) {
            setPassword('');
            setConfirmPassword('');
        }
    } 

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password do not match!');
            return;
        }

        try {
            const res = await updateUserProfile({ _id: userInfo._id, name, email, password }).unwrap();
            dispatch(setCredentials(res));
            toast.success('Profile updated!');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h3>{userInfo.name}'s Profile</h3>
                
                <Form onSubmit={formSubmitHandler}>
                    <FormGroup controlId='name' className='my-2'>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your full name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='email' className='my-2'>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your email address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup control='changePassword' className='my-4 mx-3'>
                        <Form.Check
                            type='switch'
                            label='Change Password?'
                            onChange={showPasswordFields}
                        >

                        </Form.Check>
                    </FormGroup>
                    
                    {
                        changePassword && (
                            <>
                                <FormGroup controlId='password' className='my-2'>
                                    <Form.Label>Password: </Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Set a password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='confirmPassword' className='my-2'>
                                    <Form.Label>Confirm Password: </Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm your above password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>
                            </>
                        )
                    }

                    <Button
                        variant='primary'
                        type='submit'
                        className='my-3 w-100'
                    >
                        {isUpdateProfileLoading ? (<> <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />  Updating your profile...</>
                            ) : (
                            <>Update info</>
                        )}
                    </Button>
                    {/* {
                        isUpdateProfileLoading ? (
                            <SpinnerButton message='Updating your profile' />
                        ) : (
                            <Button
                                variant='primary'
                                type='submit'
                                className='my-3 w-100'
                            >Update Info</Button>
                        )
                    } */}
                </Form>
            </Col>
            <Col md={9}>
                COLUMN 2
            </Col>
        </Row>
    )
}

export default ProfileScreen