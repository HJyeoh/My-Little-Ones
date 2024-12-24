import React from 'react';
import './Item.css';

const Item = ({ id, name, image, price }) => {
  return (
    <div className='item'>
      <img src={image} alt={name} />
      <p>{name}</p>
      <div className="item-prices">
        RM{price}
      </div>
    </div>
  );
};

export default Item;
