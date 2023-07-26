import React from 'react';
import { Table, Col, Row, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useGetCurrentUserOrdersQuery } from '../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

const UserPastOrdersScreen = () => {
    const { data: ordersOfCurrentUser, isLoading: isOrdersLoading, error } = useGetCurrentUserOrdersQuery();

    const { userInfo } = useSelector((state) => state.auth);

    let sortedOrders;
    if (ordersOfCurrentUser && ordersOfCurrentUser.length > 1) {
        sortedOrders = [...ordersOfCurrentUser].sort((order, nextOrder) => new Date(nextOrder.createdAt) - new Date(order.createdAt))
    } else {
        sortedOrders = ordersOfCurrentUser;
    }

    return (
        <>
            <h3 className='mb-4'>{userInfo.name}'s orders</h3>
            <Row>
                <Col>
                    {isOrdersLoading ? (
                        <SpinnerGif />
                    ) : error ? (
                        <Message variant='danger'>
                            { error?.data?.message || error.error}
                        </Message>
                    ) : ordersOfCurrentUser.length === 0 ? (
                        <Message variant='warning'>
                            <p>Looks like you don't have any orders. Browse products and order them now!</p>
                            <Link to='/'>Browse products.</Link>
                        </Message>
                    ) : (
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Items</th>
                                    <th>Status</th>
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
                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                {order.orderItems.length === 1 ? (
                                                    <>{order.orderItems[0].name}</>
                                                ) : (
                                                    <>{order.orderItems[0].name} <i><b>& {order.orderItems.length - 1} more</b></i></>
                                                )}
                                            </Link>
                                        </td>
                                        <td>{order.status}</td>
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
                    )}
                </Col>
            </Row>
        </>      
    )
}

export default UserPastOrdersScreen