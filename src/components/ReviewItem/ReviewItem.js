import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity, img, key,price} = props.product;
    const reviewItemStyle = 
    {
        borderBottom: "1px solid black",
        marginBottom: "30px",
        marginLeft:"200px",
        paddingBottom: "20px"
    }
    return (
        <div style = {reviewItemStyle}>
            <h5 >{name}</h5>
            <h6>Quantity:{quantity}</h6>
            <h6>Price: {price}</h6>
            <img src={img} alt=""/>
            <br/>
            <button 
                className = "main-button"
                onClick = {() =>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;