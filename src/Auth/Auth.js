import axios from "axios";

export default function Auth() {
  axios.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;    
    return config;
  });
}
