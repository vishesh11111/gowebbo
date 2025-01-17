import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./PrivateRoutes"
import {routesData} from "./data"
import HideRoute from './HideRoute';

const AllRoutes = () => {
    return (
        <Routes>
            {routesData.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    // element={route?.element}
                    element={route?.isPrivate ? <PrivateRoute element={route?.element} /> : <HideRoute element={route?.element} hide={route?.hide}/>}
                />
            ))}
        </Routes>
    )
}

export default AllRoutes
