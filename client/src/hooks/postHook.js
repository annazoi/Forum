import { useState } from "react";
import { API_URL } from "../constants";
import Axios from "axios";

export const usePostHook = () => {
  const [loading, setLoading] = useState(false);

  const createPost = async (data) => {
    setLoading(true);
    const response = await Axios.post(`${API_URL}posts`, data);
    setLoading(false);
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`${API_URL}posts`);
      setLoading(false);
      return {
        message: "ok",
        data: response.data,
      };
    } catch (error) {
      setLoading(false);
      return {
        message: "Could not get posts",
        data: null,
      };
    }
  };

  return {
    createPost,
    getPosts,
    loading,
  };
};
