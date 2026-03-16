import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8080/api/contacts" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitnesstrack-app-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const submitContact = (payload) => API.post("/", payload);
export const getContacts = () => API.get("/");
export const updateContact = (id, payload) => API.put(`/${id}`, payload);
export const deleteContact = (id) => API.delete(`/${id}`);