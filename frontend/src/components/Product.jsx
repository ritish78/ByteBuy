import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const mouseEnterHandler = () => {
        setIsHovered(true);
    }

    const mouseLeaveHandler = () => {
        setIsHovered(false);
    }

    useEffect(() => {
        if (!isHovered) {
            setCurrentImageIndex(0);
        }

        if (isHovered) {
            const imageLoopInterval = setInterval(() => {
                setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
            }, 2000)

            return () => clearInterval(imageLoopInterval);
        }
    }, [isHovered, product, currentImageIndex]);


    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img 
                    src={product.images[currentImageIndex]} 
                    variant="top"
                    className="card-image"
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                    style={{ transition: '0.5s ease-in-out' }}
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
                        text={`${product.numberOfReviews} ${product.numberOfReviews === 1 ? 'review' : 'reviews'}`}
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