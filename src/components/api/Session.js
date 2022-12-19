import axios from "axios";

const Api = axios.create({
    baseURL: 'https://tdp-backend-develop.onrender.com'
});
export default Api;
