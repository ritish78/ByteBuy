import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserProfileQuery } from '../../slices/authApiSlice';
import SpinnerGif from '../SpinnerGif';
import { setCredentials } from '../../slices/authSlice';

const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    const { data: userProfile, isLoading: isProfileLoading } = useGetUserProfileQuery();

    const dispatch = useDispatch();
    dispatch(setCredentials(userProfile));
    
    return (
        isProfileLoading ? <SpinnerGif /> : userInfo && userProfile && userProfile.isAdmin ? <Outlet /> : <Navigate to='/' replace/>
    )
}

export default AdminRoute;