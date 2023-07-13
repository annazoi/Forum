import { API_URL } from "../constants";
import Axios from "axios";
import { authStore } from "../store/auth";

export const useProfileHook = () => {
  const { userId } = authStore((store) => store);

  const getProfile = async () => {
    try {
      const response = await Axios.get(`${API_URL}auth/${userId}`);
      return {
        message: "ok",
        data: response.data,
      };
    } catch (err) {
      return {
        message: "Could not get profile",
        data: null,
      };
    }
  };

  return {
    getProfile,
  };
};
