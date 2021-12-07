import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../shared/ReactStars";
const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={
          product.images.length !== 0
            ? product.images[0].url
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        }
        alt={product.name}
      />
      <p>{product.name}</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <RatingStars
          edit={false}
          color={"rgba(20,20,20,0.1)"}
          activeColor={"tomato"}
          size={window.innerWidth < 600 ? 20 : 25}
          value={product.rating}
          isHalf={true}
        />
        <span className="productCardSpan">(255 Reviews)</span>
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
