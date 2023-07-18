import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Row, 
    Col, 
    ListGroup, 
    ListGroupItem, 
    Image, 
    Card, 
    Button
} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import SpinnerButton from './../components/SpinnerButton';
import Message from './../components/Message';
import { useCreateAnOrderMutation } from '../slices/ordersApiSlice';
import { useGetShippingAddressOfCurrentUserQuery } from '../slices/addressApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { FaCheck } from 'react-icons/fa';
import BadgeToolTip from '../components/BadgeToolTip';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);
    const address = useSelector(state => state.address);

    const [createOrder, { isLoading, error }] = useCreateAnOrderMutation();

    console.log(address);

    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
                taxPrice: cart.taxPrice
            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }   
    }

    return (
        <>
            <CheckoutSteps stepOne stepTwo stepThree stepFour stepFive startFrom={67} stepCount={90} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.apartmentNumber}/{cart.shippingAddress.street}, {cart.shippingAddress.city} 
                                {' '}{cart.shippingAddress.state} {cart.shippingAddress.postalCode}, { cart.shippingAddress.country }
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method:</h2>
                            {cart.paymentMethod}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty.</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.images[0]} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    { item.price } x { item.quantity } = $ { (item.price * item.quantity).toFixed(2) }
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary:</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Shipping:
                                        {cart.shippingPrice == 0 ? (
                                            <BadgeToolTip 
                                                toolTipMessage='Free Shipping if the total price of items crosses $100'
                                                badgeBackground='success'
                                                badgeMessage='Free'
                                            />
                                            ) : ''}
                                    </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error.data.message}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                            {isLoading ? <SpinnerButton message='Confirming...' /> : (
                                <Button 
                                    type='button'
                                    variant='primary'
                                    className='mt-3 px-5'
                                    disabled={isLoading || cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Confirm Order{' '} <FaCheck />
                                </Button>
                            )}

                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen