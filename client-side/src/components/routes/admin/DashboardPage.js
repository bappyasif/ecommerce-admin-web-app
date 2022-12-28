import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';
import { readDataFromServer, sendDataToServer } from '../../fetchRequests';
import { RenderFormControlFieldset, RenderFormSubmitButton } from "../CustomerLoginPage"

function AdminPage() {
    const appCtx = useContext(AppContext);

    return (
        <div>
            {
                !appCtx.isAdmin
                    ? <AdminLoginForm appCtx={appCtx} />
                    : null
            }
            {
                appCtx.isAdmin
                    ? <AdminDashboard />
                    : null
            }
        </div>
    )
}

const AdminDashboard = () => {
    return (
        <div className='flex justify-between px-20 py-6 gap-10'>
            <GreetingSection />
            <OverviewSection />
        </div>
    )
}

const OverviewSection = () => {
    const appCtx = useContext(AppContext);
    const baseUrl = `${appCtx.baseUrl}`
    const sections = [
        { url: `${baseUrl}/all-orders`, text: "Total Orders", path: "all-orders", bgClr: "bg-lime-400" },
        { url: `${baseUrl}/all-products`, text: "Total Products", path: "all-products", bgClr: "bg-green-400" },
        { url: `${baseUrl}/all-customers`, text: "Total Customers", path: "all-customers", bgClr: "bg-emerald-400" },
    ];

    let renderSections = () => sections.map(section => <RenderSection key={section.text} item={section} />)

    return (
        <div className='flex justify-around w-full gap-10'>
            {renderSections()}
        </div>
    )
}

const RenderSection = ({ item }) => {
    let [counts, setCounts] = useState(null);

    const dataHandler = dataset => {
        if (dataset?.users) {
            setCounts(dataset.users.length)
        } else if (dataset?.products) {
            setCounts(dataset.products.length)
        } else if (dataset?.orders) {
            setCounts(dataset.orders.length)
        }
    }

    readDataFromServer(item.url, dataHandler)

    return (
        <Link to={`/admin/${item.path}`}>
            <div className={`flex flex-col justify-center items-center
                            rounded-lg shadow-lg ${item.bgClr} py-8 px-20 h-60 w-full`}>
                <h4 className='text-4xl'>{item.text}</h4>
                <p className='text-6xl'>{counts}</p>
            </div>
        </Link>
    )
}

const GreetingSection = () => {
    return (
        <div className='flex flex-col justify-center items-center
        rounded-lg shadow-lg bg-teal-600 w-full'>
            <h2 className='text-6xl'>Welcome, Dear Admin</h2>
        </div>
    )
}

const AdminLoginForm = ({ appCtx }) => {
    let [adminSecret, setAdminSecret] = useState(null);

    const navigate = useNavigate()

    const userInputChangeHandler = evt => setAdminSecret(evt.target.value)

    const formControls = [
        { id: "secret", label: "Secret Code", type: "text", placeholder: "e.g. root", changeHandler: userInputChangeHandler },
    ]

    const adminAccessConfirmationUpdater = (data) => {
        if (data.success) {
            alert("Welcome Admin")
            appCtx.handleIsAdminTrue()
        } else {
            alert("No intrusion is encouraged, try again")
            navigate("/products")
        }
    }

    const handleAdminAccess = () => {
        const url = `${appCtx.baseUrl}/admin-login`
        sendDataToServer(url, { secret: adminSecret }, adminAccessConfirmationUpdater)
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        handleAdminAccess()
    }

    let renderFormControls = () => formControls.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    return (
        <div className='max-w-fit m-auto bg-gray-200 my-11 px-11 py-4 rounded'>
            <form method='post' onSubmit={handleSubmit}>
                <legend className='text-2xl'>enter your admin secret</legend>
                {renderFormControls()}
                <RenderFormSubmitButton text={"Access"} />
            </form>
        </div>
    )
}

export default AdminPage