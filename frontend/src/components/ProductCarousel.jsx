import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Carousel } from 'react-bootstrap';
import SpinnerGif from './SpinnerGif';
import Message from './Message';
import { useGetTopRatedProductsQuery } from '../slices/productApiSlice';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopRatedProductsQuery();

    return (
         isLoading ? <SpinnerGif />
         : error 
         ? (<Message variant='danger'>
                Error fetching top products!
            </Message>)
         : (
            <Carousel pause='hover' className='bg-primary mb-4'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.images[0]} alt={product.name} className='d-block w-100'/>
                            <Carousel.Caption>
                                <h3>{product.name} (${product.price})</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel