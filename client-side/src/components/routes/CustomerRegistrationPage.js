import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { sendDataToServer } from '../fetchRequests';
import { RenderFormControlFieldset, RenderFormSubmitButton } from './CustomerLoginPage'

function CustomerRegistrationPage() {
    // let [user, setUser] = useState({});

    const appCtx = useContext(AppContext);

    const navigate = useNavigate()

    const handleRegistration = (data) => {
        // setUser(data)
        appCtx.handleUserData(data.user)
        navigate("/login");
    }

    const commenceCustomerRegistration = (data) => {
        const url = `${appCtx.baseUrl}/register`;
        sendDataToServer(url, data, handleRegistration)
    }

    // console.log(user, "Registered USER!!")
    // console.log(appCtx.user, "Registered USER!!")

    return (
        <div className='flex justify-center'>
            <RegistrationForm commenceRegistration={commenceCustomerRegistration} />
        </div>
    )
}

const RegistrationForm = ({ commenceRegistration }) => {
    let [data, setData] = useState({})

    const userInputChangeHandler = (evt, whichFormControl) => setData(prev => ({ ...prev, [whichFormControl]: evt.target.value }))

    const formControls = [
        { id: "name", label: "Full Name", type: "text", placeholder: "e.g. Jelo Lohan", changeHandler: userInputChangeHandler },
        { id: "digits", label: "Mobile Number", type: "tel", placeholder: "e.g. +88012345678901", changeHandler: userInputChangeHandler },
        { id: "password", label: "Account Password", type: "password", placeholder: "e.g. secret password", changeHandler: userInputChangeHandler },
        // {id: "confirm", label: "Confirm Password", type: "password", placeholder: "e.g. secret password", changeHandler: userInputChangeHandler}
    ];

    let renderFormControls = () => formControls.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        commenceRegistration(data)
    }

    // console.log(data)

    return (
        <form
            className="bg-zinc-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method='post' onSubmit={handleFormSubmit}
        >
            <legend className='text-2xl'>
                <p>You need to use a Bangladesh based mobile number to register</p>
                <p>You will be using this to Login to your account later on</p>
            </legend>
            {renderFormControls()}
            <RenderFormSubmitButton text={"Register"} />
        </form>
    )
}

export default CustomerRegistrationPage