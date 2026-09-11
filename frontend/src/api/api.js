import axios from "axios";

const API = axios.create({
  baseURL: "https://usage-billing-system.onrender.com/api"
});

export const createUser = async (userData) => {
  const response = await API.post("/users", userData);

  return response.data;
};

export const getUsers = async () => {
  const response = await API.get("/users");

  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await API.post("/resources", resourceData);
  return response.data;
};

export const getResources = async () => {
  const response = await API.get("/resources");
  return response.data;
};

export const startUsage = async (usageData) => {
  const response = await API.post("/usage/start", usageData);

  return response.data;
};

export const getActiveUsages = async () => {
  const response = await API.get("/usage/active");

  return response.data;
};

export const stopUsage = async (usageId) => {
  const response = await API.post("/usage/stop", {
    usageId
  });

  return response.data;
};

export const getUsageHistory = async () => {
  const response = await API.get("/usage/history");
  return response.data;
};