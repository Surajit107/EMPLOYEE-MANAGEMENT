import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ManagerAccess = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const USER_TYPE = user?.user_type;
    return (
        <>
            {
                USER_TYPE === "admin" ? <Outlet /> : <Navigate to='/access-error' />
            }
        </>
    )
}

export default ManagerAccess