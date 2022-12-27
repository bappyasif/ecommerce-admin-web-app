import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { sendDataToServer } from '../fetchRequests';
import { RenderFormControlFieldset, RenderFormSubmitButton } from "./CustomerLoginPage"

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
                    ? "Welcome Admin"
                    : null
            }
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