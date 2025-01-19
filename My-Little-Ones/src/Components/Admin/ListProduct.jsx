import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cart_cross_icon.png";

const ListProduct = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Products to display (filtered)
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter

  const productsPerPage = 10;

  // Categories mapping for readable names
  const categoryMapping = {
    boy_clothes: "Boy Clothes",
    girl_clothes: "Girl Clothes",
    newborn_clothes: "Newborn Clothes",
    maternity_clothes: "Maternity Clothes",
    shoes: "Shoes",
    toys: "Toys",
    feeding: "Feeding",
    maternity_care: "Maternity Care",
    furniture: "Furniture",
    // Add more categories as needed
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/demo-1.1/showproduct"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initially, all products are shown
    } catch (error) {
      console.error(error);
    }
  };

  // Handle product deletion
  const handleRemoveProduct = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/demo-1.1/removeproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product.id !== id)
        );
        alert(`Product "${result.name}" removed successfully!`);
      } else {
        alert(`Error: ${result.error || "Failed to remove product"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);

    if (category === "") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to the first page
  };

  // Paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll to the top of the page instantly when the page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to the top of the page instantly
    }
  };

  return (
    <div className="list-product">
      {/* Product List */}
      <h1>All Product List</h1>

      {/* Filter and Search */}
      <div className="filters py-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar border border-gray-600 px-2 rounded-sm mr-4"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {Object.keys(categoryMapping).map((categoryKey) => (
            <option key={categoryKey} value={categoryKey}>
              {categoryMapping[categoryKey]}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="listproduct-format-main border-b border-b-slate-400 mb-3">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p className="text-center">Remove</p>
      </div>
      <div id="product-list" className="w-full">
        {currentProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-3 text-sm md:text-md lg:text-lg "
            >
              <img
                src={`http://localhost:8080/demo-1.1/${
                  product.photo || product.image
                }`}
                alt={product.name}
                className="listproduct-product-icon mb-4 md:min-w-[65px] h-full"
              />
              <p className="mt-2">{product.name}</p>
              <p className="mt-2">RM{product.new_price.toFixed(2)}</p>
              <p className="mt-2">{categoryMapping[product.category]}</p>{" "}
              {/* Display category in readable form */}
              <img
                src={cross_icon}
                alt="Remove"
                className="mt-2 listproduct-remove-icon ml-[40%]"
                onClick={() => handleRemoveProduct(product.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={
                currentPage === i + 1
                  ? "active-page border-x border-white"
                  : "border border-white "
              }
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ListProduct;
