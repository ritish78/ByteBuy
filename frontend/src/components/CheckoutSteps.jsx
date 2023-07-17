import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TimelineProgressBar from './TimelineProgressBar';

const CheckoutSteps = ({ stepOne, stepTwo, stepThree, stepFour, stepFive, stepCount }) => {
    return (
        <>
            <Nav className='justify-content-between'>
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
                        <LinkContainer to='/login'>
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Cart</Nav.Link>
                        ) }
                </Nav.Item>

                <Nav.Item>
                    { stepThree ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                        ) }
                </Nav.Item>

                <Nav.Item>
                    { stepFour ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    ) }
                </Nav.Item>    
            
                <Nav.Item>
                    { stepFive ? (
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