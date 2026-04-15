import axios from "axios";

const API = axios.create({
  baseURL: "https://amazon-clone-backend-0t2o.onrender.com/api",
});

export default API;