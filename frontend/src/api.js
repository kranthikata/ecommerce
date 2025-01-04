import axios from "axios";

// Axios instance to handle API calls
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Base URL of your backend
});

export default api;
