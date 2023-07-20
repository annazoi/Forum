import Axios from "axios";
import { authStore } from "../store/auth";
import { API_URL } from "../constants";
import { useState } from "react";

export const useCommentHook = () => {
  const { token } = authStore((store) => store);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createComment = async (data, postId) => {
    try {
      setLoading(true);
      const response = await Axios.post(
        `${API_URL}posts/${postId}/comments`,
        data,
        config
      );
      setLoading(false);

      return {
        message: "ok",
        data: response.data,
      };
    } catch (err) {
      return {
        message: "Could not create Comment",
        data: null,
      };
    }
  };

  return {
    createComment,
    loading,
  };
};
