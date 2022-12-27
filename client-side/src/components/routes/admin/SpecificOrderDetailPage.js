import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../../App'
import { readDataFromServer } from '../../fetchRequests';
import { RenderBillingMethod, RenderItemDetail, RenderTotalPrice } from './AllOrdersPage';

function SpecificOrderDetailPage() {
    let [dataset, setDataset] = useState(null);

    const appCtx = useContext(AppContext)

    const params = useParams();

    const dataHandler = dataset => setDataset(dataset.order)

    const beginFetching = () => {
        const url = `${appCtx.baseUrl}/all-orders/${params.orderId}`
        readDataFromServer(url, dataHandler)
    }

    useEffect(() => {
        beginFetching()
    }, [])

    console.log(dataset, "OrderDetail!!")

    return (
        <div>
            <h2>Order Detail</h2>
            <GoBackToOrders />
            <div className='flex gap-4 justify-around border-2 my-2'>
                <RenderOrderItemsDetail items={dataset?.items} />
                <RenderOrderShippingAddress dataset={dataset?.shippingAddress} />
                <RenderBillingMethod billingMethod={dataset?.billingMethod} />
                <RenderTotalPrice price={dataset?.totalPrice} />
            </div>
        </div>
    )
}

const GoBackToOrders = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1)
    }
    return (
        <button className='bg-teal-400 px-4 hover:bg-teal-900 hover:text-white' onClick={handleClick}>Orders List</button>
    )
}

const RenderOrderShippingAddress = ({ dataset }) => {
    const { city, line1, line2, postCode, thana } = { ...dataset }

    return (
        <div>
            <h4>Shipping Address</h4>
            <div>
                <div className='flex gap-4'>
                    <RenderItemDetail preText={"Address Line 1: "} value={line1} />
                    <RenderItemDetail preText={"Address Line 2: "} value={line2} />
                </div>
                <div  className='flex gap-4'>
                    <RenderItemDetail preText={"Post Code: "} value={postCode} />
                    <RenderItemDetail preText={"Thana: "} value={thana} />
                    <RenderItemDetail preText={"City: "} value={city} />
                </div>
            </div>
        </div>
    )
}

const RenderOrderItemsDetail = ({ items }) => {
    let itemsFormatted = [];

    for (let key in items) {
        const obj = items[key];
        const item = { title: key, id: obj.id, itemCount: obj.itemCount, itemPrice: obj.itemPrice }
        itemsFormatted.push(item);
    }

    let renderItems = () => itemsFormatted.map(item => <RenderOrderItemDetail key={item.id} item={item} />)

    return (
        <div>
            <h4>Order Items</h4>
            {renderItems()}
        </div>
    )

}

const RenderOrderItemDetail = ({ item }) => {
    const { id, itemPrice, itemCount, title } = { ...item }

    return (
        <div className='flex gap-4'>
            <RenderItemDetail preText={"Item Id"} value={id} />
            <RenderItemDetail preText={"Item Name"} value={title} />
            <RenderItemDetail preText={"Item Counts"} value={itemCount} />
            <RenderItemDetail preText={"Item Price"} value={itemPrice} />
            <RenderItemDetail preText={"Item Total Price"} value={Number(itemPrice * itemCount).toFixed(2)} />
        </div>
    )
}

export default SpecificOrderDetailPage