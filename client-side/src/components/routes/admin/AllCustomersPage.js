import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';
import { deleteDataFromServer, sendDataToServer } from '../../fetchRequests';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { RenderFormControlFieldset, RenderFormSubmitButton } from '../CustomerLoginPage';
import { RenderItemDetail } from './AllOrdersPage';

function AllCustomersPage() {
    let [data, setData] = useState([]);

    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-customers`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    console.log(dataset, "cutomerds!!")

    const handleData = () => {
        setData(dataset)
    }

    const handleRemoveCustomer = (id) => {
        setData(prev => {
            const filtered = prev.filter(item => item.mobileNumber != id)
            return filtered
        })
    }

    const handleAddCustomer = (item) => {
        setData(prev => [...prev, item])
    }

    useEffect(() => {
        handleData()
    }, [dataset])

    return (
        <div>
            <AddNewCustomer handleAddCustomer={handleAddCustomer} />
            <RenderCustomersList dataset={data} handleRemoveCustomer={handleRemoveCustomer} />
            {/* <RenderCustomersList dataset={dataset?.length ? dataset[0] : []} /> */}
        </div>
    )
}

const AddNewCustomer = ({ handleAddCustomer }) => {
    let [beginEntry, setBeginEntry] = useState(false)

    const handleClick = () => setBeginEntry(prev => !prev)

    return (
        <>
            <button className='text-4xl px-4 py-2 font-extrabold m-4 bg-orange-800 hover:bg-pink-600 relative' onClick={handleClick}>Click Here To {`${beginEntry ? "Close" : "Open"} `} Customer Form</button>
            {beginEntry ? <RenderAddCustomerForm addNewCustomer={handleAddCustomer} /> : null}
        </>
    )
}

const RenderAddCustomerForm = ({ addNewCustomer }) => {
    let [data, setData] = useState(null);

    const appCtx = useContext(AppContext);

    const userInputChangeHandler = (evt, whichFormControl) => setData(prev => ({ ...prev, [whichFormControl]: evt.target.value }))

    const formControls = [
        { id: "name", label: "Full Name", type: "text", placeholder: "e.g. Jelo Lohan", changeHandler: userInputChangeHandler },
        { id: "digits", label: "Mobile Number", type: "tel", placeholder: "e.g. +88012345678901", changeHandler: userInputChangeHandler },
        { id: "password", label: "Account Password", type: "password", placeholder: "e.g. secret password", changeHandler: userInputChangeHandler },
    ];

    let renderFormControls = () => formControls?.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    const handleServerResponse = (results) => {
        // console.log(results)
        if (results?.user) {
            addNewCustomer(results.user)
        } else if (results.msg && !results?.user) {
            alert(results.msg)
        }
    }

    const beginEntry = () => {
        const url = `${appCtx.baseUrl}/register`
        sendDataToServer(url, data, handleServerResponse)
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        console.log(data, "formdaata!!")
        beginEntry();
    }

    return (
        <div className='z-10 bg-slate-400 p-4 absolute left-1/3 w-2/6 rounded'>
            <form method='post' onSubmit={handleSubmit}>
                <legend className='text-2xl'>Enter All Fields Correctly</legend>
                {renderFormControls()}
                <RenderFormSubmitButton text={"Add Customer"} />
            </form>
        </div>
    )
}

const RenderCustomersList = ({ dataset, handleRemoveCustomer }) => {
    let renderCustomers = () => dataset?.map(item => <RenderCustomer key={item.mobileNumber} item={item} handleRemoveCustomer={handleRemoveCustomer} />)
    return (
        <div className='flex gap-11 flex-wrap justify-around'>
            {
                dataset?.length === 0
                    ?
                    <>
                        <p>No More Customers Found!!</p>
                        <Link to={"/admin"}>Dashboard</Link>
                    </>
                    : null
            }
            {renderCustomers()}
        </div>
    )
}

const RenderCustomer = ({ item, handleRemoveCustomer }) => {
    const { mobileNumber, customerName } = { ...item }
    const appCtx = useContext(AppContext);
    const url = `${appCtx.baseUrl}/all-customers/${mobileNumber}`

    return (
        <div className='flex flex-col gap-4 border-2 border-teal-400 my-2
        rounded-lg shadow-lg bg-slate-200 w-1/3 py-8 px-16'>
            <Link to={mobileNumber}>
                <RenderItemDetail preText={"Customer Name: "} value={customerName} />
                {/* <img className='rounded-t-lg max-w-min h-full m-auto' src='https://source.unsplash.com/featured/300x202' /> */}
                <img className="rounded-lg shadow-lg antialiased" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
            </Link>
            <DeleteItem uniqueId={mobileNumber} url={url} handleRemoveItem={handleRemoveCustomer} />
        </div>
    )
}

export const DeleteItem = ({ uniqueId, url, handleRemoveItem }) => {
    const dataHandler = results => {
        console.log(results)
        handleRemoveItem(uniqueId);
    }

    const handleClick = () => {
        deleteDataFromServer(url, dataHandler)
    }

    return (
        <button className='p-2 mt-8 text-3xl font-extrabold rounded px-6 bg-pink-900 hover:bg-pink-600 hover:text-white' onClick={handleClick}>Delete</button>
    )
}

export default AllCustomersPage