import "./style.css";
import { useEffect, useState } from "react";
import { useProfileHook } from "../../hooks/profileHook";
import Button from "../../components/ui/Button";
import { useImageHook } from "../../hooks/imageHook";
import { usePostHook } from "../../hooks/postHook";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});
  const { getProfile } = useProfileHook();
  const { getImage } = useImageHook();
  const [image, setImage] = useState("");

  useEffect(() => {
    const getSpecificProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSpecificProfile();
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <div>
        <div className="user-content">
          <h1>Username: {user.username}</h1>
          <h1>name: {user.name}</h1>
          <h1>surname: {user.surname}</h1>
          <h1>Email: {user.email}</h1>
        </div>
        <Button label="Settings"></Button>
      </div>
    </>
  );
};

export default Profile;
