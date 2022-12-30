import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MdHome, MdInventory, MdLockOpen, MdAppRegistration, MdAdminPanelSettings, MdInventory2, MdLock } from "react-icons/md"
import { AppContext } from '../App';
import { useToCloseModalOnClickedOutside } from './hooks';
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
    { name: "Admin", icon: <MdAdminPanelSettings />, path: "/admin" }
];

function MainNavigation() {
    const appCtx = useContext(AppContext)

    return (
        <div
            className='main-navigation'
        >
            {
                appCtx?.user?.accessToken
                    ?
                    <RenderMenus menus={menusGroupTwee} showMenu={appCtx?.user?.accessToken} />
                    :
                    <RenderMenus menus={menusGroupEen} />
            }
        </div>
    )
}

const RenderMenus = ({ menus, showMenu }) => {
    let renderMenus = () => menus.map(item => <RenderMenuItem key={item.name} item={item} />)

    return (
        <nav className='flex justify-between bg-teal-100'>
            <div className='flex gap-2 px-20 mb-10'>
                {renderMenus()}
            </div>

            {
                showMenu
                ? <LoggedInUserSettings />
                : null
            }
        </nav>
    )
}

const LoggedInUserSettings = () => {
    let [showMenu, setShowMenu] = useState(false);

    const ref = useRef()

    const menuOptionsList = [
        { name: "Products", path: "/products", icon: <MdInventory2 /> },
        { name: "Logout", path: "/logout", icon: <MdLock /> },
    ];

    const handleToggleDropdown = () => setShowMenu(prev => !prev)

    const handleCloseDropdown = () => setShowMenu(false);

    useToCloseModalOnClickedOutside(ref, handleCloseDropdown)

    return (
        <div ref={ref} class="dropdown relative mr-11 mt-1.5">
            <a class="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"
                onClick={handleToggleDropdown}
            >
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-full"
                    style={{ height: "27px", width: "33px" }} alt="" loading="lazy" />
            </a>
            <DropdownOptions options={menuOptionsList} showMenu={showMenu} handleCloseDropdown={handleCloseDropdown} />
        </div>
    )
}

const DropdownOptions = ({ options, showMenu, handleCloseDropdown }) => {
    const renderOptions = () => options?.map(item => <RenderDropdownOption key={item.name} item={item} handleCloseDropdown={handleCloseDropdown} />)

    return (
        <ul
            class={`dropdown-menu min-w-max absolute bg-white text-base z-50
            float-left py-2 list-none text-left rounded-lg shadow-lg mt-1
            m-0 bg-clip-padding border-none left-auto right-0 ${showMenu ? "visible" : "hidden"}`}
            aria-labelledby="dropdownMenuButton2"
        >
            {renderOptions()}
        </ul>
    )
}

const RenderDropdownOption = ({ item, handleCloseDropdown }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        handleCloseDropdown()
        navigate(item.path)
    }
    
    return (
        <li
            onClick={clickHandler}
        >
            <a
                class="flex gap-2 items-center text-sm py-2 px-2 font-normal w-full whitespace-nowrap
                       bg-transparent text-gray-700 hover:bg-gray-100 "
                href="#"
            >
                <span>{item.icon}</span>
                <span>{item.name}</span>
            </a>
        </li>
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