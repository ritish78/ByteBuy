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
import { FaTrash, FaAngleLeft, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

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
          <Meta title="Cart - ByteBuy" />
          <Row className='gap-0'>
            <Col lg={8} className="justify-items-center">
              <CheckoutSteps stepOne stepTwo stepCount={25} />
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
                <div className="p-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h3>Your Cart</h3>
                    </div>
                </div>
              <Link className="btn btn-light my-3" to="/">
                <FaAngleLeft /> Go Back
              </Link>
              {cartItems.length === 0 ? (
                <Message>
                  Your cart is empty. Browse products and add items to cart for it to appear here.{' '}
                  <Link to="/">Browse products.</Link>
                </Message>
              ) : (
                // <>
                //     <Card>
                //     {
                //         cartItems.map((item) => (
                //             <Row className="mb-4 d-flex justify-content-between align-items-center px-3 py-1" key={item._id}>
                //                     <Col md="2" lg="2" xl="2">
                //                         <Card.Img src={item.images[0]} alt={item.name} fluid className="rounded-3"/>
                //                     </Col>
                //                     <Col md="3" lg="3" xl="3">
                //                         <h6 className="text-muted">
                //                             {item.name}
                //                         </h6>
                //                         <h6 className="text-black mb-0">
                //                             {item.brand}
                //                         </h6>
                //                     </Col>
                //                     <Col md="3" lg="3" xl="3" className="d-flex align-items-center">
                //                         <Button variant="link" className="px-2">
                //                             <FaMinus color='#000000'/>
                //                         </Button>

                //                         <Form.Control
                //                             as="select"
                //                             style={{ maxWidth: '60px' }}
                //                             value={item.quantity}
                //                             onChange={(e) => updateCartItemsHandler(item, Number(e.target.value))}
                //                         >
                //                             {item.countInStock >= 10 ? (
                //                             Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
                //                                 <option key={count} value={count}>
                //                                 {count}
                //                                 </option>
                //                             ))
                //                             ) : (
                //                             [...Array(item.countInStock).keys()].map((count) => (
                //                                 <option key={count + 1} value={count + 1}>
                //                                 {count + 1}
                //                                 </option>
                //                             ))
                //                             )}
                //                         </Form.Control>

                //                         <Button variant="link" className="px-2">
                //                             <FaPlus color='#000000' />
                //                         </Button>
                //                     </Col>
                //                     <Col md="3" lg="2" xl="2" className="text-end">
                //                         <h6 className="mb-0 px-4">
                //                             ${ (item.price * item.quantity).toFixed(2) }
                //                         </h6>
                //                     </Col>
                //                     <Col md="1" lg="1" xl="1" className="text-end">
                //                         <Button 
                //                             variant="outline-danger" 
                //                             className="px-2"
                //                             onClick={() => removeCartItemsHandler(item._id)}
                //                         >
                //                             <FaTrash />
                //                         </Button>
                //                     </Col>
                //                 </Row>
                //         ))
                //     }
                //     </Card>
                // </>
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroupItem key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.images[0]} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            style={{ maxWidth: '60px' }}
                            value={item.quantity}
                            onChange={(e) => updateCartItemsHandler(item, Number(e.target.value))}
                          >
                            {item.countInStock >= 10 ? (
                              Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
                                <option key={count} value={count}>
                                  {count}
                                </option>
                              ))
                            ) : (
                              [...Array(item.countInStock).keys()].map((count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              ))
                            )}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="outline-danger"
                            onClick={() => removeCartItemsHandler(item._id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h4>
                      Subtotal: ({cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)})
                      {cartItems.length === 0
                        ? ' item'
                        : cartItems.length > 1
                        ? ' items'
                        : cartItems[0].quantity > 1
                        ? ' items'
                        : ' item'}
                    </h4>
                    $
                    {cartItems
                      .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
                      .toFixed(2)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems.length === 0}
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