import React, { useState } from 'react';
import fakeData from '../../fakeData';


const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10)
    return (
        <div>
            <h1>This shop has {products.length} Item</h1>
            <ul>
                {
                    products.map(product => <li>{product.name}</li>)
                }
            </ul>
        </div>
    );
};

export default Shop;