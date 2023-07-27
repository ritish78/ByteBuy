import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, FormGroup, Spinner } from 'react-bootstrap';
import { FaCartPlus, FaAngleLeft, FaEdit, FaCommentAlt } from 'react-icons/fa';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { 
    useCreateReviewMutation,
    useGetReviewByIdQuery,
    useGetReviewsByProductIdQuery,
    useDeleteReviewByIdMutation,
    useUpdateReviewByIdMutation 
} from '../slices/reviewApiSlice';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import BadgeToolTip from '../components/BadgeToolTip';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import formatDate from '../utils/formatDate';
import Meta from './../components/Meta';

const ProductScreen = () => {
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
    const [createReview, { isLoading: isCreatingReviewLoading, error: errorCreatingReview }] = useCreateReviewMutation();
    const { data: reviews, isLoading: isReviewsLoading, error: errorReviews, refetch: refetchReview } = useGetReviewsByProductIdQuery(productId);
    console.log(reviews);
    console.log(product);

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

    const createReviewHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();
    
            refetchReview();
            toast.success('Review created!');
            setRating(0);
            setComment('');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

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
                <>
                    <Meta title={product.name} />
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
                    <Row className='review mt-4'>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {
                                isReviewsLoading ? (
                                    <>Loading Reviews...</>
                                ) : (
                                    reviews.length === 0 ? (
                                        <Message variant='info'>
                                            No review for {product.name} has been made.
                                        </Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {reviews.map(review => (
                                                <ListGroupItem key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{formatDate(review.updatedAt)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    )     
                                )
                            }
                            {
                                <ListGroup className='mt-3'>
                                    <ListGroupItem>
                                        <h3>Write a review</h3>
                                        {userInfo ? (
                                            <Form onSubmit={createReviewHandler}>
                                                <FormGroup controlId='rating' className='my-2'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={e => setRating(Number(e.target.value))}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='5'>5 - Excellent</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='2'>2 - Below Average</option>
                                                        <option value='1'>1 - Unsatisfactory</option>
                                                    </Form.Control>
                                                </FormGroup>

                                                <FormGroup controlId='comment' className='my-2'>
                                                    <Form.Label>Comment:</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                        placeholder='Describe your experience with the product.'
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </FormGroup>

                                                <Button
                                                    variant='primary'
                                                    type='submit'
                                                    disabled={isCreatingReviewLoading || !rating}
                                                >
                                                    {
                                                        isCreatingReviewLoading ? (
                                                            <> <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                />  Adding review...</>
                                                                ) : (
                                                                <>Add review <FaCommentAlt />
                                                            </>
                                                        )
                                                    }
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Please <Link to='/login'>log in</Link> to review the product!
                                            </Message>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>
                            }
                        </Col>
                    </Row>
                </>
            ) }
            
        </>
    )
}

export default ProductScreen;