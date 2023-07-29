import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import SpinnerGif from '../../components/SpinnerGif';
import { useGetAllShippingAddressQuery } from '../../slices/addressApiSlice';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { PAGINATION_ADDRESS_ADMIN } from '../../utils/constant';
import Meta from '../../components/Meta';

const AddressListScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error } = useGetAllShippingAddressQuery({ pageNumber: pageNumber || 1 });
    console.log(data);

    return (
        <>
            <Meta title='Address List - ByteBuy' />

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
                                    <th>Apartment Number</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Postal Code</th>
                                    <th>Country</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.address.map((address, index) => (
                                    <tr key={address._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/admin/user/${address.user._id}/edit`}>
                                                {address.user.name}
                                            </Link>
                                        </td>
                                        <td>{address.apartmentNumber}</td>
                                        <td>{address.street}</td>
                                        <td>{address.city}</td>
                                        <td>{address.state}</td>
                                        <td>{address.postalCode}</td>
                                        <td>{address.country}</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${address.user._id}/edit`}>
                                                <Button 
                                                    variant='outline-secondary' 
                                                    className='mx-2 btn-sm'
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Paginate
                            pages={data.pages}
                            currentPage={data.currentPage}
                            paginationType={PAGINATION_ADDRESS_ADMIN}
                        />
                    </>
                )}
        </>
    )
}

export default AddressListScreen