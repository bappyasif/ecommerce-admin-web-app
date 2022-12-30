import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { RenderFormControlFieldset } from "./CustomerLoginPage"
import { sendDataToServer } from "../fetchRequests"

function CheckoutPage() {
    const appCtx = useContext(AppContext);
    let items = [];
    let cost = 0;

    for (let key in appCtx.cart) {
        cost += appCtx.cart[key].itemCount * appCtx.cart[key].itemPrice
        const item = { id: appCtx.cart[key].id, title: key, itemCount: appCtx.cart[key].itemCount, itemPrice: appCtx.cart[key].itemPrice }
        items.push(item)
    }

    let renderItems = () => items?.map(item => <RenderCartItem key={item.id} item={item} />)

    return (
        <div className='text-justify px-20 w-fit m-auto'>
            <h2 className='text-4xl text-center bg-pink-800 rounded py-2'>CheckoutPage</h2>
            <ul>
                {renderItems()}
            </ul>
            <p className='bg-emerald-400 font-bold flex justify-between items-center px-2 mb-4'><span className='text-xl'>Total Price: </span> <span className='my-2 text-2xl'>{cost.toFixed(2)}</span></p>
            <MoveToNextStepInCheckout cost={cost.toFixed(2)} />
            <button className='bg-teal-400 block rounded hover:bg-teal-600 font-bold mb-2 px-6'><Link className='' to={"/products"}>Click To Add More Items</Link></button>
            
        </div>
    )
}

const MoveToNextStepInCheckout = ({ cost }) => {
    let [whichStep, setWhichStep] = useState()
    let [shippingFormData, setShippingFormData] = useState({});

    const navigate = useNavigate()

    const appCtx = useContext(AppContext);

    const handleShippingFormData = dataset => setShippingFormData(dataset)

    const handleCompleteOrder = (orders) => {
        appCtx.resetCart()
        navigate("/products")
    }

    const sendOrderRecordToServer = () => {
        const data = { orderItems: appCtx.cart, orderTotal: cost, shippingAddress: shippingFormData }
        const url = `${appCtx.baseUrl}/new-order`
        sendDataToServer(url, data, handleCompleteOrder)
    }

    const handleWhichStep = () => {
        if (whichStep === "Shipping") {
            setWhichStep("Billing")
        } else if (whichStep === "Billing") {
            if (Object.values(shippingFormData).length === 5) {
                setWhichStep("Complete Order")
            } else {
                alert("please fill out Shipping Form correctly")
            }
        } else if (whichStep === "Complete Order") {
            sendOrderRecordToServer()
        }
    }

    useEffect(() => {
        setWhichStep("Shipping")
    }, [])

    return (
        <>
            {whichStep === "Billing" ? <RenderShipingAddressForm updateFormData={handleShippingFormData} /> : null}
            {whichStep === "Complete Order" ? <RenderBillingMethodConfirmation /> : null}
            <button className='mb-2 px-6 bg-teal-400 block rounded hover:bg-teal-600 font-bold' onClick={handleWhichStep}>Move Onto Step: {whichStep} </button>
        </>
    )
}

const RenderBillingMethodConfirmation = () => {
    return (
        <form className='mb-4'>
            <legend className='text-2xl'>Billing Method</legend>
            <fieldset className='flex gap-4 text-2xl'>
                <label htmlFor="billing">Cash On Delivery</label>
                <input id='billing' type={"checkbox"} checked />
            </fieldset>
        </form>
    )
}

const RenderShipingAddressForm = ({ updateFormData }) => {
    const [formData, setFormData] = useState({});

    const userInputChangeHandler = (evt, whichElement) => {
        setFormData(prev => ({ ...prev, [whichElement]: evt.target.value }))
    }

    const formControls = [
        { id: "line1", label: "Address Line 1", type: "text", placeholder: "e.g. Main Road", changeHandler: userInputChangeHandler },
        { id: "line2", label: "Address Line 2", type: "text", placeholder: "e.g. Road No. Apt No.", changeHandler: userInputChangeHandler },
        { id: "postCode", label: "Postcode", type: "text", placeholder: "e.g. 1207", changeHandler: userInputChangeHandler },
        { id: "thana", label: "Police Station", type: "text", placeholder: "e.g. Adabar", changeHandler: userInputChangeHandler },
        { id: "city", label: "City", type: "text", placeholder: "e.g. Dhaka", changeHandler: userInputChangeHandler },
    ]

    let renderFormControls = () => formControls.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    useEffect(() => {
        updateFormData(formData)
    }, [formData])

    return (
        <form className='w-fit m-auto'>
            <legend>
                <p className='text-2xl'>Shipping Form: Please fillout this form correctly to have a safe shipment</p>
                <p className='text-lg'>All Asterisk (*) marked fields are required </p>
            </legend>
            {renderFormControls()}
        </form>
    )
}

const RenderCartItem = ({ item }) => {
    const { id, title, itemCount, itemPrice } = { ...item }

    return (
        <li class="flex py-6">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="https://via.placeholder.com/150" class="h-full w-full object-cover object-center" />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3 className='text-2xl'>{title}</h3>
                        <p class="ml-4 text-xl"><span>Price Per Item: </span><span className='text-2xl'>{itemPrice}</span></p>
                    </div>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500"><span className='text-xl'>Quantity: </span> <span className='text-2xl'>{itemCount}</span></p>

                    <div class="flex">
                        <p type="button" class="font-medium text-indigo-600 hover:text-indigo-500"><span className='text-xl ml-4'>Item ({itemCount}) Total Price: </span><span className='text-2xl'>{Number(itemPrice * itemCount)}</span></p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CheckoutPage