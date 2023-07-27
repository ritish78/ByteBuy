import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetAllOrdersForAdminQuery } from '../../slices/ordersApiSlice';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import Paginate from '../../components/Paginate';
import { PAGINATION_ORDER_ADMIN } from '../../utils/constant';

const OrderListScreen = () => {
    const { pageNumber } = useParams();
    console.log(pageNumber);
    const { data: orders, isLoading, error } = useGetAllOrdersForAdminQuery({ pageNumber });
    console.log(orders);

    return (
        <>
            <h2>Orders</h2>
            {isLoading ? 
                <SpinnerGif /> 
                : error 
                ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
                : (
                    <>
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Items</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.allOrders.map((order, index) => (
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
                                        <td>{order.user && order.user.name}</td>
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
                                ))}
                            </tbody>
                        </Table>

                        <Paginate
                            pages={orders.pages}
                            currentPage={orders.currentPage}
                            paginationType={PAGINATION_ORDER_ADMIN}
                        />
                    </>
                )
             }
        </>
    )
}

export default OrderListScreen