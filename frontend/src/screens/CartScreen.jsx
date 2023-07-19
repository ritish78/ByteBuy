import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Row, 
    Col, 
    ListGroup, 
    Image, 
    Form, 
    Button, 
    Card, 
    ListGroupItem
} from 'react-bootstrap';
import { FaTrash, FaAngleLeft } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;    

    const updateCartItemsHandler = async (item, newQuantity) => {
        dispatch(addToCart({ ...item, quantity: newQuantity }))
    }

    const removeCartItemsHandler = async (itemId) => {
        dispatch(removeFromCart(itemId))
    }

    const navigateToCheckoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <>
        <Row>
            <Col md={5} className='justify-items-center'>
                <CheckoutSteps stepOne stepTwo stepCount={25}/>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Your Cart</h1>
                <Link className="btn btn-light my-3" to="/">
                    <FaAngleLeft /> Go Back
                </Link>
                { cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty. Browse products and add items to cart for it to appear here.{' '}
                        <Link to='/'>Browse products.</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {
                            cartItems.map((item) => (
                                <ListGroupItem key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.images[0]} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                           <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                        as='select'
                                                        value={item.quantity}
                                                        onChange={e => updateCartItemsHandler(item, Number(e.target.value))}
                                            >
                                                { [...Array(item.countInStock).keys()].map(count => (
                                                    <option key={count + 1} value={count + 1}>
                                                        {count + 1}
                                                    </option>
                                                )) }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button 
                                                type='button'
                                                variant='light'
                                                onClick={() => removeCartItemsHandler(item._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                ) }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h4>
                                Subtotal: ({ cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0) })
                                {cartItems.length === 0 ? ' item' : cartItems.length > 1 ? ' items' : cartItems[0].quantity > 1 ? ' items' : ' item'}
                            </h4>
                            ${  cartItems
                                    .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
                                    .toFixed(2)
                                }
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button 
                                type='button'
                                className='btn-block'
                                disabled={ cartItems.length === 0 }
                                onClick={navigateToCheckoutHandler}
                            >
                                Proceed to checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default CartScreen;