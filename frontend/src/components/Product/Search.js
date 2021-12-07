import React, { useState } from "react";
import { useHistory } from "react-router";
import MetaData from "../layout/MetaData";
import "./Search.css";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const searchSubmitHanlder = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };
  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHanlder}>
        <input
          type="text"
          placeholder="Search a Product..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
