import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../../App';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
import { DeleteItem } from './AllCustomersPage';
import { GoBackToOrders } from './SpecificOrderDetailPage';

function SpecificProductDetailPage() {
    const appCtx = useContext(AppContext);

    const params = useParams();

    const url = `${appCtx.baseUrl}/all-products/${params.prodId}`;

    const { dataset } = useToFetchSectionSpecificDataForAdmin(url)

    return (
        <div>
            <h2 className='text-4xl py-2 font-semibold bg-neutral-600 mb-4'>Product Details</h2>
            <GoBackToOrders text={"Products"} />
            <RenderProductDetail dataset={dataset} />
            <GoBackToOrders text={"Products"} />
        </div>
    )
}

const RenderProductDetail = ({ dataset }) => {
    const { id, title, description, price, productPicture } = { ...dataset }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    const appCtx = useContext(AppContext);
    
    const url = `${appCtx.baseUrl}/all-products/${id}`

    return (
        <div className='max-w-fit m-auto'>
            <div className='flex flex-col justify-center items-center
                            rounded-lg shadow-lg bg-slate-200 p-8 px-16 mt-11'>
                <img className='rounded-t-lg w-full h-full' src={productPicture} alt={title} />
                <h2 className='text-4xl text-justify mb-4'>{title}</h2>
                <p className='text-justify text-2xl'>{description}</p>
                <p className='bg-amber-600 text-center text-2xl my-4 px-4 rounded-sm'>{price}</p>
                <DeleteItem uniqueId={id} handleRemoveItem={handleClick} url={url} />
            </div>
        </div>
    )
}

export default SpecificProductDetailPage