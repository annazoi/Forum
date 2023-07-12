import Axios from "axios";
import "./style.css";
import { API_URL } from "../../constants";
import { useAuthHook } from "../../hooks/authHook";
import { useEffect, useState } from "react";
import { authStore } from "../../store/auth";

const Profile = () => {
  const { userId } = authStore((store) => store);
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await Axios.get(`${API_URL}auth/${userId}`);
        // console.log(response.data);
        setUser(response.data);
        // console.log(userId);
      } catch (error) {
        console.log(error);
      }
    };
    currentUser();
  }, []);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   currentUser(data);
  // };

  return (
    <>
      <div>
        <div className="user-content">
          <h1>name: {user.name}</h1>
          <h1>surname: {user.surname}</h1>
          <h1>Email: {user.email}</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
