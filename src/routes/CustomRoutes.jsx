import React from 'react'
import { Route, Routes } from 'react-router'
import { Home, Like, Search, Single } from "../pages/Dashboard"

function CustomRoutes() {
    const routerList = [
        {
            id: 1,
            path: "/",
            element: <Home />
        },
        {
            id: 2,
            path: "/liked",
            element: <Like />
        },
        {
            id: 3,
            path: "/search",
            element: <Search />
        },
        {
            id: 4,
            path: "/single",
            element: <Single />
        },
    ]
    return (
        <Routes>
            {routerList.map(item => <Route path={item.path} element={item.element} />)}
        </Routes>
    )
}

export default CustomRoutes