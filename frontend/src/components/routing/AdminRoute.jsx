import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../../slices/authApiSlice';
import SpinnerGif from '../SpinnerGif';

const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    const { data: userProfile, isLoading: isProfileLoading } = useGetUserProfileQuery();

    return (
        isProfileLoading ? <SpinnerGif /> : userInfo && userProfile && userProfile.isAdmin ? <Outlet /> : <Navigate to='/' replace/>
    )
}

export default AdminRoute;