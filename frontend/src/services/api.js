import axios from "axios";

const API = axios.create({
  baseURL: "https://amazon-clone-backend-ot2o.onrender.com/api",
});

export default API;