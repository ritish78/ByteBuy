import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import SpinnerGif from '../components/SpinnerGif';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { PAGINATION_PRODUCT, PAGINATION_SEARCH } from '../utils/constant';
import { FaAngleLeft } from 'react-icons/fa';
import Meta from '../components/Meta';

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

    const { pageNumber, keyword } = useParams();
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const query = searchParams.get('query') || '';


    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
    console.log(data);

    return (
        <>
            { keyword && (
                <Link className="btn btn-light my-3" to="/">
                    <FaAngleLeft /> Go Back
                </Link>
            )}
            { isLoading ? (
                <SpinnerGif />
            ) : error ? (<div>
                <Message variant='danger'>
                    Error while fetching products!
                </Message>
                </div>
            ) : !isLoading && data.products.length === 0 ? (
                <Message variant='info'>
                    { keyword ? `No product found of name ${keyword}!` : 'There are no products in database. Add products for it to appear here!'}
                </Message>
            ) : (<>
                <Meta title='ByteBuy - Homepage'/>
                {
                    (!pageNumber || parseInt(pageNumber) < 2) && !keyword && <ProductCarousel />
                }
                <h2>Latest Products</h2>
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
                    paginationType={keyword ? PAGINATION_SEARCH : PAGINATION_PRODUCT}
                    keyword={keyword ? keyword : ''}
                />
            </>) }
        </>
    )
}

export default HomeScreen;