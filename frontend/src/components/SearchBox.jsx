import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword] = useState(urlKeyword || '');

    const searchProductHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword.trim()}`);
        } else {
            navigate('/');
        }
    }

    return (
        <Form onSubmit={searchProductHandler} className='d-flex'>
            <InputGroup>
                <Form.Control
                    type='text'
                    name='query'
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder='Search...'
                    className='mr-sm-2 ml-sm-5 mb-2'
                ></Form.Control>
                <Button
                    type='submit'
                    variant='outline-primary'
                    className='mb-2 px-3'
                    id='button-addon2'
                >
                    <FaSearch />
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBox