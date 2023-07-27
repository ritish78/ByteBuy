import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { saveShippingAddress } from '../slices/cartSlice';
import { setAddress } from '../slices/addressSlice';
import { 
    useGetShippingAddressByUserIdQuery, 
    useUpdateShippingAddressByIdMutation,
    useAddShippingAddressMutation
} from '../slices/addressApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';

const AddressScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);
    
    const { data: userAddress, refetch } = useGetShippingAddressByUserIdQuery(auth.userInfo._id);

    const [apartmentNumber, setApartmentNumber] = useState(userAddress?.apartmentNumber || '');
    const [street, setStreet] = useState(userAddress?.street || '');
    const [city, setCity] = useState(userAddress?.city || '');
    const [state, setState] = useState(userAddress?.state || '');
    const [postalCode, setPostalCode] = useState(userAddress?.postalCode || '');
    const [country, setCountry] = useState(userAddress?.country || '');
    
    useEffect(() => {
        if (userAddress) {
            setApartmentNumber(userAddress.apartmentNumber);
            setStreet(userAddress.street);
            setCity(userAddress.city);
            setState(userAddress.state);
            setPostalCode(userAddress.postalCode);
            setCountry(userAddress.country);
        }
    }, [userAddress]);
    
    const [updateShippingAddressById, { isLoading: isAddressUpdateLoading }] = useUpdateShippingAddressByIdMutation();
    const [addShippingAddress, { isLoading: isAddingAddressLoading }] = useAddShippingAddressMutation();

    const submitAddressFormHandler = async (e) => {
        e.preventDefault();
        try {
            if (!userAddress) {
                const res = await addShippingAddress({ apartmentNumber, street, city, state, postalCode, country }).unwrap();
                dispatch(setAddress({ addressId: res._id, apartmentNumber, street, city, state, postalCode, country }));
                toast.success('Address added to profile!');
            } else {
                await updateShippingAddressById({ addressId: userAddress._id, apartmentNumber, street, city, state, postalCode, country }).unwrap();
                dispatch(setAddress({ addressId: userAddress._id, apartmentNumber, street, city, state, postalCode, country }));
                toast.success('Address updated!');
            }
            dispatch(saveShippingAddress({ user: auth.userInfo._id, apartmentNumber, street, city, state, postalCode, country }));
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <FormContainer>
            <Meta title='Save Address - ByteBuy' />
            <h2 className='mb-4'>Your Address:</h2>
            <Form onSubmit={submitAddressFormHandler}>
                <Form.Group controlId='apartment-number' className='my-2'>
                    <Form.Label>Apartment Number/Unit: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='123'
                        value={apartmentNumber}
                        onChange={e => {setApartmentNumber(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='street' className='my-2'>
                    <Form.Label>Street: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='123 Some Street'
                        value={street}
                        onChange={e => {setStreet(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='A City'
                        value={city}
                        onChange={e => {setCity(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='state' className='my-2'>
                    <Form.Label>State: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='State'
                        value={state}
                        onChange={e => {setState(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postal-code' className='my-2'>
                    <Form.Label>Postal Code: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='State'
                        value={postalCode}
                        onChange={e => {setPostalCode(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postal-code' className='my-2'>
                    <Form.Label>Country: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={e => {setCountry(e.target.value)}}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='my-2 px-3'
                    disabled = { isAddingAddressLoading || isAddressUpdateLoading } 
                >
                    {
                        isAddingAddressLoading || isAddressUpdateLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />  
                                    {' '}Saving Address...
                            </>
                        ) : (
                            <>
                                Save Address {' '} <FaMapMarkerAlt /> 
                            </>
                        ) 
                    }
                </Button>
            </Form>
        </FormContainer>
    )
}

export default AddressScreen