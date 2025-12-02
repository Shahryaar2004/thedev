import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../Css/products.css";
import prod_img from "../assets/images.jpeg";
import { FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../Pages/CartContext";

const Products = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showHamburger, setShowHamburger] = useState(false);

  const categories = ["All", "Clothing", "Kitchen", "Accessories", "Electronics"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products", {
        headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      alert(`${product.name} added to cart`);
    } else {
      alert("Product already in cart");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <img src={prod_img} alt="Logo" className="nav-logo" />
        </div>

        <div className="nav-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="nav-right">
          {/* SEARCH ICON → GO TO SEARCH PAGE */}
          <Link to="/search">
            <FiSearch className="search-icon" />
          </Link>

          <Link to="/checkout" className="floating-cart-icon">
            <FiShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </Link>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="mobile-navbar">
        <div className="mobile-left">
          <FiMenu
            className="hamburger-icon"
            onClick={() => setShowHamburger(!showHamburger)}
          />
          <img src={prod_img} alt="Logo" className="mobile-logo" />
        </div>

        <div className="mobile-right">

          {/* SEARCH ICON MOBILE → GO TO SEARCH PAGE */}
          <Link to="/search">
            <FiSearch className="search-icon" />
          </Link>

          <Link to="/checkout" className="floating-cart-icon">
            <FiShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </Link>
        </div>
      </div>

      {/* HAMBURGER MENU */}
      <div className={`hamburger-drawer ${showHamburger ? "open" : ""}`}>
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              className={selectedCategory === cat ? "active-cat" : ""}
              onClick={() => {
                setSelectedCategory(cat);
                setShowHamburger(false);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* TOTAL PRODUCTS */}
      <div className="total-products">
        <h2>Total products: {filteredProducts.length}</h2>
      </div>

      {/* PRODUCT LISTING */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products available.</p>
      ) : (
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product._id} className="product-item">
              <Link to={`/products/${product.slug}`}>
                <img src={product.image || product.mainImage || prod_img} alt={product.name} />
              </Link>

              <strong>{product.name}</strong> <br />
              <span>Rs {product.price}</span> <br />
              <span>Category: {product.category}</span> <br />
              <span>Brand: {product.brand}</span> <br />

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Products;
