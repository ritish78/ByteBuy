import React from 'react';
import { Spinner } from "react-bootstrap";

const SpinnerGif = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto',
          display: 'block'
        }}
      ></Spinner>
    </div>
  )
}

export default SpinnerGif;