import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { useToFetchListOfDataFromServer } from '../hooks'

function ProductsPage() {
    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products`

    let { data } = useToFetchListOfDataFromServer(url)

    // console.log(data, "products!!")

    return (
        data?.products?.length
            ?
            <RenderProducts list={data?.products} />
            : null
    )
}

const RenderProducts = ({ list }) => {
    let renderList = () => list.map(item => <RenderProduct key={item.id} item={item} />)

    return (
        <div>
            <h1>All Products</h1>
            <div className='flex justify-start gap-6 flex-wrap'>
                {renderList()}
            </div>
        </div>
    )
}

const RenderProduct = ({ item }) => {
    let { id, title, description, price, productPicture } = { ...item }

    const navigate = useNavigate()

    const productDetailClickHandler = () => {
        navigate(`/products/${id}`)
    }

    return (
        <div className='card'>
            <Link to={`/products/${id}`}>
                <div className='text-justify'>
                    <h4>{title}</h4>
                    <img src={productPicture} />
                </div>
            </Link>
            <div>
                <p className='text-justify'>{description}</p>
                <h5>{price}</h5>
            </div>
            <div className='flex flex-col gap-4'>
                <button className='bg-lime-400'>Add To Cart</button>
                <button onClick={productDetailClickHandler} className='bg-lime-600'>View Details</button>
            </div>
        </div>
    )
}

export default ProductsPage