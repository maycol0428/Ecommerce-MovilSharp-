// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const apiUrl = process.env.REACT_APP_API_URL;
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        const keyword = args?.keyword ?? "";
        const currentPage = args?.currentPage ?? 1;
        const price = args?.priceCommit ?? [0, 25000];
        const category = args?.category ?? "";
        const rating = args?.rating ?? 0;
        return `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating=${rating}`;
      },
    }),
    getProduct: builder.query({
      query: (productId) => `product/${productId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery } = productApi;
