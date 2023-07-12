import { Spinner } from "react-bootstrap";

import React from 'react'

const SpinnerGif = () => {
  return (
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
  )
}

export default SpinnerGif;