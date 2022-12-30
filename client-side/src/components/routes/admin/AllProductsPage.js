import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App'
import { deleteDataFromServer, sendDataToServer } from '../../fetchRequests';
import { RenderFormControlFieldset, RenderFormSubmitButton } from "../CustomerLoginPage"
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { DeleteItem } from './AllCustomersPage';

function AllProductsPage() {
    let [data, setData] = useState([]);

    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url, appCtx)

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

    // console.log(dataset, "Products!!", data)
    return (
        <div>
            <AddNewProduct handleAddProduct={handleAddProduct} />
            <RenderProducts dataset={data} handleRemoveProduct={handleRemoveProduct} />
        </div>
    )
}

const AddNewProduct = ({ handleAddProduct }) => {
    let [beginEntry, setBeginEntry] = useState(false)

    const handleClick = () => setBeginEntry(prev => !prev)

    return (
        <>
            <button className='text-4xl px-4 py-2 font-extrabold m-4 bg-orange-800 hover:bg-pink-600 relative' onClick={handleClick}>Click Here To {`${beginEntry ? "Close" : "Open"} `} Product Form</button>
            {beginEntry ? <RenderAddProductForm handleAddProduct={handleAddProduct} handleClick={handleClick} /> : null}
        </>
    )
}

const RenderAddProductForm = ({ handleAddProduct, handleClick }) => {
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
        beginEntry();
        handleClick();
    }

    return (
        <div className='z-10 bg-slate-400 p-4 absolute left-1/3 w-2/6 rounded'>
            <form method='post' onSubmit={handleSubmit}>
                <legend className='text-2xl'>Enter All Fields Correctly</legend>
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
    
    const appCtx = useContext(AppContext);
    
    const url = `${appCtx.baseUrl}/all-products/${id}`

    return (
        <li className='flex flex-col gap-4 border-2 border-teal-800 my-2
                       rounded-lg shadow-lg bg-slate-200 w-1/3 py-8 px-16'
        >
            <div className='flex justify-between gap-11'>
                <img className='rounded-t-lg max-w-min h-full' src={productPicture} alt={title} />
                <Link to={`${id}`}>
                    <div className='flex flex-col gap-6 pb-20'>
                        <h4 className='text-4xl text-justify mb-4'>{title}</h4>
                        <p className='text-justify text-xl'>{description}</p>
                        <p className="text-2xl my-4 before:content-['$'] before:pr-4">{price}</p>
                    </div>
                </Link>
            </div>
            <DeleteItem uniqueId={id} handleRemoveItem={handleRemoveProduct} url={url} />
        </li>

    )
}

export default AllProductsPage