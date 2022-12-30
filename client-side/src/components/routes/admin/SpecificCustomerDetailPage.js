import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../../App';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { DeleteItem } from './AllCustomersPage';
import { GoBackToOrders } from './SpecificOrderDetailPage';

function SpecificCustomerDetailPage() {
    const appCtx = useContext(AppContext);

    const params = useParams();

    const url = `${appCtx.baseUrl}/all-customers/${params.custId}`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    return (
        <div>
            <h2 className='text-4xl py-2 font-semibold bg-neutral-600 mb-4'>Customer Detail</h2>
            <GoBackToOrders text={"Customers"} />
            <RenderCustomer dataset={dataset} />
            <GoBackToOrders text={"Customers"} />
        </div>
    )
}

const RenderCustomer = ({ dataset }) => {
    const { mobileNumber, hashedPassword, customerName } = { ...dataset }

    const navigate = useNavigate();

    const appCtx = useContext(AppContext);

    const handleClick = () => {
        navigate(-1)
    }

    const url = `${appCtx.baseUrl}/all-customers/${mobileNumber}`

    return (
        <div className='max-w-fit m-auto rounded-lg shadow-lg bg-slate-200 p-8 px-16 mt-11'>
            <img className="rounded-lg shadow-lg antialiased m-auto" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
            <RenderDetail preText={"Customer Name: "} value={customerName} />
            <RenderDetail preText={"Mobile Number: "} value={mobileNumber} />
            <RenderDetail preText={"Hashed Password: "} value={hashedPassword} />
            <DeleteItem uniqueId={mobileNumber} url={url} handleRemoveItem={handleClick} />
        </div>
    )
}

const RenderDetail = ({ preText, value }) => {
    return (
        <p className='flex items-baseline gap-2'>
            <span className='text-justify text-xl'>{preText}: </span>
            <span className='text-justify text-2xl'>{value}</span>
        </p>
    )
}


export default SpecificCustomerDetailPage