import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlace] = useState([false]);

    const history = useHistory()
    const handleProcessCheckout = () =>
    {
        history.push('/shipment')
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();
    }

    const removeProduct = (productKey) => {
        // console.log("clicked",productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

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
            setCart(cartProducts);
        // console.log(productKeys);
        // // console.log(counts);
        // console.log(cartProducts);
    },[]);

    let thankYou;
    if(orderPlaced)
    {
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                    product = {pd}
                    removeProduct = {removeProduct}
                    key = {pd.key}
                    ></ReviewItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={handleProcessCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;