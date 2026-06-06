import axios from "./AxiosInstance";

export const createRFQ = async (data) => {
  const response = await axios.post("/rfqs", data);
  return response.data;
};

export const getRFQs = async () => {
  const response = await axios.get("/rfqs");
  return response.data;
};