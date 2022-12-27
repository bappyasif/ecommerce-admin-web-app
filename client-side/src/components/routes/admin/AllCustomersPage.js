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

const AddNewCustomer = ({handleAddCustomer}) => {
    let [beginEntry, setBeginEntry] = useState(false)

    const handleClick = () => setBeginEntry(prev => !prev)

    return (
        <>
            <button className='bg-orange-800 relative' onClick={handleClick}>Click Here To {`${beginEntry ? "Close" : "Open"} `}Form</button>
            {beginEntry ? <RenderAddCustomerForm addNewCustomer={handleAddCustomer} /> : null}
        </>
    )
}

const RenderAddCustomerForm = ({addNewCustomer}) => {
    let [data, setData] = useState(null);

    const appCtx = useContext(AppContext);

    const userInputChangeHandler = (evt, whichFormControl) => setData(prev => ({ ...prev, [whichFormControl]: evt.target.value }))

    const formControls = [
        {id: "name", label: "Full Name", type: "text", placeholder: "e.g. Jelo Lohan", changeHandler: userInputChangeHandler},
        {id: "digits", label: "Mobile Number", type: "tel", placeholder: "e.g. +88012345678901", changeHandler: userInputChangeHandler},
        {id: "password", label: "Account Password", type: "password", placeholder: "e.g. secret password", changeHandler: userInputChangeHandler},
    ];

    let renderFormControls = () => formControls?.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    const handleServerResponse = (results) => {
        // console.log(results)
        if(results?.user) {
            addNewCustomer(results.user)
        } else if(results.msg && !results?.user) {
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
        <div className='z-10 bg-lime-600 p-4'>
            <form method='post' onSubmit={handleSubmit}>
                <legend>Enter All Fields Correctly</legend>
                {renderFormControls()}
                <RenderFormSubmitButton text={"Add Customer"} />
            </form>
        </div>
    )
}

const RenderCustomersList = ({ dataset, handleRemoveCustomer }) => {
    let renderCustomers = () => dataset?.map(item => <RenderCustomer key={item.mobileNumber} item={item} handleRemoveCustomer={handleRemoveCustomer} />)
    return (
        <div>
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
        <div>
            <Link to={mobileNumber}>
                <RenderItemDetail preText={"Customer Name: "} value={customerName} />
                <img src='https://source.unsplash.com/featured/300x202' />
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
        <button onClick={handleClick}>Delete</button>
    )
}

export default AllCustomersPage