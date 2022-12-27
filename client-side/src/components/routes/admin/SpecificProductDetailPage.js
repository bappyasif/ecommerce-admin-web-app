import React, { useContext } from 'react'
import { useParams } from 'react-router';
import { AppContext } from '../../../App';
import { useToFetchSectionSpecificDataForAdmin } from '../../hooks';
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
    
    return (
        <div className='container m-auto'>
            <img src={productPicture} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    )
}

export default SpecificProductDetailPage