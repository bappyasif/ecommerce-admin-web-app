import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../App'
import { useToFetchDataFromServer } from '../hooks'
import { AddToCartComponent, VistCartButton } from './ProductsPage'

function ProductDetail() {
    const params = useParams()

    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products/${params.prodId}`

    const { data } = useToFetchDataFromServer(url)

    // console.log(data, "Product Detail")

    return (
        data?.product
            ? <RenderProductDetail item={data.product} />
            : null
    )
}

const RenderProductDetail = ({ item }) => {
    let { id, title, description, price, productPicture } = { ...item }

    return (
        <div className='max-w-fit m-auto'>
            <div className='flex flex-col justify-center items-center
                            rounded-lg shadow-lg bg-slate-200 p-8 px-16'
            >
                <div>
                    <h4 className='text-4xl text-justify mb-4'>{title}</h4>
                    <img className='rounded-t-lg w-full h-full' src={productPicture} />
                    <p className='text-justify text-2xl'>{description}</p>
                </div>
                <div className='flex flex-col gap-4 w-full'>
                    <h5 className='bg-amber-600 text-center text-2xl my-4'>{price}</h5>
                    <AddToCartComponent id={id} product={title} price={price} />
                    <VistCartButton />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail