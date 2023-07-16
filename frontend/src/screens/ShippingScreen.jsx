import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShippingFast } from 'react-icons/fa';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [apartmentNumber, setApartmentNumber] = useState(shippingAddress?.apartmentNumber || '');
    const [street, setStreet] = useState(shippingAddress?.street || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [state, setState] = useState(shippingAddress?.state || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postaCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitAddressFormHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ apartmentNumber, street, city, state, postalCode, country }));

        navigate('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps stepOne stepTwo stepCount={30}/>

            <h1>Shipping Address</h1>

            <Form onSubmit={submitAddressFormHandler}>
                <Form.Group controlId='apartment-number' className='my-2'>
                    <Form.Label>Apartment Number/Unit: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='123'
                        value={apartmentNumber}
                        onChange={e => setApartmentNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='street' className='my-2'>
                    <Form.Label>Street: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='123 Some Street'
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='A City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='state' className='my-2'>
                    <Form.Label>State: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='State'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postal-code' className='my-2'>
                    <Form.Label>Postal Code: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='State'
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postal-code' className='my-2'>
                    <Form.Label>Country: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='my-2 px-3'
                >Continue {' '} <FaShippingFast /> </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;