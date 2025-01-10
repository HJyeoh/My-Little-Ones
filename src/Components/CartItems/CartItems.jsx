import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();  // Initialize the navigate function

    // Format numbers to two decimal places
    const formatPrice = (price) => price.toFixed(2);  // Use toFixed(2) for two decimal places

    // Function to handle checkout redirection
    const handleCheckout = () => {
        navigate('/payment');  // Redirect to the Payment page
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            <div>
                {all_product.map((product) => {
                    if (cartItems[product.id] > 0) {
                        return (
                            <div key={product.id}>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={product.photo} alt="product" className="carticon-product-icon" />
                                    <p>{product.name}</p> 
                                    <p>RM{formatPrice(product.price)}</p>
                                    <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                                    <p>RM{formatPrice(product.price * cartItems[product.id])}</p>
                                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id)} alt="remove item" />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>RM{formatPrice(getTotalCartAmount())}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>RM{formatPrice(getTotalCartAmount())}</h3>
                    </div>
                </div>
                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartItems;
