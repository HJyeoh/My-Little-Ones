import React from 'react'
import './NewCollections.css'
import new_collections from '../Assets/products';
import Item from '../Item/Item';
    
const NewCollections = () => {

const filteredProducts2 = new_collections.filter((item) => item.id >= 21 && item.id <= 28);
  
    return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {filteredProducts2.map((item, i) => (
                <Item key={item.id || i} id={item.id} name={item.name} image={item.photo} price={item.price}/>
            ))}
        </div>
    </div>
  )
}

export default NewCollections
