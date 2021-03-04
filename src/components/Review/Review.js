import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, satCart] = useState([])
    useEffect(() => 
    {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key =>
            {
                const product = fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            satCart(cartProducts);
        // console.log(productKeys);
        // // console.log(counts);
        // console.log(cartProducts);
    },[])
    return (
        <div>
            <h1>Poduct item : {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem
                product = {pd}
                key = {pd.key}
                ></ReviewItem>)
            }
        </div>
    );
};

export default Review;