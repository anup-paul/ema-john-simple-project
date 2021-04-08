import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // console.log(cart);
    // const total = cart.reduce( (sum, prd) =>sum + prd.price ,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price *  product.quantity || 1;
    }
    let shippingCost = 0;
    if(total > 35)
    {
        shippingCost = 0;
    }
    else if(total > 15)
    {
        shippingCost = 4.99;
    }
    else if(total > 0)
    {
        shippingCost = 12.59;
    }
    const vat = (total/10)
    const grandTotal = total + shippingCost + vat;
    const formatNumber = num =>
    {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div className="cart-container">
            <h2>Order Summary</h2>
            <h4>Order Items: {cart.length}</h4>
            <h4>Product Price: {total}</h4>
            <h4>Shipping Cost: {shippingCost}</h4>
            <h4>Tax + Vat: {formatNumber(vat)}</h4>
            <h4>Total Price: {formatNumber(grandTotal)}</h4>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;