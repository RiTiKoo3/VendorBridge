import axios from "./AxiosInstance";

export const createInvoice = async (data) => {
  const response = await axios.post("/invoices", data);

  return response.data;
};

export const getInvoices = async () => {
  const response = await axios.get("/invoices");

  return response.data;
};
