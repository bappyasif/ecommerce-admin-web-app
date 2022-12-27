import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App'
import { readDataFromServer } from '../../fetchRequests'

function AllOrdersPage() {
    const [allOrders, setAllOrders] = useState()

    const appCtx = useContext(AppContext);

    const dataHandler = dataset => setAllOrders(dataset.orders)

    const beginFetching = () => {
        const url = `${appCtx.baseUrl}/all-orders`
        readDataFromServer(url, dataHandler)
    }

    useEffect(() => {
        beginFetching()
    }, [])

    console.log(allOrders, "allorders")
    return (
        <div>
            AllOrdersPage {allOrders?.length}
            <RenderAllOrdersList orders={allOrders} />
        </div>
    )
}

const RenderAllOrdersList = ({ orders }) => {
    let renderOrders = () => orders?.map(order => <RenderOrderListItem key={order.id} dataset={order} />)
    return (
        <div>
            <h2>All Orders That Are Currently Available</h2>
            <ul>
                {renderOrders()}
            </ul>
        </div>
    )
}

const RenderOrderListItem = ({ dataset }) => {
    const { id, items, totalPrice, shippingAddress, billingMethod } = { ...dataset }
    return (
        <li className='flex gap-4 justify-around border-2 my-2'>
            <Link className='self-center bg-teal-400 px-4 hover:bg-teal-900 hover:text-white' to={`${id}`}>View Details</Link>
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
            <h4>Total Price</h4>
            <p>{price}</p>
        </div>
    )
}

export const RenderBillingMethod = ({billingMethod}) => {
    return (
        <div>
            <h4>Billing Method</h4>
            <p>{billingMethod}</p>
        </div>
    )
}

const RenderOrderShippingAddress = ({ dataset }) => {
    const { city, postCode, thana } = { ...dataset }

    return (
        <div>
            <h4>Shipping Address</h4>
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
            <h4>Order Items</h4>
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
        <p><span>{preText}: </span> <span>{value}</span></p>
    )
}

export default AllOrdersPage