import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/uploadarea.png";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "boy_clothes",
    description: "", // Added description field
  });
  const [image, setImage] = useState(null);

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit product details and upload image
  const Add_Product = async () => {
    try {
      // Check if an image is selected
      if (!image) {
        alert("Please select an image.");
        return;
      }

      // Prepare FormData for image upload
      const formData = new FormData();
      formData.append("file", image); // 'file' is the part name expected by the upload servlet

      // Step 1: Upload the image to get the image URL
      const uploadResponse = await fetch(
        "http://localhost:8080/demo-1.1/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // Parse the image upload response
      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.url) {
        alert(
          "Image upload failed: " + (uploadResult.error || "Unknown error")
        );
        return;
      }

      // Step 2: Prepare the product data to send with the image URL
      const productData = {
        name: productDetails.name,
        category: productDetails.category,
        image: uploadResult.url, // Use the URL of the uploaded image
        old_price: 0,
        new_price: productDetails.new_price,
        description: productDetails.description, // Include description
      };

      // Prepare the data in URL-encoded format
      const urlEncodedData = new URLSearchParams(productData);

      // Send the request to the backend using application/x-www-form-urlencoded
      const response = await fetch(
        "http://localhost:8080/demo-1.1/createproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Specify the content type as URL-encoded
          },
          body: urlEncodedData.toString(), // Convert the data to URL-encoded string
        }
      );

      // Parse the response from the create product endpoint
      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        // Reset form after successful submission
        setProductDetails({
          name: "",
          old_price: "",
          new_price: "",
          category: "boy",
          description: "",
        });
        setImage(null);
      } else {
        alert("Error adding product: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="add-product">
      <h1 className="add-product-title mb-4 text-xl">Add New Product</h1>
      <div className="add-product-form">
        {/* Product Title */}
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            type="text"
            name="name"
            placeholder="Enter product title"
            value={productDetails.name}
            onChange={changeHandler}
            className="addproduct-input"
          />
        </div>

        {/* Price and Offer Price */}
        <div className="addproduct-price my-4">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              type="text"
              name="new_price"
              placeholder="Enter price"
              value={productDetails.new_price}
              onChange={changeHandler}
              className="addproduct-input"
            />
          </div>
        </div>

        {/* Product Category */}
        <div className="addproduct-itemfield my-4">
          <p>Product Category</p>
          <select
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
            className="add-product-selector min-w-[160px]"
          >
            <option value="boy_clothes">Boy Clothes</option>
            <option value="girl_clothes">Girl Clothes</option>
            <option value="newborn_clothes">Newborn Clothes</option>
            <option value="maternity_clothes">Maternity Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="toys">Toys</option>
            <option value="feeding">Feeding</option>
            <option value="maternity_care">Maternity Care</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        {/* Product Description */}
        <div className="addproduct-itemfield mt-4">
          <p>Product Description</p>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={productDetails.description}
            onChange={changeHandler}
            className="addproduct-textarea"
          />
        </div>

        {/* Product Image */}
        <div className="addproduct-itemfield">
          <p>Product Image</p>
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Product Thumbnail"
              className="addproduct-thumbnail-img"
            />
          </label>
          <input
            type="file"
            name="image"
            id="file-input"
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* Add Product Button */}
        <button className="addproduct-btn" onClick={Add_Product}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
