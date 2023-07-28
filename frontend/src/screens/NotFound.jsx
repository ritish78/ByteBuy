import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Message from '../components/Message'

const NotFound = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary mb-5 mt-2">
        <FaExclamationTriangle /> Page Not Found
      </h1>
      <Message variant='danger'>
        <p className="large">Sorry, this page does not exist.</p>
        <Link to='/'>Go to homepage?</Link>
      </Message>
    </section>
  );
};

export default NotFound;