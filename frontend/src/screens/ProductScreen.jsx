import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import { FaCartPlus, FaAngleLeft, FaEdit } from 'react-icons/fa';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import BadgeToolTip from '../components/BadgeToolTip';
import { LinkContainer } from 'react-router-bootstrap';

const ProductScreen = () => {
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

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

    const handleThumnailImageClick = (image) => {
        setMainImage(image);
    }

    const addItemToCartHandler = () => {
        // const itemExistsInCart = cartItems.find((itemInCart) => itemInCart._id === product._id);
        // if (itemExistsInCart) {
        //     dispatch(addToCart({ ...product, quantity: itemExistsInCart.quantity + quantity }))
        // } else {
        //     dispatch(addToCart({ ...product, quantity }));
        // }
        dispatch(addToCart({ ...product, quantity }));
        navigate('/cart');
    }

    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                <FaAngleLeft /> Go Back
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
                                Price: {product.onSale ? (
                                            <>
                                                <span className='initial-price'>${product.price} </span>
                                                <span>  {' '}${product.salePrice}{' '}</span>
                                                <BadgeToolTip 
                                                        toolTipMessage={`${product.name} is on sale for ${product.salePrice} from initial price of ${product.price} at ${product.salePercentage}% off!`}
                                                        badgeBackground='success'
                                                        badgeMessage='On Sale'
                                                    />
                                            </>
                                        ) : (
                                            <>
                                                <span>${product.price}</span>
                                            </>
                                        ) }
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
                                        <Col>
                                            Price: {product.onSale ? (
                                                <>
                                                    <BadgeToolTip 
                                                        toolTipMessage={`${product.name} is on sale for ${product.salePrice} from initial price of ${product.price} at ${product.salePercentage}% off!`}
                                                        badgeBackground='primary'
                                                        badgeMessage={`${product.salePercentage}% off`}
                                                    />
                                                </>
                                            ) : ''}
                                        </Col>
                                        <Col>
                                            <>
                                                {product.onSale ? (
                                                    <>
                                                        <span className='initial-price'>${product.price} </span>
                                                        <strong>  {' '}${product.salePrice}</strong>
                                                    </>
                                                ) : (
                                                    <>
                                                        <strong>${product.price}</strong>
                                                    </>
                                                ) }
                                            </>
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

                                { product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Quantity: </Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={quantity}
                                                    onChange={e => setQuantity(Number(e.target.value))}
                                                >
                                                    {
                                                        product.countInStock >= 10 ? (
                                                            quantityOptions.map(count => (
                                                                <option key={count} value={count}>
                                                                    {count}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            [...Array(product.countInStock).keys()].map(count => (
                                                                <option key={count + 1} value={count + 1}>
                                                                    {count + 1}
                                                                </option>
                                                            ))
                                                        )
                                                    }
                                                    
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ) }

                                {
                                    userInfo && userInfo.isAdmin && (
                                        <ListGroupItem>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button className='btn-block my-2 px-4 w-100' variant='warning'>
                                                    Edit Product <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                        </ListGroupItem>
                                    )
                                }
                                <ListGroupItem>
                                    <Button
                                        className="btn-block my-2 px-4 w-100"
                                        type="button"
                                        disabled={ product.countInStock === 0 }
                                        style={{ opacity: product.countInStock === 0 ? '0.65' : '1' }}
                                        onClick={addItemToCartHandler}
                                    >
                                        Add to cart <FaCartPlus />
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