import axios from "axios";
import { Import } from "lucide-react";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
