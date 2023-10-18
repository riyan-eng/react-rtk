import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken")
    const location = useLocation();
    return (
        accessToken ? children : <Navigate to={'/auth/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth