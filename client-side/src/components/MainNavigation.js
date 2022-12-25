import React from 'react'
import { Link } from "react-router-dom"
// menus for unauthenticated users
const menusGroupEen = [
    { name: "Home", icon: null, path: "/" },
    { name: "Products", icon: null, path: "/products" },
    { name: "Login", icon: null, path: "/login" },
    { name: "Register", icon: null, path: "/register" },
    { name: "Admin", icon: null, path: "/admin" }
];

// menus for authenticated users
const menusGroupTwee = [
    { name: "Home", icon: null, path: "/" },
    { name: "Products", icon: null, path: "/products" },
    { name: "Admin", icon: null, path: "/admin" }
];

function MainNavigation() {

    return (
        <div
            className='main-navigation'
        >
            <PublicMenus />
        </div>
    )
}

const PublicMenus = () => {
    let renderMenus = () => menusGroupEen.map(item => <RenderMenuItem key={item.name} item={item} />)

    return (
        <nav className='flex gap-2 px-20'>
            {renderMenus()}
        </nav>
    )
}

const RenderMenuItem = ({ item }) => {
    return (
        <Link to={item.path}>
            <div className='w-20 bg-lime-600 rounded-sm'>
                <span>{item.icon}</span>
                <span>{item.name}</span>
            </div>
        </Link>
    )
}

export default MainNavigation