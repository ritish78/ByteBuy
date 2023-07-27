import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

//import for Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserPastOrdersScreen from './screens/UserPastOrdersScreen';
import AddressScreen from './screens/AddressScreen';
//import for admin Screens 
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import CreateProductScreen from './screens/admin/CreateProductScreen';
import EditProductScreen from './screens/admin/EditProductScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

import { Provider } from 'react-redux';
import store from './redux/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/products/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/signup' element={<SignUpScreen />} />

      <Route path='' element={<PrivateRoute />} >
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/orders' element={<UserPastOrdersScreen />} />
        <Route path='/orders/:pageNumber' element={<UserPastOrdersScreen />} />
        <Route path='/address' element={<AddressScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />} >
        <Route path='/admin/orders/all' element={<OrderListScreen />} />
        <Route path='/admin/orders/all/:pageNumber' element={<OrderListScreen />} />
        <Route path='/admin/products/all' element={<ProductListScreen />} />
        <Route path='/admin/products/all/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/create' element={<CreateProductScreen />} />
        <Route path='/admin/product/:id/edit' element={<EditProductScreen />} />
        <Route path='/admin/users/all' element={<UserListScreen />} />
        <Route path='/admin/users/all/:pageNumber' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();