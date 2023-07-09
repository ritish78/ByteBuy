import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
    
    const { id:productId } = useParams();
    const product = products.find((product) => product._id === productId);
    
    const [mainImage, setMainImage] = useState(product.image[0]);

    console.log(product);

    const handleThumnailImageClick = (image) => {
        setMainImage(image);
    }


    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={5} className="d-flex flex-column align-items-center">
                    <Image className="main-product-image" src={mainImage} alt={product.name} fluid />
                    { /* Now rendering other product images as thumbnails */ }
                    <div className="mt-3 thumbnail-container">
                        { product.image.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                thumbnail
                                className={`thumbnail ${mainImage === image ? 'thumbnail-active' : ''}`}
                                onClick={() => handleThumnailImageClick(image)}
                                style={{ cursor: 'pointer' }}
                            />    
                        )) }
                    </div>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <p><h3>{product.name}</h3></p>
                            <small style={{ fontSize: '0.8em', color: 'gray' }}>Brand: {product.brand}</small>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        <strong>{ product.countInStock > 0 ? 'In stock' : 'Out of stock' }</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={ product.countInStock === 0 }
                                >
                                    Add to cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;