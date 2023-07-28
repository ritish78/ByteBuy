import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to ByteBuy',
    description: 'Browse products and buy if you like them',
    keywords: 'buy products, online shopping, ecommerce'
}

export default Meta