import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    // console.log(props.productName)
    const {name, img, seller, price, stock, key} = props.productName || {};
    return (
        <div className="product">
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div className="productDetails">
                <h3 className="productName"><Link to = {"/"+key}>{name}</Link></h3>
                <br/>
                <p><b>By:{seller}</b></p>
                <p><b>Price: ${price}</b></p>
                <p><b>Only {stock} left in stock.<b style={{color:"tomato"}} >Order Soon</b></b></p>
                { props.showAddToCard === true && <button
                    className="main-button" onClick={() => props.addProduct(props.productName)} 
                    > 
                    <FontAwesomeIcon icon={faCartPlus} />
                    add to cart
                 </button>}
                 
            </div>
        </div>
    );
};

export default Product;