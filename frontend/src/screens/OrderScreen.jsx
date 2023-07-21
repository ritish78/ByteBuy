import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import SpinnerGif from '../components/SpinnerGif';
import SpinnerButton from '../components/SpinnerButton';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import BadgeToolTip from '../components/BadgeToolTip';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    console.log(order);

    const [payOrder, { isLoading: isPaymentLoading }] = usePayOrderMutation();
    const { data: paypal, isLoading: isPayPalLoading, error: paypalError } = useGetPayPalClientIdQuery();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        if (!paypalError && !isPayPalLoading && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'AUD'
                    }
                })
            }

            paypalDispatch({
                type: 'setLoadingStatus',
                value: 'pending'
            })

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [paypalError, isPayPalLoading, paypal, paypalDispatch, order]);

    const onApproveTest = async () => {
        await payOrder({ orderId, details: { email_address: 'testuser@email.com' } });
        refetch();
        toast.success('Payment Successful!');
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment Successful!');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    }
    const onError = () => {
        toast.error(error.message);
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {
            return orderId
        })
    }

    return isLoading 
            ? <SpinnerGif /> 
            : error 
            ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
            : (
                <>
                    <h3>Your Order</h3>
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
                                    
                                    {order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered at {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant='info'>
                                            Order is {order.paymentResult.status.toLowerCase()}. 
                                            {order.paymentMethod === 'Cash' ? (
                                                <span>
                                                    {' '}Please meet at the store address to pickup item.
                                                </span>
                                            ) : (
                                                <span>
                                                    {' '}The order will be delivered soon.
                                                </span>
                                            )}
                                        </Message>
                                    )}
                                    
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
                                    
                                    {
                                        !order.isPaid && (
                                            <ListGroup.Item>
                                                {isPaymentLoading && <SpinnerGif />}
                                                {isPending ? <SpinnerButton message='Loading PayPal' />
                                                            : (
                                                                <div>
                                                                    <Button onClick={onApproveTest} style={{ marginBottom: '10px', width: '100%' }}>
                                                                        Test Pay Button
                                                                    </Button>
                                                                        
                                                                    <div>
                                                                        <PayPalButtons 
                                                                            createOrder={createOrder}
                                                                            onApprove={onApprove}
                                                                            onError={onError}
                                                                        ></PayPalButtons>
                                                                    </div>
                                                                </div>
                                                            )
                                                }
                                            </ListGroup.Item>
                                        )
                                    }

                                    {/* TODO: For ADMIN
                                    Admin can mark item as delivered */}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) 
}

export default OrderScreen