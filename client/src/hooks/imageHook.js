import Axios from "axios";
import { API_URL } from "../constants";

export const useImageHook = () => {
  const getImage = async (imageId) => {
    try {
      const response = await Axios.get(`${API_URL}image`, imageId);
      return {
        message: "ok",
        data: response.data,
      };
    } catch (err) {
      return {
        message: err,
        data: null,
      };
    }
  };

  const postImage = async (data) => {
    try {
      const response = await Axios.post(`${API_URL}image`, data);
      return {
        message: "ok",
        data: response.data,
      };
    } catch (err) {
      return {
        message: err,
        data: null,
      };
    }
  };

  return {
    getImage,
    postImage,
  };
};
