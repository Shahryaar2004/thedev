import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CartContext } from "../Pages/CartContext";
import prod_img from "../assets/images.jpeg";
import "../Css/Search.css";

const Search = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------
  //  ADD TO CART (same as Products.jsx)
  // --------------------------------
  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);

    if (!exists) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      alert(`${product.name} added to cart`);
    } else {
      alert("Product already in cart");
    }
  };

  // --------------------------------
  //  SEARCH SUBMIT HANDLER
  // --------------------------------
  const onSubmit = async (data) => {
    setSearched(false);
    setResults([]);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/Searchproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name }),
      });

      if (!res.ok) throw new Error("Search failed");

      const products = await res.json();
      setResults(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setSearched(true);
    }
  };

  return (
    <>
      <div className="search-container">
        <h1>Search Product</h1>

        {/* SEARCH FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
          <input
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}

          <input
            type="submit"
            value={isSubmitting ? "Searching..." : "Search"}
          />
        </form>

        {error && <div className="error-message">{error}</div>}

        {/* RESULTS SECTION */}
        {searched && (
          <div className="results-section">
            <h2>Results:</h2>

            {results.length > 0 ? (
              <ul className="product-list">
                {results.map((product) => (
                  <li key={product._id} className="product-item">
                    {/* CLICKABLE PRODUCT CARD (same as Products.jsx) */}
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={product.image || product.mainImage || prod_img}
                        alt={product.name}
                      />
                    </Link>

                    <strong>{product.name}</strong> <br />
                    <span>Rs {product.price}</span> <br />
                    <span>Category: {product.category}</span> <br />
                    <span>Brand: {product.brand}</span> <br />

                    {/* ADD TO CART BUTTON */}
                    <button
                      className="cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matching products found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
