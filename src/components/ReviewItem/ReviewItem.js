import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity, img} = props.product;
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
            <img src={img} alt=""/>
            <br/>
            <button className = "main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;