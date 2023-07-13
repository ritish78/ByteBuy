import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';

const ProductScreen = () => {
    // const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    
    const { id: productId } = useParams();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);

    //         setProduct(data);
    //         setMainImage(data.images[0]);
    //         setImages(data.images);
    //     }

    //     fetchProduct();
    // }, [productId]);
    
    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
            setImages(product.images);
        }
    }, [product]);

    //TODO: Research a better way to setMainImage and Images.
    console.log(product);

    const handleThumnailImageClick = (image) => {
        setMainImage(image);
    }


    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            { isLoading ? (
                <SpinnerGif />
            ) : error ? (<div>
                <Message variant='danger'>
                    Error while fetching product details!
                </Message>
            </div>) : (
                <Row>
                    <Col md={5} className="d-flex flex-column align-items-center">
                        <Image className="main-product-image" src={mainImage} alt={product.name} fluid />
                        { /* Now rendering other product images as thumbnails */ }
                        <div className="mt-3 thumbnail-container">
                            { images.map((image, index) => (
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
                                <h3>{product.name}</h3>
                                <small style={{ fontSize: '0.8em', color: 'gray' }}>Brand: {product.brand}</small>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numberOfReviews} reviews`} />
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
                                        style={{ opacity: product.countInStock === 0 ? '0.65' : '1' }}
                                    >
                                        Add to cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) }
            
        </>
    )
}

export default ProductScreen;