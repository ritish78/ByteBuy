import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button, Form } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetAllOrdersForAdminQuery } from '../../slices/ordersApiSlice';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import Paginate from '../../components/Paginate';
import { PAGINATION_ORDER_ADMIN } from '../../utils/constant';
import Meta from '../../components/Meta';

const OrderListScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isPaidChecked, setIsPaidChecked] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isDeliveredChecked, setIsDeliveredChecked] = useState('');

    const { pageNumber } = useParams();
    const { data: orders, isLoading, error } = useGetAllOrdersForAdminQuery({ keyword: searchQuery, isPaid: isPaidChecked, paymentMethod, isDelivered: isDeliveredChecked, pageNumber });

    let sortedOrders = [];
    if (orders) {
        if (orders.allOrders.length > 1) {
            sortedOrders = [...orders.allOrders].sort((order, nextOrder) => new Date(nextOrder.createdAt) - new Date(order.createdAt))
        } else {
            sortedOrders = orders.allOrders;
        }
    }

    const paidCheckHandler = () => {
        if (isPaidChecked) {
            setIsPaidChecked('');
        } else {
            setIsPaidChecked(!isPaidChecked);
        }
    }

    const deliveredCheckHandler = () => {
        setIsDeliveredChecked(!isDeliveredChecked);
    }

    const paymentMethodChangeHandler = (e) => {
        const paymentMethod = e.target.value;
        if (paymentMethod) {
            setIsPaidChecked(true);
        }
        setPaymentMethod(paymentMethod);
    }


    const searchOrderHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Meta title='Order List - ByteBuy' />
            <h2>Orders</h2>
            <Form className='d-flex my-3'>
                <Form.Control
                    type='text'
                    placeholder='Search orders using ID'
                    name='query'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='mr-sm-2 ml-sm-5 mb-2'
                />
                <Button variant='outline-primary' className='mb-2 px-3' type='submit' onClick={searchOrderHandler}>
                    <FaSearch />
                </Button>
            </Form>
            <div className='d-flex mb-2'>
                <Form.Check
                    type='checkbox'
                    label='Paid'
                    checked={isPaidChecked}
                    onChange={paidCheckHandler}
                    className='px-4 mt-1'
                />
                <Form.Check
                    type='checkbox'
                    label='Delivered'
                    checked={isDeliveredChecked}
                    onChange={deliveredCheckHandler}
                    className='mt-1'
                />
                <Form.Group controlId='paymentMethod' className='px-4'>
                    <Form.Select
                        onChange={paymentMethodChangeHandler}
                    >
                        <option value=''>Select payment method</option>
                        <option value='PayPal'>PayPal</option>
                        <option value='CreditCard'>Credit Card</option>
                        <option value='DebitCard'>Debit Card</option>
                        <option value='Cash'>Cash</option>
                    </Form.Select>
                </Form.Group>
            </div>
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
                                {sortedOrders.map((order, index) => (
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