import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {ProductKey} = useParams();
    const product = fakeData.find(pd => pd.key === ProductKey)
    // console.log(product);
    return (
        <div>
        {/* <h1>Product {ProductKey} are coming sooooon!</h1> */}
        <Product showAddToCard = {false} productName = {product} ></Product>
        </div>
    );
};

export default ProductDetails;