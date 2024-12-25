import React from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProductDisplay = (props) => {
    const { product } = props;

    // Define size options for different categories
    const sizeOptions = {
        boy_clothes: ['0-3 months', '3-6 months', '6-12 months', '12-18 months', '18-24 months'],
        girl_clothes: ['0-3 months', '3-6 months', '6-12 months', '12-18 months', '18-24 months'],
        maternity_clothes: ['S', 'M', 'L', 'XL'],
        maternity_care: [],  // No size options for maternity care
        toys: [],             // No size options for toys
        shoes: ['0', '1', '2', '3', '4'], // Baby shoe sizes (0-4)
        furniture: [],        // No size options for furniture
        newborn_clothes: ['0-3 months', '3-6 months', '6-12 months'],  // Newborn clothing sizes
        feeding: []           // No size options for feeding items
    };

    // Determine the size options based on the product's category
    const sizes = sizeOptions[product.category] || [];  // Default to an empty array if no category matches

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.photo} alt="" />
                    <img src={product.photo} alt="" />
                    <img src={product.photo} alt="" />
                    <img src={product.photo} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.photo} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    RM{product.price}
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                {sizes.length > 0 && (
                    <div className="productdisplay-right-size">
                        <h1>Select Size</h1>
                        <div className="productdisplay-right-sizes">
                            {sizes.map((size, index) => (
                                <div key={index}>{size}</div>
                            ))}
                        </div>
                    </div>
                )}
                <button>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
