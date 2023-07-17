import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';
import { FaPaypal, FaCreditCard, FaRegCreditCard, FaMoneyBill, FaDollarSign, FaCashRegister } from 'react-icons/fa';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const paymentFormSubmitHandler = e => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps stepOne stepTwo stepThree stepFour stepCount={67} />
            <h1>Payment Method</h1>
            <Form onSubmit={paymentFormSubmitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Pay With </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label={
                                <>
                                    <FaPaypal /> PayPal
                                </>
                            }
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            onChange={e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label={
                                <>
                                    <FaCreditCard /> Credit Card
                                </>
                            }
                            id='CreditCard'
                            name='paymentMethod'
                            value='CreditCard'
                            onChange={e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label={
                                <>
                                    <FaRegCreditCard /> Debit Card
                                </>
                            }
                            id='DebitCard'
                            name='paymentMethod'
                            value='DebitCard'
                            onChange={e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label={
                                <>
                                    <FaMoneyBill /> Cash
                                </>
                            }
                            id='Cash'
                            name='paymentMethod'
                            value='Cash'
                            onChange={e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button 
                    type='submit' 
                    variant='primary'
                    disabled={paymentMethod === ''}
                >
                    Proceed with payment <FaDollarSign />
                </Button>
                    
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;