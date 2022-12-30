import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { useToFetchDataFromServer } from '../hooks'

function ProductsPage() {
    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/products`

    let { data } = useToFetchDataFromServer(url)

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
            <div className='flex justify-between gap-6 flex-wrap px-20'>
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
        <div 
            className='rounded-lg shadow-lg bg-slate-200 w-1/4 p-8 px-16'
        >
            <Link to={`/products/${id}`}>
                <div className='text-justify'>
                    <h4 className='text-4xl text-justify mb-4'>{title}</h4>
                    <img className='rounded-t-lg w-full' src={productPicture} style={{margin: "auto"}} />
                </div>
            </Link>
            <div>
                <p className='text-justify text-xl'>{description}</p>
                <h5 className='text-2xl my-4'>{price}</h5>
            </div>
            <div className='flex flex-col gap-4 relative'>
                <AddToCartComponent product={title} id={id} price={price} />
                <button onClick={productDetailClickHandler} className='font-extrabold bg-lime-600 hover:bg-lime-900 hover:text-white'>View Details</button>
                <VistCartButton />
            </div>
        </div>
    )
}

export const VistCartButton = () => {
    let [itemsCount, setItemsCount] = useState();

    const navigate = useNavigate()

    const appCtx = useContext(AppContext);

    let handleItemsCount = () => setItemsCount(Object.keys(appCtx.cart).length)

    const handleVisitCart = () => {
        navigate(`/cart`)
    }

    useEffect(() => {
        handleItemsCount()
    }, [appCtx.cart])

    return (
        <>
            {
                itemsCount
                    ? <button onClick={handleVisitCart} className='font-extrabold bg-lime-600 hover:bg-lime-900 hover:text-white relative'>Visit Cart <span className='absolute left-1/4 bg-yellow-800 rounded p-1 hover:bg-fuchsia-900'>{itemsCount}</span></button>
                    : null
            }
        </>
    )
}

export const AddToCartComponent = ({ id, product, price }) => {
    let [addedToCart, setAddedToCart] = useState(false);

    const appCtx = useContext(AppContext);

    let timerCountdown = () => {
        let countdown = setTimeout(() => {

            setAddedToCart(false);
            clearTimeout(countdown)

            return () => {
                clearTimeout(countdown)
            };
        }, 600)
    }

    const handleAddToCart = () => {
        setAddedToCart(true);

        appCtx.handleCart(product, { id, itemPrice: price })
    }

    useEffect(() => {
        addedToCart && timerCountdown();
    }, [addedToCart])

    return (
        <>
            <button onClick={handleAddToCart} className='font-extrabold bg-lime-400 hover:bg-lime-900 hover:text-white'>Add To Cart</button>
            {
                addedToCart
                    ? <span className='absolute right-0 bg-amber-400'>Product Added</span>
                    : null
            }
        </>
    )
}

export default ProductsPage