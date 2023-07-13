import { useState } from "react";
import { API_URL } from "../constants";
import Axios from "axios";
import { authStore } from "../store/auth";

export const usePostHook = () => {
  const [loading, setLoading] = useState(false);
  const { token } = authStore((store) => store);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createPost = async (data, id) => {
    setLoading(true);
    const response = await Axios.post(`${API_URL}posts`, data, config);
    // setUserId(userId);
    setLoading(false);
    console.log(response.data);
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

  const getPost = async (postId) => {
    try {
      const response = await Axios.get(`${API_URL}posts/${postId}`);
      return {
        message: "ok",
        data: response.data,
      };
    } catch (error) {
      return {
        message: "error with get specific post",
        data: null,
      };
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await Axios.delete(`${API_URL}posts/${postId}`);
      return {
        message: "delete ok",
        data: response.data,
      };
    } catch (error) {
      return {
        message: "error with delete a post",
        data: null,
      };
    }
  };

  return {
    createPost,
    getPosts,
    getPost,
    deletePost,
    loading,
  };
};
