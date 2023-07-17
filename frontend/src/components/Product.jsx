import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img 
                    src={product.images[0]} 
                    variant="top"
                    className="card-image"
                />
                {product.onSale ? (
                    <>
                        <Badge bg='success' pill className='on-sale-badge'>On Sale</Badge>
                        <Badge bg='primary' pill className='on-sale-percentage'>{product.salePercentage}% off</Badge>
                    </>
                ) : ''}
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating 
                        value={product.rating} 
                        text={`${product.numberOfReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="h4">
                    {product.onSale ? (
                        <>
                            <small className='initial-price'>${product.price} </small>
                            <span>  {' '}${product.salePrice}</span>
                        </>
                    ) : (
                        <>
                            <span>${product.price}</span>
                        </>
                    ) }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;