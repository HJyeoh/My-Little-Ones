import React from 'react';
import './Popular.css';
import data_product from '../Assets/products';
import Item from '../Item/Item';

const Popular = () => {
    // Filter products with IDs between 1 and 12
    const filteredProducts = data_product.filter((item) => item.id >= 1 && item.id <= 4);
    

    return (
        <div className='popular'>
            <h1>POPULAR IN BABY</h1>
            <hr />
            <div className="popular-item">
                {filteredProducts.map((item, i) => (
                    <Item key={item.id || i} id={item.id} name={item.name} image={item.photo} price={item.price}/>
                ))}
            </div>
        </div>
    );
};

export default Popular;
