import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaStore, FaTshirt, FaUsers, FaMapMarked } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../slices/usersApiSlice';
import { logout } from './../slices/authSlice';
import logo from './../assets/logo.png';
import { toast } from 'react-toastify';
import { removeAddress } from '../slices/addressSlice';
import { clearCartItems } from '../slices/cartSlice';

const Header = () => {
    //state.cart is the reducer in store
    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ logoutUser ] = useLogoutUserMutation();

    const logoutUserHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            dispatch(clearCartItems());
            dispatch(removeAddress());
            toast.success('Logged out succesfully!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Logout Unsuccessful!');
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt='ByteBuy Logo' />{'  '}
                            ByteBuy
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='primary' style={{ marginLeft: '5px' }}>
                                                {
                                                    cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)
                                                }
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><FaUser />{'  '}Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutUserHandler}><FaSignOutAlt />{'  '}Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link><FaUser /> Log In</Nav.Link>
                                    </LinkContainer>
                            )}

                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminfunctions'>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item><FaStore />{' '}View Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item><FaTshirt />{' '}View Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item><FaUsers />{' '}View Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/addresslist'>
                                            <NavDropdown.Item><FaMapMarked />{' '}View Address</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
