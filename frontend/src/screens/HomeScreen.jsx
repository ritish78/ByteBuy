import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import { PAGINATION_PRODUCT } from '../utils/constant';

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products');

    //         console.log(data);
    //         setProducts(data);
    //     }

    //     fetchProducts();
    // }, []);

    const { pageNumber } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    return (
        <>
            { isLoading ? (
                <SpinnerGif />
            ) : error ? (<div>
                <Message variant='danger'>
                    Error while fetching products!
                </Message>
            </div>) : (<>
                <h1>Latest Products</h1>
                <Row>
                    { data.products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} /> 
                        </Col>
                    )) }
                </Row>
                
                <Paginate
                    pages={data.pages}
                    currentPage={data.currentPage}
                    paginationType={PAGINATION_PRODUCT}
                />
            </>) }
        </>
    )
}

export default HomeScreen;