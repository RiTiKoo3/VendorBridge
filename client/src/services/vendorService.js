import axios from "./AxiosInstance";

export const getVendors = async () => {
  const response = await axios.get("/vendors");
  return response.data;
};