import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TimelineProgressBar from './TimelineProgressBar';

const CheckoutSteps = ({ stepOne, stepTwo, stepThree, stepFour, stepCount }) => {
    return (
        <>
            <Nav className='justify-items-center'>
                <Nav.Item>
                    { stepOne ? (
                        <LinkContainer to='/login'>
                            <Nav.Link>Log In</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Log In</Nav.Link>
                        ) }
                </Nav.Item>

                <Nav.Item>
                    { stepTwo ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                        ) }
                </Nav.Item>

                <Nav.Item>
                    { stepThree ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    ) }
                </Nav.Item>    
            
                <Nav.Item>
                    { stepFour ? (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                        ) }
                </Nav.Item>
            </Nav>
            <TimelineProgressBar stepCount={stepCount} />
        </>
    )
}

export default CheckoutSteps;