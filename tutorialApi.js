import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/tutorials" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitnesstrack-app-token"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchTutorials = () => API.get("/");
export const fetchTutorial = (slugOrId) => API.get(`/${slugOrId}`);
export const createTutorial = (payload) => API.post("/", payload);
export const updateTutorial = (id, payload) => API.put(`/${id}`, payload);
export const deleteTutorial = (id) => API.delete(`/${id}`);