import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetProductsQuery, useDeleteProductByIdMutation } from '../../slices/productApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [productNameToDelete, setProductNameToDelete] = useState('');
    const [productIdToDelete, setProductIdToDelete] = useState('');
    const { data: productList, isLoading, error, refetch } = useGetProductsQuery();
    const [deleteProductById, { isLoading: isDeletingProductLoading }] = useDeleteProductByIdMutation();

    const showModalHandler = () => {
        setShowModal(true);
    }
        
    const closeModalHandler = () => {
        setShowModal(false);
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