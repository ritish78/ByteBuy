import React from 'react';
import { Link } from 'react-router-dom';
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
// import '@coreui/coreui/dist/css/coreui.min.css'
import SpinnerGif from './SpinnerGif';
import Message from './Message';
import { useGetTopRatedProductsQuery } from '../slices/productApiSlice';

const CarouselHome = () => {
    const { data: products, isLoading, error } = useGetTopRatedProductsQuery();

    return (
        isLoading ? <SpinnerGif />
        : error 
        ? (<Message variant='danger'>
               Error fetching top products!
           </Message>)
        : (
           <CCarousel controls indicators dark>
               {products.map(product => (
                   <CCarouselItem key={product._id}>
                       <Link to={`/product/${product._id}`}>
                           <CImage src={product.images[0]} alt={product.name} className='d-block w-100'/>
                           <CCarouselCaption>
                               <h3>{product.name} (${product.price})</h3>
                           </CCarouselCaption>
                       </Link>
                   </CCarouselItem>
               ))}
           </CCarousel>
       )
   )
}

export default CarouselHome