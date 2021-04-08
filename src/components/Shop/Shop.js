import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    //console.log(fakeData);
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([])
    document.title = "products";


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data);
            })

    }, [])



    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart)
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        fetch('http://localhost:5000/productsKeys',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])


    const addProduct = (product) => {
        // console.log('prosuct added',product);\
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.length === 0 && <p>loading...</p>
                }
                {
                    products.map(pd => (
                        <Product
                            key={pd.key}
                            showAddToCard={true}
                            productName={pd}
                            addProduct={addProduct}
                        >
                        </Product>))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order-review" >
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;