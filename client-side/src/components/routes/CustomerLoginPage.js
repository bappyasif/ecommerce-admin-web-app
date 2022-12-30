import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { sendDataToServer } from '../fetchRequests';

function CustomerLoginPage() {
    const appCtx = useContext(AppContext);

    const navigate = useNavigate()

    const handleJwt = (data) => {
        appCtx.handleUserData({ accessToken: data.accessToken, refreshToken: data.refreshToken })
        navigate("/")
    }

    const handleLogin = (data) => {
        const url = `${appCtx.baseUrl}/access-tokens`;

        sendDataToServer(url, { digits: `${data.user.mobileNumber}` }, handleJwt)

        // user data will be updated only when there is a valid user exists in response data
        appCtx.handleUserData(data.user)
    }

    const commenceCustomerLogin = (data) => {
        const url = `${appCtx.baseUrl}/login`;
        sendDataToServer(url, data, handleLogin)
    }

    return (
        <div className='flex justify-center'>
            <LoginForm commenceLogin={commenceCustomerLogin} />
        </div>
    )
}

const LoginForm = ({ commenceLogin }) => {
    let [data, setData] = useState({})

    const userInputChangeHandler = (evt, whichFormControl) => setData(prev => ({ ...prev, [whichFormControl]: evt.target.value }))

    const formControls = [
        { id: "digits", label: "Mobile Number", type: "tel", placeholder: "e.g. +88012345678901", changeHandler: userInputChangeHandler },
        { id: "password", label: "Account Password", type: "password", placeholder: "e.g. secret password", changeHandler: userInputChangeHandler }
    ];

    let renderFormControls = () => formControls.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        if (checkMobileNumber(data.digits)) {
            commenceLogin(data)
        } else {
            alert("Mobile Number needs to be a Bangladeshi Mobile number. Format is +8801234567890")
        }
    }

    return (
        <form
            method='post' onSubmit={handleSubmit}
            className="bg-zinc-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <legend className='text-2xl'>Enter your registered Mobile Number and Password to login</legend>
            {renderFormControls()}
            <RenderFormSubmitButton text={"Login"} />
        </form>
    )
}

export const RenderFormControlFieldset = ({ item }) => {
    return (
        <fieldset className='my-6'>
            <label
                className='block text-gray-700 text-lg font-bold mb-2 text-justify before:content-["*"] before:mr-2'
                htmlFor={item.id}
            >{item.label}</label>
            <input
                className='shadow appearance-none border rounded text-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type={item.type}
                id={item.id}
                name={item.id}
                onChange={(e) => item.changeHandler(e, item.id)}
                placeholder={item.placeholder}
                required
            // pattern={item.id === "digits" ? "(?:\+)(?=880)\d{13}|(?=880)\d{13}|(?=0)\d{11}" : null}
            />
        </fieldset>
    )
}

export const RenderFormSubmitButton = ({ text }) => {
    return (
        <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
            type='submit'
        >{text}</button>
    )
}

export const checkMobileNumber = (digits) => {
    let regExp = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/g
    let check = regExp.test(digits)
    return check
}

export default CustomerLoginPage