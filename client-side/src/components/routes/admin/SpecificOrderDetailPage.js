import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../../App'
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { RenderBillingMethod, RenderItemDetail, RenderTotalPrice } from './AllOrdersPage';

function SpecificOrderDetailPage() {
    const appCtx = useContext(AppContext);

    const params = useParams();

    const url = `${appCtx.baseUrl}/all-orders/${params.orderId}`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    // console.log(dataset, "OrderDetail!!")

    return (
        <div>
            <h2 className='text-4xl py-2 font-semibold bg-neutral-600 mb-4'>Order Detail</h2>
            
            <GoBackToOrders text={"Orders"} />

            <div className='flex justify-around gap-4 border-2 my-2 pb-8 pt-4
        bg-gradient-to-tl from-cyan-500 to-blue-500'>
                <div>
                    <RenderOrderItemsDetail items={dataset?.items} />
                    <RenderOrderShippingAddress dataset={dataset?.shippingAddress} />
                </div>
                <div className='flex flex-col justify-between'>
                    <RenderBillingMethod billingMethod={dataset?.billingMethod} />
                    <RenderTotalPrice price={dataset?.totalPrice} />
                </div>
            </div>
            
            <GoBackToOrders text={"Orders"} />
        </div>
    )
}

export const GoBackToOrders = ({ text }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1)
    }
    return (
        <button className='bg-teal-400 m-4 py-2 px-4 text-4xl hover:bg-teal-900 hover:text-white' onClick={handleClick}>{text} List</button>
    )
}

const RenderOrderShippingAddress = ({ dataset }) => {
    const { city, line1, line2, postCode, thana } = { ...dataset }

    return (
        <div className='m-auto'>
            <h4 className='text-justify text-2xl'>Shipping Address</h4>
            <div>
                <div className='flex gap-4'>
                    <RenderItemDetail preText={"Address Line 1: "} value={line1} />
                    <RenderItemDetail preText={"Address Line 2: "} value={line2} />
                </div>
                <div className='flex gap-4'>
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
        <div className='m-auto mb-6'>
            <h4 className='text-justify text-2xl'>Order Items</h4>
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