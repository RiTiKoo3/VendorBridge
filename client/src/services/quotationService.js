import axios from "./AxiosInstance";

export const createQuotation = async (data) => {
  const response = await axios.post("/quotations", data);
  return response.data;
};

export const getQuotations = async () => {
  const response = await axios.get("/quotations");
  return response.data;
};