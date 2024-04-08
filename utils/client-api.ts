import axios from "axios";

const axios1InchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_1INCH_PROXY_URL || "",
  headers: {
    "Content-Type": "application/json"
  }
});

export default axios1InchClient;
