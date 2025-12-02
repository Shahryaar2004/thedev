import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Css/productdetails.css";

const dummyProduct = {
  id: "p1",
  sku: "DRS-001",
  slug: "floral-wrap-dress",
  name: "Floral Wrap Dress",
  title: "Floral Wrap Dress",
  description:
    "Lightweight summer floral wrap dress with V-neck, short sleeves and adjustable waist tie. Perfect for brunch, dates and travel.",
  category: "fashion",
  brand: "SummerStyle",
  price: 39.99,
  originalPrice: 49.99,
  saleOffPercent: 20,
  currency: "USD",
  quantity: 35,
  maxPurchaseLimit: 5,
  cashOnDelivery: true,
  mainImage:
    "https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=400",
  images: [
    "https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6311581/pexels-photo-6311581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  colors: [
    { name: "Red", code: "#FF4B5C" },
    { name: "Blue", code: "#1E88E5" },
    { name: "Black", code: "#111827" },
  ],
  sizes: ["S", "M", "L", "XL"],
  rating: 4.6,
  ratingCount: 123,
  tags: ["women", "dress", "floral", "summer"],
  returnPolicyDays: 7,
  freeShipping: true,
};

const ProductDetails = () => {
  const { slug } = useParams();

  const product = dummyProduct; // replace later with API or global products
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div className="product-page">

      {/* LEFT — IMAGES */}
      <div className="images-section">
        <img src={selectedImage} alt={product.name} className="main-image" />

        <div className="thumbnail-row">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="thumbnail"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — DETAILS */}
      <div className="details-section">
        
        <h1 className="product-title">{product.name}</h1>

        <div className="price-box">
          <span className="price">${product.price}</span>
          <span className="old-price">${product.originalPrice}</span>
          <span className="discount">{product.saleOffPercent}% OFF</span>
        </div>

        <p className="rating">
          ⭐ {product.rating} ({product.ratingCount} reviews)
        </p>

        <p className="description">{product.description}</p>

        {/* COLORS */}
        <h4>Color</h4>
        <div className="color-row">
          {product.colors.map((c) => (
            <div
              className={`color-dot ${selectedColor === c.code ? "active" : ""}`}
              key={c.code}
              style={{ backgroundColor: c.code }}
              onClick={() => setSelectedColor(c.code)}
            ></div>
          ))}
        </div>

        {/* SIZES */}
        <h4>Size</h4>
        <div className="size-row">
          {product.sizes.map((s) => (
            <button
              key={s}
              className={`size-btn ${selectedSize === s ? "active" : ""}`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ADD TO CART */}
        <button className="add-cart-btn">ADD TO CART</button>

        {/* EXTRA INFO */}
        <div className="extra-info">
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicyDays} days</p>
          <p><strong>Shipping:</strong> {product.freeShipping ? "Free" : "Paid"}</p>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
