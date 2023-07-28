import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { 
    useGetProductDetailsQuery, 
    useUpdateProductByIdMutation,
    useUploadProductImagesMutation 
} from '../../slices/productApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaAngleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from './../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import Meta from '../../components/Meta';


const EditProductScreen = () => {
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const { data: productDetails, isLoading: isFetchingProductLoading, error: errorFetchProduct, refetch } = useGetProductDetailsQuery(productId);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [images, setImages] = useState([]);
    const [onSale, setOnSale] = useState(false);
    const [salePercentage, setSalePercentage] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const [updateProductById, { isLoading: isUpdatingProductLoading, error: errorUpdateProduct }] = useUpdateProductByIdMutation();
    const [uploadProductImages, { isLoading: isUploadingImagesLoading }] = useUploadProductImagesMutation();

    useEffect(() => {
        if (productDetails) {
            setName(productDetails.name);
            setBrand(productDetails.brand);
            setCategory(productDetails.category);
            setDescription(productDetails.description);
            setPrice(productDetails.price);
            setCountInStock(productDetails.countInStock);
            setImages(productDetails.images);
            setOnSale(productDetails.onSale);
            setSalePercentage(productDetails.salePercentage);
            setSalePrice(productDetails.salePrice);
        }
    }, [productDetails]);

    const priceChangeHandler = (price) => {
        const priceInFloat = parseFloat(price);
        
        if (priceInFloat < 0) {
            setPrice(0);
            toast.error('Price of product cannot be set below $0.');
        } else if (isNaN(priceInFloat)) {
            setPrice('');
        } else {
            setPrice(priceInFloat);
        }
    }

    const salePriceChangeHandler = (price) => {
        const priceInFloat = parseFloat(price);

        if (priceInFloat < 0) {
            setSalePrice(0);
            toast.error('Sale price of product cannot be set below $0.');
        } else if (isNaN(priceInFloat)) {
            setSalePrice('');
        } else {
            setSalePrice(priceInFloat);
        }
    }

    const salePercentageChangeHandler = (percentage) => {
        const percentageInFloat = parseFloat(percentage);

        if (percentageInFloat < 0 || percentageInFloat > 100) {
            setSalePercentage(0);
            toast.error('Set sale percentage between 0% and 100%');
        } else if (isNaN(percentageInFloat)) {
            setSalePercentage('');
        } else {
            setSalePercentage(percentageInFloat);
        }
    }

    const countInStockHandler = (count) => {
        const countInWholeNumber = parseInt(count);

        if (countInWholeNumber < 0) {
            setCountInStock(0);
        } else if (isNaN(countInWholeNumber)) {
            setCountInStock('');
        } else {
            setCountInStock(countInWholeNumber);
        }
    }

    const showOnSaleInput = () => {
        setOnSale(!onSale);

        if (onSale) {
            setSalePrice(price);
            setSalePercentage(0);
        }
    }

    const deleteImageHandler = (indexToRemove) => {
        const newImageList = [...images.slice(0, indexToRemove), ...images.slice(indexToRemove + 1)];
        toast.success('Image deleted!');
        setImages(newImageList);
    }


    const updateProductHandler = async (e) => {
        e.preventDefault();

        if (isNaN(price) || isNaN(countInStock) || price === '' || countInStock === '') {
            toast.error('Price and stock count of item needs to be a number.');
            return;
        }

        if (onSale && (isNaN(salePrice) || isNaN(salePercentage) || salePrice === '' || salePercentage === '')) {
            toast.error('On sale item needs to have sale price and sale percentage in numbers.');
            return;
        }

        if (onSale && salePercentage === 0) {
            setOnSale(false);
        }

        const productToUpdate = {
            _id: productId,
            name,
            brand,
            category,
            description,
            price,
            countInStock,
            images: images.length === 0 ? ['https://placehold.co/1200x1000'] : images,
            onSale,
            salePercentage,
            salePrice
        };


        const res = await updateProductById(productToUpdate);

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Product updated!');
            refetch();
            navigate(`/product/${productId}`);
        }
    }


    const uploadImagesHandler = async (e) => {
        const formData = new FormData();
        console.log(e.target.files);
        
        // const fileInputs = e.target.files;
        // for (let i = 0; i < fileInputs.length; i++) {
        //     formData.append('image', fileInputs[i]);
        // }

        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImages(formData).unwrap();
            console.log(res);
            setImages([...images, res.imageUrl]);
            toast.success(res.message);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/products/all">
                <FaAngleLeft /> Go Back
            </Link>
            <FormContainer>
                <Meta title='Edit product - ByteBuy' />
                <h2 className='mb-4'>Edit {name}</h2>

                { isFetchingProductLoading ? (
                    <SpinnerGif />
                ) : errorFetchProduct ? (
                    <Message variant='danger'>
                        { errorFetchProduct?.data?.message || errorFetchProduct.error}
                    </Message>
                ) : (
                    <Form onSubmit={updateProductHandler}>
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
                                row='5'
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
                        
                        <Form.Group controlId='isOnSale' className='my-2'>
                            <Form.Label>Is on Sale: </Form.Label>
                            <Form.Control
                                type='text'
                                value={onSale ? 'Yes' : 'No'}
                                readOnly
                                className='mb-2'
                            />                    
                        </Form.Group>

                        <Form.Group controlId='setOnSale' className='my-4 mx-3'>
                            <Form.Check
                                type='switch'
                                label='Set product on sale?'
                                checked={onSale}
                                onChange={showOnSaleInput}
                            >

                            </Form.Check>
                        </Form.Group>

                        {
                            onSale && (
                                <>
                                    <Form.Group controlId='salePrice' className='my-2'>
                                        <Form.Label>Sale Price: </Form.Label>
                                        <InputGroup className='my-2'>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control
                                                type='number'
                                                value={salePrice}
                                                onChange={e => salePriceChangeHandler(e.target.value)}
                                            ></Form.Control>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId='salePercentage' className='my-2'>
                                        <Form.Label>Sale Percentage: </Form.Label>
                                        <InputGroup className='my-2'>
                                            <Form.Control
                                                type='number'
                                                value={salePercentage}
                                                onChange={e => salePercentageChangeHandler(e.target.value)}
                                            ></Form.Control>
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </>
                            )
                        }


                        <Button
                            type='submit'
                            variant='primary'
                            className='my-3 px-4'
                            disabled = {isUpdatingProductLoading}
                        >
                            {
                                isUpdatingProductLoading ? (<> <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />  Updating product...</>
                                    ) : (
                                    <>Update Product <FaPen /></>
                                )
                            }
                        </Button>
                    </Form>
                ) }
            </FormContainer>
        </>
    )
}

export default EditProductScreen