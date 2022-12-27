import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { RenderItemDetail } from './AllOrdersPage';

function AllCustomersPage() {
    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-customers`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    console.log(dataset, "cutomerds!!")
    return (
        <div>
            <RenderCustomersList dataset={dataset?.length ? dataset[0] : []} />
        </div>
    )
}

const RenderCustomersList = ({ dataset }) => {
    const { mobileNumber, customerName } = { ...dataset }

    return (
        <div>
            <Link to={mobileNumber}>
                <RenderItemDetail preText={"Customer Name: "} value={customerName} />
                <img src='https://source.unsplash.com/featured/300x202' />
            </Link>
        </div>
    )
}

export default AllCustomersPage