import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10)
    const [cart, setCart] = useState([])
    const addProduct = (product) =>
    {
        // console.log('prosuct added',product);
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => (
                    <Product
                    key = {pd.key}
                    showAddToCard = {true}
                     productName ={pd}
                     addProduct= {addProduct} 
                     >
                    </Product>))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;