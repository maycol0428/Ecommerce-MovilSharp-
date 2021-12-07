import React from "react";
import ReactStars from "react-rating-stars-component";
const RatingStars = ({ ...options }) => {
  return <ReactStars {...options} />;
};

export default RatingStars;
