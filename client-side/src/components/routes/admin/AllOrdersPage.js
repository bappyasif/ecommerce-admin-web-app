import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App'
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';

function AllOrdersPage() {
    const appCtx = useContext(AppContext);
    
    const url = `${appCtx.baseUrl}/all-orders`;

    const {dataset} = useToFetchSectionSpecificDataForAdmin(url)

    // console.log(dataset, "allorders")
    return (
        <div>
            <RenderAllOrdersList orders={dataset} />
        </div>
    )
}

const RenderAllOrdersList = ({ orders }) => {
    let renderOrders = () => orders?.map(order => <RenderOrderListItem key={order.id} dataset={order} />)
    return (
        <div>
            <h2 className='text-2xl bg-pink-900 py-2 font-bold'>All Orders That Are Currently Available</h2>
            <ul>
                {renderOrders()}
            </ul>
        </div>
    )
}

const RenderOrderListItem = ({ dataset }) => {
    const { id, items, totalPrice, shippingAddress, billingMethod } = { ...dataset }
    return (
        <li className='flex gap-4 justify-around border-2 my-2 pb-8 pt-4
        bg-gradient-to-r from-cyan-500 to-blue-500'>
            <Link className='text-4xl self-center bg-teal-400 px-4 hover:bg-emerald-600 hover:text-white' to={`${id}`}>View Details</Link>
            <RenderOrderItemsDetail items={items} />
            <RenderOrderShippingAddress dataset={shippingAddress} />
            <RenderBillingMethod billingMethod={billingMethod} />
            <RenderTotalPrice price={totalPrice} />
        </li>
    )
}

export const RenderTotalPrice = ({price}) => {
    return (
        <div>
            <h4 className='text-justify text-2xl'>Total Price</h4>
            <p className='text-justify text-4xl'>{price}</p>
        </div>
    )
}

export const RenderBillingMethod = ({billingMethod}) => {
    return (
        <div>
            <h4 className='text-justify text-2xl'>Billing Method</h4>
            <p className='text-justify text-2xl'>{billingMethod}</p>
        </div>
    )
}

const RenderOrderShippingAddress = ({ dataset }) => {
    const { city, postCode, thana } = { ...dataset }

    return (
        <div>
            <h4 className='text-justify text-2xl'>Shipping Address</h4>
            <div className='flex gap-4'>
                <RenderItemDetail preText={"Post Code: "} value={postCode} />
                <RenderItemDetail preText={"Thana: "} value={thana} />
                <RenderItemDetail preText={"City: "} value={city} />
            </div>
        </div>
    )
}

export const RenderOrderItemsDetail = ({ items }) => {
    let itemsFormatted = [];

    for (let key in items) {
        const obj = items[key];
        const item = { title: key, id: obj.id, itemCount: obj.itemCount, itemPrice: obj.itemPrice }
        itemsFormatted.push(item);
    }

    let renderItems = () => itemsFormatted.map(item => <RenderOrderItemDetail key={item.id} item={item} />)

    return (
        <div>
            <h4 className='text-justify text-2xl'>Order Items</h4>
            {renderItems()}
        </div>
    )

}

const RenderOrderItemDetail = ({ item }) => {
    const { itemCount, title } = { ...item }

    return (
        <div className='flex gap-4'>
            <RenderItemDetail preText={"Item Name"} value={title} />
            <RenderItemDetail preText={"Item Counts"} value={itemCount} />
        </div>
    )
}

export const RenderItemDetail = ({ preText, value }) => {
    return (
        <p><span className='text-justify text-xl'>{preText}: </span> <span className='text-justify text-2xl'>{value}</span></p>
    )
}

export default AllOrdersPage