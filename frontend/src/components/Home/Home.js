import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../services/product";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


const Home = () => {
  const alert = useAlert();
  const { data, isLoading, error } = useGetProductsQuery();
  useEffect(() => {
    if (error) {
      if (error.status === "FETCH_ERROR") {
        alert.error(error.error);
        return;
      }
      alert.error("Something Error");
    }
  }, [error, alert]);
  return (
    <>
      <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse></CgMouse>
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {isLoading ? (
          <Loader></Loader>
        ) : data ? (
          data.products.map((product, index) => (
            <ProductCard key={index} product={product}></ProductCard>
          ))
        ) : (
          <p>Ocurrio un error</p>
        )}
      </div>
    </>
  );
};

export default Home;
