import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-mul7.onrender.com",
});

export default API;