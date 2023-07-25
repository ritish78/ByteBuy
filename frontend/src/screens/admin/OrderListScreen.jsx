import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetAllOrdersForAdminQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {

    const { data: orders, isLoading, error } = useGetAllOrdersForAdminQuery();

    return (
        <>
            <h2>Orders</h2>
            {isLoading ? 
                        <SpinnerGif /> 
                        : error 
                        ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
                        : (
                            <Table striped hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{index + 1}</td>
                                            <td>{order.user && order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <FaTimes style={{ color: 'red' }} />
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
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
                                    ))}
                                </tbody>
                            </Table>
                        )}
        </>
    )
}

export default OrderListScreen