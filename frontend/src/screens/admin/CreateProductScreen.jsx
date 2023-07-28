import React, { useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useCreateProductMutation, useUploadProductImagesMutation } from '../../slices/productApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Meta from './../../components/Meta';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [images, setImages] = useState([]);

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [uploadProductImages, { isLoading: isUploadingImagesLoading, isSuccess }] = useUploadProductImagesMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const priceChangeHandler = (price) => {
        const priceInFloat = parseFloat(price);
        
        if (isNaN(priceInFloat) || priceInFloat < 0) {
            setPrice(0);
            // toast.error('Price of product cannot be set below $0.');
        } else {
            setPrice(priceInFloat);
        }
    }

    const countInStockHandler = (count) => {
        const countInWholeNumber = parseInt(count);

        if (isNaN(countInWholeNumber) || countInWholeNumber < 0) {
            setCountInStock(0);
        } else {
            setCountInStock(countInWholeNumber);
        }
    }

    const uploadImagesHandler = async (e) => {
        const formData = new FormData();
        console.log(e.target.files);

        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImages(formData).unwrap();
            console.log(res);
            toast.success('Image uploaded successfully');
            setImages([...images, res.imageUrl]);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    const deleteImageHandler = (indexToRemove) => {
        const newImageList = [...images.slice(0, indexToRemove), ...images.slice(indexToRemove + 1)];
        toast.success('Image deleted!');
        setImages(newImageList);
    }

    const createProductHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await createProduct({
                user: userInfo._id,
                name,
                images: images.length === 0 ? ['https://placehold.co/1200x1000'] : images,
                brand,
                category,
                description,
                price,
                countInStock
            }).unwrap();

            toast.success('Product Created!');
            navigate(`/product/${res._id}`);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <FormContainer>
            <Meta title='Add a product - ByteBuy' />
            <h2 className='mb-4'>Add a product</h2>

            <Form onSubmit={createProductHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Product Name: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name/Title of product to add'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='brand' className='my-2'>
                    <Form.Label>Brand: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Brand of product'
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category' className='my-2'>
                    <Form.Label>Category: </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='images' className='my-2'>
                    <Form.Label>Image: </Form.Label>
                    {images.map((image, index) => (
                        <InputGroup key={index}>
                            <Form.Control
                                type='text'
                                value={image}
                                key={index}
                                readOnly
                                className='mb-2'
                            />
                            <Button
                                variant='outline-danger'
                                className='mb-2'
                                onClick={() => deleteImageHandler(index)}
                            ><FaTrash /></Button>
                        </InputGroup>
                    ))}
                    <Form.Control
                        type='file'
                        accept='.png, .jpeg, .jpg, .gif'
                        onChange={uploadImagesHandler}
                    />
                </Form.Group>

                <Form.Group controlId='description' className='my-2'>
                    <Form.Label>Product description: </Form.Label>
                    <Form.Control
                        as='textarea'
                        row={5}
                        placeholder='Add description to your product. You can specify the dimensions, its use cases or anything.'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' className='my-2'>
                    <Form.Label>Price: </Form.Label>
                    <InputGroup className='my-2'>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type='number'
                            value={price}
                            onChange={e => priceChangeHandler(e.target.value)}
                        ></Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId='countInStock' className='my-2'>
                    <Form.Label>Count in stock: </Form.Label>
                    <Form.Control
                        type='number'
                        value={countInStock}
                        onChange={e => countInStockHandler(e.target.value)}
                    ></Form.Control>                    
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='my-3 px-4'
                    disabled = {isLoading}
                >
                    {
                        isLoading ? (<> <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />  Creating product...</>
                            ) : (
                            <>Create Product <FaPlusCircle /></>
                        )
                    }
                </Button>
            </Form>
        </FormContainer>
    )
}

export default CreateProductScreen