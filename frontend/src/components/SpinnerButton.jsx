import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const SpinnerButton = ({ message }) => {
    return (
        <>
            <Button variant="primary" 
                disabled
                style={{
                    marginTop: '12px',
                    padding: '7px 20px'
                }}
            >
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span>{'  '}{ message ? message : 'Loading...' }</span>
            </Button>
        </>
    )
}

export default SpinnerButton;
