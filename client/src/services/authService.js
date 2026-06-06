import axios from "./AxiosInstance";

export const registerUser = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}