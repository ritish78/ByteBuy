import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { 
    useGetUserDetailsByIdQuery,
    useUpdateUserByIdMutation 
} from '../../slices/usersApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaAngleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from './../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import Meta from '../../components/Meta';


const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    
    const { data: userDetails, isLoading: isFetchingUserDetailsLoading, error: errorFetchUserDetails, refetch } = useGetUserDetailsByIdQuery(userId);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name);
            setEmail(userDetails.email);
            setIsAdmin(userDetails.isAdmin);
        }
    }, [userDetails]);

    const [updateUserById, { isLoading: isUpdatingUserLoading }] = useUpdateUserByIdMutation();

    const userAdminChangeHandler = () => {
        setIsAdmin(!isAdmin);
    }


    const updateUserHandler = async (e) => {
        e.preventDefault();

        try {
            await updateUserById({
                userId,
                name,
                email,
                isAdmin
            });

            toast.success('User updated!');
            refetch();
            navigate('/admin/users/all');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <>
            <Meta title='Edit User - ByteBuy' />
            <Link className="btn btn-light my-3" to="/admin/users/all">
                <FaAngleLeft /> Go Back
            </Link>
            <FormContainer>
                <h2 className='mb-4'>Edit {name}</h2>

                { isFetchingUserDetailsLoading ? (
                    <SpinnerGif />
                ) : errorFetchUserDetails ? (
                    <Message variant='danger'>
                        { errorFetchUserDetails?.data?.message || errorFetchUserDetails.error}
                    </Message>
                ) : (
                    <Form onSubmit={updateUserHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>User's Name: </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Name of user'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email of user'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Label>Is {name} admin? </Form.Label>
                            <Form.Control
                                type='text'
                                value={isAdmin ? 'Yes' : 'No'}
                                readOnly
                                className='mb-2'
                            />                    
                        </Form.Group>

                        <Form.Group controlId='setAdmin' className='my-4 mx-3'>
                            <Form.Check
                                type='switch'
                                label='Set user as admin?'
                                checked={isAdmin}
                                onChange={userAdminChangeHandler}
                            >
                            </Form.Check>
                        </Form.Group>



                        <Button
                            type='submit'
                            variant='primary'
                            className='my-3 px-4'
                            disabled = {isUpdatingUserLoading}
                        >
                            {
                                isUpdatingUserLoading ? (<> <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />  Updating user...</>
                                    ) : (
                                    <>Update user <FaPen /></>
                                )
                            }
                        </Button>
                    </Form>
                ) }
            </FormContainer>
        </>
    )
}

export default UserEditScreen