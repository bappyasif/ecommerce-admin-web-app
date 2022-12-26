import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../App'
import { useToFetchSpecificItemFromServer } from '../hooks'

function ProductDetail() {
    const params = useParams()
    console.log(params, "params!!")

    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products/${params.prodId}`

    const { data } = useToFetchSpecificItemFromServer(url)

    console.log(data, "Product Detail")

    return (
        data?.product
            ? <RenderProductDetail item={data.product} />
            : null
    )
}

const RenderProductDetail = ({ item }) => {
    let { id, title, description, price, productPicture } = { ...item }

    return (
        <div className='flex flex-col justify-center items-center text-justify w-fit'>
            <div>
                <h4>{title}</h4>
                <img src={productPicture} />
                <p className='text-justify'>{description}</p>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <h5 className='bg-lime-400 text-center'>{price}</h5>
                <button className='bg-lime-400'>Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductDetail