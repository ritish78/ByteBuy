import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button, Row, Col, Modal, Spinner, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaCheck, FaSearch } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetProductsQuery, useDeleteProductByIdMutation } from '../../slices/productApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { PAGINATION_PRODUCT_ADMIN } from '../../utils/constant';
import { toast } from 'react-toastify';
import Meta from '../../components/Meta';

const ProductListScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [productNameToDelete, setProductNameToDelete] = useState('');
    const [productIdToDelete, setProductIdToDelete] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const { pageNumber } = useParams();

    let { data, isLoading, error, refetch } = useGetProductsQuery({ keyword: searchQuery, pageNumber});
    console.log(data);
    const [deleteProductById, { isLoading: isDeletingProductLoading }] = useDeleteProductByIdMutation();

    const showModalHandler = () => {
        setShowModal(true);
    }
        
    const closeModalHandler = () => {
        setShowModal(false);
    }

    const searchProductHandler = (e) => {
        e.preventDefault();
    }

    const deleteProductHandler = async () => {
        if (productIdToDelete) {
            try {
                await deleteProductById(productIdToDelete);

                closeModalHandler();
                toast.success('Product deleted!');
                setProductNameToDelete('');
                setProductIdToDelete('');

                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    const navigate = useNavigate();

    const createProductHandler = () => {
        navigate('/admin/product/create');
    }

    return (
        <>
            <Meta title='Product List - ByteBuy' />
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
            <Form className='d-flex my-3'>
                <Form.Control
                    type='text'
                    placeholder='Search products by name, brand, category or description...'
                    name='query'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='mr-sm-2 ml-sm-5 mb-2'
                />
                <Button variant='outline-primary' className='mb-2 px-3' type='submit' onClick={searchProductHandler}>
                    <FaSearch />
                </Button>
            </Form>

            {isLoading 
                ? (<SpinnerGif />) 
                : error 
                ? (<Message variant='danger'>{error?.data?.message || error.error || 'Error while fetching product list!'}</Message>) 
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
                                    <th>Sale</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.map((product, index) => (
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
                                        <td>{product.onSale ? <FaCheck /> : 'No'}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button 
                                                    variant='outline-secondary' 
                                                    className='mx-2 btn-sm'
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button 
                                                variant='outline-danger' 
                                                className='mx-2 btn-sm'
                                                onClick={() => {
                                                    showModalHandler();
                                                    setProductIdToDelete(product._id);
                                                    setProductNameToDelete(product.name);
                                                }}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Paginate
                            pages={data.pages}
                            currentPage={data.currentPage}
                            paginationType={PAGINATION_PRODUCT_ADMIN}
                        />
                    </>
                )}
                <Modal show={showModal} onHide={closeModalHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete product?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            productNameToDelete && (
                                <>
                                    Do you want to delete {productNameToDelete}?
                                </>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModalHandler}>
                            Close
                        </Button>
                        <Button 
                            variant='danger' 
                            onClick={() => deleteProductHandler()}
                            disabled={isDeletingProductLoading}
                        >
                            {
                                isDeletingProductLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />  Deleting...
                                    </>
                                ) : (
                                    <>Delete</>
                                )
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default ProductListScreen