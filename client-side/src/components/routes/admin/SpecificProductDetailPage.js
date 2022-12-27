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

    console.log(dataset, "Product!!")

    return (
        <div>
            <h2>Product Details</h2>
            <GoBackToOrders text={"Products"} />
            <RenderProductDetail dataset={dataset} />
        </div>
    )
}

const RenderProductDetail = ({dataset}) => {
    const { id, title, description, price, productPicture } = { ...dataset }
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    const appCtx = useContext(AppContext);
    const url = `${appCtx.baseUrl}/all-products/${id}`

    return (
        <div className='container m-auto'>
            <img src={productPicture} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <DeleteItem uniqueId={id} handleRemoveItem={handleClick} url={url} />
        </div>
    )
}

export default SpecificProductDetailPage