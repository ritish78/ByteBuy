import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const TimelineProgressBar = ({ stepCount }) => {
    return (
        <ProgressBar striped variant='info' style={{ marginBottom: '20px' }} now={stepCount}>
        </ProgressBar>
    )
}

export default TimelineProgressBar;