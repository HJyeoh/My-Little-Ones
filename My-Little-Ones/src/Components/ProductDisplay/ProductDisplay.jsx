import React, { useContext, useState } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // State to store selected size
  const [selectedSize, setSelectedSize] = useState(null);
  // State to show pop-up message for size selection
  const [showMessage, setShowMessage] = useState(false);
  // State to show success message for adding to cart
  const [successMessage, setSuccessMessage] = useState(false);

  // Define size options for different categories
  const sizeOptions = {
    boy_clothes: ["0-3 months", "3-6 months", "6-12 months", "12-18 months"],
    girl_clothes: ["0-3 months", "3-6 months", "6-12 months", "12-18 months"],
    maternity_clothes: ["S", "M", "L", "XL"],
    maternity_care: [],
    toys: [],
    shoes: ["0", "1", "2", "3", "4"],
    furniture: [],
    newborn_clothes: ["0-3 months", "3-6 months", "6-12 months"],
    feeding: [],
  };

  const sizes = sizeOptions[product.category] || [];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setShowMessage(false); // Hide message if size is selected
  };

  const handleAddToCart = () => {
    if (localStorage.getItem("userType") === "admin") {
      alert("You are not allowed to add items to cart as an admin");
      return;
    } else if (localStorage.getItem("userType") !== "user") {
      alert("Please log in to add items to the cart");
      return;
    }
    if (sizes.length > 0 && !selectedSize) {
      setShowMessage(true); // Show message if no size is selected for products that require it
    } else {
      addToCart(product.id, selectedSize || ""); // Pass the selected size or empty string if no size needed
      setSuccessMessage(true); // Show success message after adding to cart
      setTimeout(() => setSuccessMessage(false), 2000); // Hide success message after 2 seconds
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-8 py-4 justify-center">
      {/* Left Section: Thumbnails */}
      <div className="hidden lg:flex flex-col gap-2">
        <img
          src={`http://localhost:8080/demo-1.1/${
            product.photo || product.image
          }`}
          alt="Thumbnail 1"
          className="h-[96px] w-[96px] object-cover"
        />
        <img
          src={`http://localhost:8080/demo-1.1/${
            product.photo || product.image
          }`}
          alt="Thumbnail 2"
          className="h-[96px] w-[96px] object-cover"
        />
        <img
          src={`http://localhost:8080/demo-1.1/${
            product.photo || product.image
          }`}
          alt="Thumbnail 3"
          className="h-[96px] w-[96px] object-cover"
        />
        <img
          src={`http://localhost:8080/demo-1.1/${
            product.photo || product.image
          }`}
          alt="Thumbnail 4"
          className="h-[96px] w-[96px] object-cover"
        />
      </div>

      {/* Center Section: Main Product Image */}
      <div className="flex flex-col lg:min-w-2/5 lg:mr-12 ">
        <img
          src={`http://localhost:8080/demo-1.1/${
            product.photo || product.image
          }`}
          alt="Main product"
          className="w-full max-w-[500px] h-[700px] object-cover mx-auto lg:mx-0"
        />
        <div className="lg:hidden grid grid-cols-4 gap-2 mt-4">
          <img
            src={`http://localhost:8080/demo-1.1/${
              product.photo || product.image
            }`}
            alt="Thumbnail 1"
            className="h-[96px] w-full object-cover"
          />
          <img
            src={`http://localhost:8080/demo-1.1/${
              product.photo || product.image
            }`}
            alt="Thumbnail 2"
            className="h-[96px] w-full object-cover"
          />
          <img
            src={`http://localhost:8080/demo-1.1/${
              product.photo || product.image
            }`}
            alt="Thumbnail 3"
            className="h-[96px] w-full object-cover"
          />
          <img
            src={`http://localhost:8080/demo-1.1/${
              product.photo || product.image
            }`}
            alt="Thumbnail 4"
            className="h-[96px] w-full object-cover"
          />
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
          <p>RM{product.new_price.toFixed(2)}</p>
        </div>
        <p className="mt-4 text-gray-600 text-sm">{product.description}</p>
        {sizes.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-600">Select Size</h2>
            <div className="flex gap-4 mt-2">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedSize === size ? "bg-pink-200" : ""
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="mt-6 py-3 px-8 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        >
          ADD TO CART
        </button>
        {showMessage && (
          <div className="mt-4 text-sm text-red-500">
            <p>Please select a size before adding to the cart.</p>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 text-sm text-green-500">
            <p>Successfully added to cart!</p>
          </div>
        )}
        <p className="mt-4 text-sm text-gray-500">
          <span className="font-semibold">Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
