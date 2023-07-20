import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Form, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import SpinnerGif from '../components/SpinnerGif';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import BadgeToolTip from '../components/BadgeToolTip';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    console.log(order);

    return isLoading 
            ? <SpinnerGif /> 
            : error 
            ? <Message variant='danger' /> 
            : (
                <>
                    <h2>Order {order._id}</h2>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Shipping</h3>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong> {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address: </strong> {order.shippedTo.apartmentNumber}/{order.shippedTo.street}{' '}
                                        {order.shippedTo.city} {order.shippedTo.state} {order.shippedTo.postalCode}, {order.shippedTo.country}
                                    </p>
                                    <p>
                                        {order.isDelivered ? (
                                            <Message variant='success'>
                                                Delivered at {order.deliveredAt}
                                            </Message>
                                        ) : (
                                            <Message variant='info'>
                                                Order is {order.paymentResult.status}. 
                                                {order.paymentMethod === 'Cash' ? (
                                                    <span>
                                                        {' '}Please meet at the store address to pickup item.
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {' '}Will be delivered soon.
                                                    </span>
                                                )}
                                            </Message>
                                        )}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>Payment Method</h3>
                                    <p>
                                        <strong>Selected payment method: </strong> {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                            <Message variant='success'>
                                                Paid on {order.paymentResult.paidAt}
                                            </Message>
                                        ) : (
                                            <Message variant='danger'>
                                                Order is not paid.
                                            </Message>
                                        )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>Order Items</h3>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h3>Order Summary</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Items
                                            </Col>
                                            <Col>
                                                ${order.totalPrice}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Shipping{' '}
                                                {order.shippingPrice == 0 ? (
                                                    <BadgeToolTip 
                                                        toolTipMessage='Free Shipping if the total price of items crosses $100'
                                                        badgeBackground='success'
                                                        badgeMessage='Free'
                                                    />
                                                    ) : ''
                                                }
                                            </Col>
                                            <Col>
                                                ${order.shippingPrice}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Tax{' '}
                                                <BadgeToolTip 
                                                    toolTipMessage='Price of product already includes tax.'
                                                    badgeBackground='secondary'
                                                    badgeMessage='?'
                                                />
                                            </Col>
                                            <Col>
                                                ${order.taxPrice}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Total Price
                                            </Col>
                                            <Col>
                                                ${order.totalPrice}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* TODO: For user
                                    Being able to pay

                                    TODO: For ADMIN
                                    Admin can mark item as delivered */}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) 
}

export default OrderScreen