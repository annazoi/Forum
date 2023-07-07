import { useState } from "react";
import { API_URL } from "../constants";
import Axios from "axios";

export const usePostHook = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const postUser = async (data) => {
    setLoading(true);
    const response = await Axios.post(`${API_URL}posts`, data);
    setLoading(false);
    setData(response.data);
  };

  return {
    postUser,
    data,
    loading,
  };
};
