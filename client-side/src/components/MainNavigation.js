import React from 'react'
import { Link } from "react-router-dom"
import {MdHome, MdInventory, MdLockOpen, MdAppRegistration, MdAdminPanelSettings} from "react-icons/md"
// menus for unauthenticated users
const menusGroupEen = [
    { name: "Home", icon: <MdHome />, path: "/" },
    { name: "Products", icon: <MdInventory />, path: "/products" },
    { name: "Login", icon: <MdLockOpen />, path: "/login" },
    { name: "Register", icon: <MdAppRegistration />, path: "/register" },
    { name: "Admin", icon: <MdAdminPanelSettings />, path: "/admin" }
];

// menus for authenticated users
const menusGroupTwee = [
    { name: "Home", icon: <MdHome />, path: "/" },
    { name: "Products", icon: <MdInventory />, path: "/products" },
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
        <nav className='flex gap-2 px-20 mb-10'>
            {renderMenus()}
        </nav>
    )
}

const RenderMenuItem = ({ item }) => {
    return (
        <Link to={item.path}>
            <div className='w-fit font-extrabold bg-gradient-to-br from-stone-200 to-zinc-500 flex gap-4 items-center px-6 py-1 rounded
            hover:bg-gradient-to-tl hover:text-slate-900'>
                <span className='text-2xl'>{item.icon}</span>
                <span className='text-2xl'>{item.name}</span>
            </div>
        </Link>
    )
}

export default MainNavigation