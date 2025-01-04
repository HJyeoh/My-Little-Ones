import React, { useContext } from 'react';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // Define size options for different categories
    const sizeOptions = {
        boy_clothes: ['0-3 months', '3-6 months', '6-12 months', '12-18 months'],
        girl_clothes: ['0-3 months', '3-6 months', '6-12 months', '12-18 months'],
        maternity_clothes: ['S', 'M', 'L', 'XL'],
        maternity_care: [],
        toys: [],
        shoes: ['0', '1', '2', '3', '4'],
        furniture: [],
        newborn_clothes: ['0-3 months', '3-6 months', '6-12 months'],
        feeding: []
    };

    const sizes = sizeOptions[product.category] || [];

    return (
        <div className="flex flex-col lg:flex-row gap-4 px-8 py-4">
            {/* Left Section: Thumbnails */}
            <div className="hidden lg:flex flex-col gap-2">
                <img src={product.photo} alt="Thumbnail 1" className="h-[96px] w-[96px] object-cover" />
                <img src={product.photo} alt="Thumbnail 2" className="h-[96px] w-[96px] object-cover" />
                <img src={product.photo} alt="Thumbnail 3" className="h-[96px] w-[96px] object-cover" />
                <img src={product.photo} alt="Thumbnail 4" className="h-[96px] w-[96px] object-cover" />
            </div>

            {/* Center Section: Main Product Image */}
            <div className="flex flex-col lg:w-2/3">
                <img
                    src={product.photo}
                    alt="Main product"
                    className="w-full max-w-[500px] h-[700px] object-cover mx-auto lg:mx-0"
                />
                <div className="lg:hidden grid grid-cols-4 gap-2 mt-4">
                    <img src={product.photo} alt="Thumbnail 1" className="h-[96px] w-full object-cover" />
                    <img src={product.photo} alt="Thumbnail 2" className="h-[96px] w-full object-cover" />
                    <img src={product.photo} alt="Thumbnail 3" className="h-[96px] w-full object-cover" />
                    <img src={product.photo} alt="Thumbnail 4" className="h-[96px] w-full object-cover" />
                </div>
            </div>

            {/* Right Section: Product Description */}
            <div className="flex flex-col lg:w-1/3 lg:ml-4 mt-4 lg:mt-0">
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <img src={star_icon} alt="Star 1" className="w-5 h-5" />
                    <img src={star_icon} alt="Star 2" className="w-5 h-5" />
                    <img src={star_icon} alt="Star 3" className="w-5 h-5" />
                    <img src={star_icon} alt="Star 4" className="w-5 h-5" />
                    <img src={star_dull_icon} alt="Star 5" className="w-5 h-5" />
                    <p className="text-sm">(122)</p>
                </div>
                <div className="text-xl font-semibold text-red-500 mt-4">
                    RM{product.price}
                </div>
                <p className="mt-4 text-gray-600 text-sm">{product.description}</p>
                {sizes.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-600">Select Size</h2>
                        <div className="flex gap-4 mt-2">
                            {sizes.map((size, index) => (
                                <div key={index} className="px-6 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    onClick={() => addToCart(product.id)}
                    className="mt-6 py-3 px-8 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                    ADD TO CART
                </button>
                <p className="mt-4 text-sm text-gray-500"><span className="font-semibold">Tags:</span> Modern, Latest</p>
            </div>
        </div>
    );
};

export default ProductDisplay;
