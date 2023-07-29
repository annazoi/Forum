import Axios from "axios";
import { API_URL } from "../constants";
import { useState } from "react";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const loginUser = async (data) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}auth/login`, data);
      setLoading(false);
      setData(response.data);
      console.log(response.data.userId);
    } catch (err) {
      const message = err.response.data.message;
      setError(message);
    }
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}auth/register`, data);
      setLoading(false);
      setData(response.data);
    } catch (err) {
      const message = err.response.data.message;
      setError(message);
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await Axios.get(`${API_URL}auth/${userId}`);

      if (response?.data?.user) {
        return response.data.user;
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Could not get User");
    }
  };

  return {
    loginUser,
    registerUser,
    getUser,
    loading,
    error,
    data,
  };
};
