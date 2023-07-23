import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { Link, useNavigate } from 'react-router-dom';

const ProductListScreen = () => {
    const { data: productList, isLoading, error } = useGetProductsQuery();

    const deleteProductHandler = (productId) => {
        console.log('Delete product of id?', productId);
    }

    const navigate = useNavigate();

    const createProductHandler = () => {
        navigate('/admin/product/create');
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-end'>
                    <Button
                        className='my-3 btn-sm'
                        onClick={createProductHandler}
                    >
                        Add product <FaPlusCircle />
                    </Button>
                </Col>
            </Row>

            {isLoading 
                ? (<SpinnerGif />) 
                : error 
                ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
                : (
                    <>
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Stock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/product/${product._id}`}>
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button 
                                                    variant='light' 
                                                    className='mx-2 btn-sm'
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button 
                                                variant='danger' 
                                                className='mx-2 btn-sm'
                                                onClick={() => deleteProductHandler(product._id)}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
        </>
    )
}

export default ProductListScreen