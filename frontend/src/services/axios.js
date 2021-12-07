import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
