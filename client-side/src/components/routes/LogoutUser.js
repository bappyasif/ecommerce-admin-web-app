import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { logoutUserFromApp } from "../fetchRequests"

function LogoutUser() {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const handleAfterLogout = (msg) => {
        appCtx.handleUserData({ accessToken: null, refreshToken: null, hashedPassword: null, mobileNumber: null, customerName: null })
        navigate("/")
    }

    const beginLoggingOut = () => {
        const url = `${appCtx.baseUrl}/logout`
        logoutUserFromApp(url, {refreshToken: appCtx.user.refreshToken}, handleAfterLogout)
    }

    useEffect(() => {
        beginLoggingOut()
    }, [])

    return (
        <div>LogoutUser</div>
    )
}

export default LogoutUser