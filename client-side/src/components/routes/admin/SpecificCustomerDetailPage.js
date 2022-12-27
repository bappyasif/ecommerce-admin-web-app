import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../../App';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { DeleteItem } from './AllCustomersPage';
import { RenderItemDetail } from './AllOrdersPage';
import { GoBackToOrders } from './SpecificOrderDetailPage';

function SpecificCustomerDetailPage() {
    const appCtx = useContext(AppContext);

    const params = useParams();

    const url = `${appCtx.baseUrl}/all-customers/${params.custId}`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    console.log(dataset, "customer!!")

    return (
        <div>
            <h2>Customer Detail</h2>
            <GoBackToOrders text={"Customers"} />
            <RenderCustomer dataset={dataset} />
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
        <div>
            <img src='https://source.unsplash.com/featured/300x202' />
            <RenderItemDetail preText={"Customer Name: "} value={customerName} />
            <RenderItemDetail preText={"Mobile Number: "} value={mobileNumber} />
            <RenderItemDetail preText={"Hashed Password: "} value={hashedPassword} />
            <DeleteItem uniqueId={mobileNumber} url={url} handleRemoveItem={handleClick} />
        </div>
    )
}


export default SpecificCustomerDetailPage