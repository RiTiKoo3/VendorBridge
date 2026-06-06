import axios from "./AxiosInstance";

export const createVendor = async (data) => {
  const response = await axios.post("/vendors", data);
  return response.data;
};

export const getVendors = async () => {
  const response = await axios.get("/vendors");
  return response.data;
};

export const deleteVendor = async (id) => {
  const response = await axios.delete(`/vendors/${id}`);
  return response.data;
};