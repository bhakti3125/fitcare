import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8080/api/blogs" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitnesstrack-app-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchBlogs = () => API.get("/");
export const fetchBlog = (slugOrId) => API.get(`/${slugOrId}`);
export const createBlog = (payload) => API.post("/", payload);
export const updateBlog = (id, payload) => API.put(`/${id}`, payload);
export const deleteBlog = (id) => API.delete(`/${id}`);