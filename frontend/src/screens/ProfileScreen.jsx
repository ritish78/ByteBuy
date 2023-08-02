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
import { useGetCurrentUserOrdersQuery } from '../slices/ordersApiSlice';
import { useGetShippingAddressOfCurrentUserQuery } from '../slices/addressApiSlice';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Meta from '../components/Meta';
import { useGetUserProfileQuery } from '../slices/authApiSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    // const { data: userInfo } = useGetUserProfileQuery();
    console.log(userInfo);

    const [updateUserProfile, { isLoading: isUpdateProfileLoading }] = useUpdateUserProfileMutation();
    const { data: ordersOfCurrentUser, isLoading: isOrdersLoading, error: errorOrder } = useGetCurrentUserOrdersQuery({ pageNumber: 1 });
    const { data: userAddress, isLoading: isAddressLoading } = useGetShippingAddressOfCurrentUserQuery();

    let sortedOrders = [];
    if (ordersOfCurrentUser) {
        if (ordersOfCurrentUser.orders.length > 1) {
            sortedOrders = [...ordersOfCurrentUser.orders].sort((order, nextOrder) => new Date(nextOrder.createdAt) - new Date(order.createdAt))
        } else {
            sortedOrders = ordersOfCurrentUser.orders;
        }
    }

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setDob(userInfo.dob.substring(0, 10));
        }
    }, [userInfo]);

    const showPasswordFields = () => {
        setChangePassword(!changePassword);
        if (changePassword) {
            setPassword('');
            setConfirmPassword('');
        }
    } 

    const dobChangeHandler = (date) => {
        setDob(date);
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password do not match!');
            return;
        }

        try {
            const res = await updateUserProfile({ _id: userInfo._id, name, email, password, dob }).unwrap();
            dispatch(setCredentials(res));
            toast.success('Profile updated!');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <Row>
            <Meta title='Your profile - ByteBuy' />
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
                            required
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='email' className='my-2'>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your email address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        ></Form.Control>
                    </FormGroup>

                    <Form.Group controlId='dob' className='my-3'>
                        <Form.Label>Your date of birth: </Form.Label>
                        <Form.Control
                            type='date'
                            value={dob}
                            onChange={e => dobChangeHandler(e.target.value)}
                        />
                    </Form.Group>

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
                                        required
                                    ></Form.Control>
                                </FormGroup>

                                <FormGroup controlId='confirmPassword' className='my-2'>
                                    <Form.Label>Confirm Password: </Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm your above password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
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
            <Col md={9} className='ml-3'>
                <Row>
                    <h3>Your address:</h3>
                    {
                        isAddressLoading ? (
                            <SpinnerGif />
                        ) : userAddress ? (
                            <Message variant='info'>
                                <p>
                                    {userAddress.apartmentNumber}/{userAddress.street}{' '}
                                    {userAddress.city} {userAddress.state} {userAddress.postalCode}, {userAddress.country}
                                </p>

                                <Link to='/address'>Change address?</Link>
                            </Message>
                        ) : (
                            <Message variant='warning'>
                                <p>
                                    Looks like you haven't added your shipping address.
                                </p>
                                <Link to='/address'>Add address.</Link>
                            </Message>
                        )
                    }
                </Row>
                <Row className='my-2'>
                    <h3>Your orders:</h3>
                    {
                        isOrdersLoading ? (
                            <SpinnerGif />
                        ) : errorOrder ? (
                            <Message variant='danger'>
                                { errorOrder?.data?.message || errorOrder.error}
                            </Message>
                        ) : ordersOfCurrentUser.length === 0 ? (
                            <Message variant='warning'>
                                <p>Looks like you don't have any orders. Browse products and order them now!</p>
                                <Link to='/'>Browse products.</Link>
                            </Message>
                        ) : (
                            <>
                                <Table striped hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Delivered</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { sortedOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{formatDate(order.createdAt, false)}</td>
                                                <td>${order.totalPrice}</td>
                                                <td>
                                                    {order.isPaid ? (
                                                        formatDate(order.paidAt, false)
                                                    ) : (
                                                        <FaTimes style={{ color: 'red' }} />
                                                    )}
                                                </td>

                                                <td>
                                                    {order.isDelivered ? (
                                                            formatDate(order.deliveredAt, false)
                                                    ) : (
                                                        <FaTimes style={{ color: 'red' }} />
                                                    )}
                                                </td>
                                                
                                                <td>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button className='btn-sm' variant='light'>
                                                            View Order
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </Table>
                                {
                                    ordersOfCurrentUser.pages > 1 ? (
                                        <Link to='/orders'>View more orders?</Link>
                                    ) : (
                                        <></>
                                    ) 
                                }
                            </>
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default ProfileScreen