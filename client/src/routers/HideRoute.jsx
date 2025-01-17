import React from 'react';
import { Navigate } from 'react-router-dom';

const HideRoute = ({ element, hide }) => {
    const token = localStorage.getItem("token");

    if (token && hide) {
        return <Navigate to="/" />
    }
    return element;
};

export default HideRoute;
