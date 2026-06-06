import axios from "./AxiosInstance";

export const createPurchaseOrder = async (data) => {
  const response = await axios.post("/purchase-orders", data);

  return response.data;
};

export const getPurchaseOrders = async () => {
  const response = await axios.get("/purchase-orders");

  return response.data;
};
