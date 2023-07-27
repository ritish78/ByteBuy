import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetAllUsersQuery, useDeleteUserByIdMutation } from '../../slices/usersApiSlice'; 
import { Table, Button, Modal, Spinner } from 'react-bootstrap';
import { FaTimes, FaTrashAlt, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';
import { PAGINATION_USER_ADMIN } from '../../utils/constant';

const UserListScreen = () => {
    const { pageNumber } = useParams();
    const [showModal, setShowModal] = useState('');
    const [usernameToDelete, setUsernameToDelete] = useState('');
    const [userEmailToDelete, setUserEmailToDelete] = useState('');
    const [userIdToDelete, setUserIdToDelete] = useState('');

    const { data: listOfUsers, isLoading, error, refetch } = useGetAllUsersQuery({ pageNumber: pageNumber || 1 });
    console.log(listOfUsers);
    const [deleteUserById, { isLoading: isDeletingUserLoading }] = useDeleteUserByIdMutation();

    const showModalHandler = () => {
        setShowModal(true);
    }
        
    const closeModalHandler = () => {
        setShowModal(false);
    }

    const deleteUserHandler = async () => {
        if (userIdToDelete) {
            try {
                await deleteUserById(userIdToDelete);

                closeModalHandler();
                toast.success('User deleted!');
                setUsernameToDelete('');
                setUserEmailToDelete('');
                setUserIdToDelete('');

                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    return (
        <>
            <h2>Users</h2>
            {isLoading ? 
                <SpinnerGif /> 
                : error 
                ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
                : (
                    <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Joined At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfUsers.users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/admin/user/${user._id}/edit`}>
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: 'green' }} />
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>{user.createdAt.substring(0, 10)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button className='mx-2 btn-sm' variant='light'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button 
                                            variant='outline-danger' 
                                            className='mx-2 btn-sm'
                                            onClick={() => {
                                                showModalHandler();
                                                setUserIdToDelete(user._id);
                                                setUsernameToDelete(user.name);
                                                setUserEmailToDelete(user.email);
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
                        pages={listOfUsers.pages}
                        currentPage={listOfUsers.currentPage}
                        paginationType={PAGINATION_USER_ADMIN}
                    />
                    <Modal show={showModal} onHide={closeModalHandler}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete user?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                usernameToDelete && userEmailToDelete && (
                                    <>
                                        <p>Would you like to remove <b>{usernameToDelete}</b> associated with the email <b>{userEmailToDelete}</b>?</p>
                                        <p>This action will result in the user being unable to access their account as this action is irreversible.</p>
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
                                onClick={() => deleteUserHandler()}
                                disabled={isDeletingUserLoading}
                            >
                                {
                                    isDeletingUserLoading ? (
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
            )}
        </>
    )
}

export default UserListScreen