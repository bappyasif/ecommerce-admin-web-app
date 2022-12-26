import React, { useContext, useEffect, useState } from 'react'
import { FaCartPlus, FaCross, FaMinus, FaMoneyBill, FaPlus } from 'react-icons/fa';
import { AppContext } from '../../App'

function CartPage() {
    const appCtx = useContext(AppContext);

    return (
        <div>
            <h2 className='font-bold'>My Cart</h2>
            <RenderCart cart={appCtx.cart} />
        </div>
    )
}

const RenderCart = ({ cart, appCtx }) => {
    let [cartTotal, setCartTotal] = useState(0);

    let items = []

    let cost = 0

    const handleCartTotal = () => {
        setCartTotal(cost);
    }

    for (let key in cart) {
        cost += cart[key].itemCount * cart[key].itemPrice

        const item = { title: key, ...cart[key] }
        items.push(<RenderItemInCart item={item} />)
    }

    useEffect(() => {
        handleCartTotal()
    }, [cart])

    // console.log(items, "renderables")

    return (
        <div className='flex flex-col'>
            <ul className='flex flex-col w-full'>
                {[...items]}
            </ul>
            <p className='bg-teal-600 font-bold text-zinc-50 text-2xl w-fit m-auto px-36'><span>Total Price: </span> <span>{cartTotal}</span></p>
            <button className='bg-lime-400 font-bold text-2xl w-fit m-auto px-48'>Checkout</button>
        </div>
    )
}

const RenderItemInCart = ({ item }) => {
    let { title, id, itemCount, itemPrice } = { ...item }

    console.log(title, itemCount, itemPrice)

    return (
        <li key={title+id} className='flex gap-2 justify-center'>
            <div className='flex gap-6 items-center w-1/5'>
                <span className='w-1/2'> {title} </span>
                <ItemCounter item={item} />
                <span className='w-1/2'>{itemPrice}</span>
            </div>
            <div>
                <p className='flex gap-2 items-center'><span>Price</span> <span><FaMoneyBill /></span></p>
                <span>{Number(itemCount * itemPrice)}</span>
            </div>
        </li>
    )
}

const ItemCounter = ({item}) => {
    let { title, id, itemCount, itemPrice } = { ...item }

    const appCtx = useContext(AppContext);
    
    const hadndleIncrement = () => {
        appCtx.handleCart(title, {itemPrice: itemPrice, id: id})
    }

    const hadndleDecrement = () => {
        appCtx.handleCart(title, {decrement: true, itemPrice: itemPrice, id: id})
    }

    return (
        <span className='flex gap-4'>
            <button onClick={hadndleDecrement}><FaMinus /></button>
            <span className='bg-teal-100 p-2'>{itemCount}</span>
            <button onClick={hadndleIncrement}><FaPlus /></button>
        </span>
    )
}

export default CartPage