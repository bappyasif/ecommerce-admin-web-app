import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App'
import { useToFetchDataFromServer } from '../hooks'

function ProductsPage() {
    const appCtx = useContext(AppContext);

    const url = `${appCtx.baseUrl}/all-products`

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
            <div className='flex flex-col gap-4 relative'>
                <AddToCartComponent product={title} id={id} price={price} />
                <button onClick={productDetailClickHandler} className='bg-lime-600'>View Details</button>
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
            <button onClick={handleVisitCart} className='bg-lime-600 relative'>Visit Cart <span className='absolute left-1/4 bg-yellow-800 rounded p-1 hover:bg-fuchsia-900'>{itemsCount}</span></button>
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
            <button onClick={handleAddToCart} className='bg-lime-400'>Add To Cart</button>
            {
                addedToCart
                    ? <span className='absolute right-0 bg-amber-400'>Product Added</span>
                    : null
            }
        </>
    )
}

export default ProductsPage