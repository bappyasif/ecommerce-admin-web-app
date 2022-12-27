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
        <div className='flex gap-6 px-12 py-6'>
            <GreetingSection />
            <OverviewSection />
        </div>
    )
}

const OverviewSection = () => {
    const appCtx = useContext(AppContext);
    const baseUrl = `${appCtx.baseUrl}`
    const sections = [
        { url: `${baseUrl}/all-orders`, text: "Total Orders", path: "all-orders" },
        { url: `${baseUrl}/all-products`, text: "Total Products", path: "all-products" },
        { url: `${baseUrl}/all-customers`, text: "Total Customers", path: "all-customers" },
    ];

    let renderSections = () => sections.map(section => <RenderSection key={section.text} item={section} />)

    return (
        <>
            {renderSections()}
        </>
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
            <div>
                <h4>{item.text}</h4>
                <p>{counts}</p>
            </div>
        </Link>
    )
}

const GreetingSection = () => {
    return (
        <div>
            <h2>Welcome, Dear Admin</h2>
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
        <form method='post' onSubmit={handleSubmit}>
            <legend>enter your admin secret</legend>
            {renderFormControls()}
            <RenderFormSubmitButton text={"Access"} />
        </form>
    )
}

export default AdminPage