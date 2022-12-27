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
        <div className='text-justify px-20'>
            CheckoutPage {cost}
            <ul>
                {renderItems()}
            </ul>
            <p><span>Total Price: </span> <span>{cost.toFixed(2)}</span></p>
            <MoveToNextStepInCheckout cost={cost.toFixed(2)} />
            <p><Link to={"/products"}>Click To Add More Items</Link></p>
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
        console.log(orders);
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
            if(Object.values(shippingFormData).length === 5) {
                setWhichStep("Complete Order")
            } else {
                alert("please fill out Shipping Form correctly")
            }
        } else if (whichStep === "Complete Order") {
            // handleCompleteOrder()
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
            <button onClick={handleWhichStep}>Move Onto Step: {whichStep} </button>
        </>
    )
}

const RenderBillingMethodConfirmation = () => {
    return (
        <form>
            <legend>Billing Method</legend>
            <fieldset className='flex gap-4'>
                <label htmlFor="billing">Cash On Delivery</label>
                <input id='billing' type={"checkbox"} checked />
            </fieldset>
        </form>
    )
}

const RenderShipingAddressForm = ({updateFormData}) => {
    const [formData, setFormData] = useState({});

    const userInputChangeHandler = (evt, whichElement) => {
        setFormData(prev => ({ ...prev, [whichElement]: evt.target.value }))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(formData, "form")
        updateFormData(formData)
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
        <form>
            <legend>Shipping Form: Please fillout to have a safe shipment</legend>
            {renderFormControls()}
        </form>
    )
}

const RenderCartItem = ({ item }) => {
    const { id, title, itemCount, itemPrice } = { ...item }

    return (
        <li className='flex gap-6'>
            <span>{title}</span>
            <span>{itemCount}</span>
            <span>{itemPrice}</span>
            <span>{Number(itemPrice * itemCount)}</span>
        </li>
    )
}

export default CheckoutPage