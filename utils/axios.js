import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.90.41:8000/api",
    headers: {
        "Accept": "application/json",
    }
});

export default instance;