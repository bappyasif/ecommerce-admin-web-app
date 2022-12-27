import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App'
import { deleteDataFromServer, sendDataToServer } from '../../fetchRequests';
import { RenderFormControlFieldset, RenderFormSubmitButton } from "../CustomerLoginPage"
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';

function AllProductsPage() {
    let [data, setData] = useState([]);

    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    const handleData = () => {
        setData(dataset)
    }

    const handleRemoveProduct = (id) => {
        setData(prev => {
            const filtered = prev.filter(item => item.id != id)
            return filtered
        })
    }

    const handleAddProduct = (item) => {
        setData(prev => [...prev, item])
    }

    useEffect(() => {
        handleData()
    }, [dataset])

    console.log(dataset, "Products!!", data)
    return (
        <div>
            <h2>List Of All Products</h2>
            {/* <RenderProducts dataset={dataset} /> */}
            <AddNewProduct handleAddProduct={handleAddProduct} />
            <RenderProducts dataset={data} handleRemoveProduct={handleRemoveProduct} />
        </div>
    )
}

const AddNewProduct = ({handleAddProduct}) => {
    let [beginEntry, setBeginEntry] = useState(false)

    const handleClick = () => setBeginEntry(prev => !prev)

    return (
        <>
            <button className='bg-orange-800 relative' onClick={handleClick}>Click Here To {`${beginEntry ? "Close" : "Open"} `}Form</button>
            {beginEntry ? <RenderAddProductForm handleAddProduct={handleAddProduct} /> : null}
        </>
    )
}

const RenderAddProductForm = ({handleAddProduct}) => {
    let [data, setData] = useState(null);

    const appCtx = useContext(AppContext);

    const userInputChangeHandler = (evt, whichFormControl) => setData(prev => ({ ...prev, [whichFormControl]: evt.target.value }))

    const formControls = [
        { id: "title", label: "Product Name", type: "text", placeholder: "e.g. Product Name", changeHandler: userInputChangeHandler },
        { id: "description", label: "Product Description", type: "text", placeholder: "e.g. Product Description", changeHandler: userInputChangeHandler },
        { id: "price", label: "Product Price", type: "number", placeholder: "e.g. 2", changeHandler: userInputChangeHandler },
        { id: "productPicture", label: "Product Picture", type: "url", placeholder: "e.g. https://some.url", changeHandler: userInputChangeHandler },
    ];

    let renderFormControls = () => formControls?.map(item => <RenderFormControlFieldset key={item.id} item={item} />)

    const handleServerResponse = (results) => {
        // console.log(results)
        handleAddProduct(results.product)
    }
    
    const beginEntry = () => {
        const url = `${appCtx.baseUrl}/all-products`
        sendDataToServer(url, data, handleServerResponse)
    }
    
    const handleSubmit = evt => {
        evt.preventDefault();
        console.log(data, "formdaata!!")
        beginEntry();
    }

    return (
        <div className='z-10 bg-lime-600 p-4'>
            <form method='post' onSubmit={handleSubmit}>
                <legend>Enter All Fields Correctly</legend>
                {renderFormControls()}
                <RenderFormSubmitButton text={"Add Product"} />
            </form>
        </div>
    )
}

const RenderProducts = ({ dataset, handleRemoveProduct }) => {
    let renderItems = () => dataset?.map(item => <RenderItem key={item.id} item={item} handleRemoveProduct={handleRemoveProduct} />)
    return (
        <ul className='flex gap-11 flex-wrap justify-around'>
            {renderItems()}
        </ul>
    )
}

const RenderItem = ({ item, handleRemoveProduct }) => {
    const { id, title, description, price, productPicture } = { ...item }
    return (
        <li className='flex flex-col gap-4 border-2 border-teal-400 my-2'>
            <Link to={`${id}`}>
                <img src={productPicture} alt={title} />
                <div className='flex flex-col gap-6'>
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <p>{price}</p>
                </div>
            </Link>
            <DeleteItem id={id} handleRemoveProduct={handleRemoveProduct} />
        </li>

    )
}

export const DeleteItem = ({ id, handleRemoveProduct }) => {
    const appCtx = useContext(AppContext);

    const dataHandler = results => {
        console.log(results)
        handleRemoveProduct && handleRemoveProduct(id);
    }

    const handleClick = () => {
        const url = `${appCtx.baseUrl}/all-products/${id}`
        deleteDataFromServer(url, dataHandler)
    }

    return (
        <button onClick={handleClick}>Delete</button>
    )
}

export default AllProductsPage