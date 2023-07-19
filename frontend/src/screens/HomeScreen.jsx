import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import { useSelector, useDispatch } from 'react-redux';
import { useGetShippingAddressOfCurrentUserQuery } from '../slices/addressApiSlice';

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

    const { data: products, isLoading, error } = useGetProductsQuery();
    const auth = useSelector((state) => state.auth);
    const address = useSelector((state) => state.address);

    console.log(address);
    

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
                    { products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} /> 
                        </Col>
                    )) }
                </Row>
            </>) }
        </>
    )
}

export default HomeScreen;