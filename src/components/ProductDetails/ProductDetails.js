import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(()=>
    {
        fetch('http://localhost:5000/products' + productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])
    // const product = fakeData.find(pd => pd.key === ProductKey)
    // document.title = 'product-details'
    // console.log(product);
    return (
        <div>
        {/* <h1>Product {ProductKey} are coming sooooon!</h1> */}
        <Product showAddToCard = {false} productName = {product} ></Product>
        </div>
    );
};

export default ProductDetails;