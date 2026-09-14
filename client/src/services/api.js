import axios from "axios";


const API = axios.create({
    baseURL: (import.meta.env.VITE_API_URL ||
        "https://propify-api-81qi.onrender.com/api").replace(/\/$/, ""),
    headers: {
        "Content-Type": "application/json"
    }
});


export default API;