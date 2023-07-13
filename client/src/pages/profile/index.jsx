import "./style.css";
import { useEffect, useState } from "react";
import { useProfileHook } from "../../hooks/profileHook";

const Profile = () => {
  const [user, setUser] = useState({});
  const { getProfile } = useProfileHook();

  useEffect(() => {
    const getSpecificProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificProfile();
  }, []);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   currentUser(data);
  // };

  return (
    <>
      <div>
        <div className="user-content">
          <h1>Username: {user.username}</h1>
          <h1>name: {user.name}</h1>
          <h1>surname: {user.surname}</h1>
          <h1>Email: {user.email}</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
