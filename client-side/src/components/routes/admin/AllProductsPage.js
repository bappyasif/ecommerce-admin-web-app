import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App'
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';

function AllProductsPage() {
    const appCtx = useContext(AppContext);
    
    const url = `${appCtx.baseUrl}/all-products`;

    const {dataset} = useToFetchSectionSpecificDataForAdmin(url)

    console.log(dataset, "Products!!")
    return (
        <div>
            <h2>List Of All Products</h2>
            <RenderProducts dataset={dataset} />
        </div>
    )
}

const RenderProducts = ({ dataset }) => {
    let renderItems = () => dataset?.map(item => <RenderItem key={item.id} item={item} />)
    return (
        <ul className='flex gap-11 flex-wrap justify-around'>
            {renderItems()}
        </ul>
    )
}

const RenderItem = ({ item }) => {
    const { id, title, description, price, productPicture } = { ...item }
    return (
        <Link to={`${id}`}>
            <li className='flex gap-4 border-2 border-teal-400 my-2'>
                <img src={productPicture} alt={title} />
                <div className='flex flex-col gap-6'>
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <p>{price}</p>
                </div>
            </li>
        </Link>
    )
}

export default AllProductsPage