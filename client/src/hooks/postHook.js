import { useState } from "react";
import { API_URL } from "../constants";
import Axios from "axios";
import { authStore } from "../store/auth";

export const usePostHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = authStore((store) => store);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createPost = async (data) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}posts`, data, config);
      setLoading(false);
      console.log(response.data.post);
      return {
        message: "OK",
        data: response.data.post,
      };
    } catch (err) {
      return {
        message: "Could not create post",
        data: null,
      };
    }
  };

  const getPosts = async (creatorId = "") => {
    try {
      setLoading(true);
      let url = `${API_URL}posts`;
      if (creatorId) {
        url = url + `?creatorId=${creatorId}`;
      }
      const response = await Axios.get(url);
      setLoading(false);
      if (response?.data?.posts) {
        // console.log(response.data.posts);
        return response.data.posts;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Could not get Posts");
    }
  };

  const getPost = async (postId) => {
    try {
      const response = await Axios.get(`${API_URL}posts/${postId}`);
      // console.log(response);
      if (response?.data?.post) {
        return response.data.post;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Could not get Post");
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
        message: "Could not delete post",
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
    error,
  };
};
