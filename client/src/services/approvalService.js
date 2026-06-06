import axios from "./AxiosInstance";

export const createApproval = async (data) => {
  const response = await axios.post("/approvals", data);
  return response.data;
};

export const getApprovals = async () => {
  const response = await axios.get("/approvals");
  return response.data;
};