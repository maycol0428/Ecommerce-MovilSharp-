import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import { useGetProductsQuery } from "../../services/product";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import Slider from "@material-ui/core/Slider";
import "./Products.css";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
const categories = [
  "Laptop",
  "Tops",
  "Camera",
  "Asus",
  "SmartPhones",
  "Attire",
];
const Products = () => {
  const { keyword } = useParams();
  const initialQueryParams = {
    currentPage: 1,
    priceCommit: [0, 25000],
    keyword,
    category: "",
    rating: 0,
  };
  const alert = useAlert();
  const [price, setPrice] = useState([0, 25000]);
  const [rating, setRating] = useState(0);
  const [queryParams, setQueryParams] = useState(initialQueryParams);
  const { data, isLoading, error, isFetching } =
    useGetProductsQuery(queryParams);

  useEffect(() => {
    if (error) {
      alert.error(error.data.error);
    }
  }, [error, alert]);
  useEffect(
    () =>
      setTimeout(() => {
        document.body.scrollIntoView();
      }, 250),
    [queryParams]
  );

  const setCurrentPageNo = (e) => {
    setQueryParams((prevState) => ({ ...prevState, currentPage: e }));
  };

  return (
    <>
      <MetaData title={`Products -- ECOMMERCE`} />
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {isFetching ? (
              <Loader></Loader>
            ) : data.products.length !== 0 ? (
              data.products.map((product, i) => (
                <ProductCard product={product} key={i}></ProductCard>
              ))
            ) : (
              <p>No Products</p>
            )}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              onChangeCommitted={(e, valueCommit) => {
                setQueryParams((prevState) => ({
                  ...prevState,
                  currentPage: 1,
                  priceCommit: [...valueCommit],
                }));
              }}
              value={price}
              onChange={(e, value) => {
                setPrice([...value]);
              }}
              valueLabelDisplay="on"
              min={0}
              max={25000}
              step={2500}
              marks={[
                { value: 0, label: "0" },
                { value: 2000, label: "2" },
                { value: 5000, label: "5" },
                { value: 10000, label: "10" },
                { value: 25000, label: "25k" },
              ]}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              <li
                className={`category-link ${
                  queryParams.category === "" ? "category-active-link" : ""
                }`}
                onClick={() => {
                  setQueryParams((prevState) => ({
                    ...prevState,
                    currentPage: 1,
                    category: "",
                  }));
                }}
              >
                All
              </li>
              {categories.map((categoryName, i) => (
                <li
                  className={`category-link ${
                    queryParams.category === categoryName
                      ? "category-active-link"
                      : ""
                  }`}
                  key={i}
                  onClick={() => {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      currentPage: 1,
                      category: categoryName,
                    }));
                  }}
                >
                  {categoryName}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography>Ratings Above</Typography>
              <Slider
                onChangeCommitted={(e, valueCommit) => {
                  setQueryParams((prevState) => ({
                    ...prevState,
                    currentPage: 1,
                    rating: valueCommit,
                  }));
                }}
                value={rating}
                onChange={(e, value) => {
                  setRating(value);
                }}
                valueLabelDisplay="off"
                min={0}
                max={5}
                step={1}
                marks={[
                  { value: 0, label: "All" },
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
              />
            </fieldset>
            <button
              onClick={() => {
                setPrice([0, 25000]);
                setRating(0);
                setQueryParams(initialQueryParams);
              }}
            >
              Remove Filters
            </button>
          </div>
          {data.filteredProductsCount > data.resultPerPage && (
            <div className="paginationBox">
              <Pagination
                activePage={queryParams.currentPage}
                itemsCountPerPage={data.resultPerPage}
                totalItemsCount={data.filteredProductsCount}
                pageRangeDisplayed={5}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
