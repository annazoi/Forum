import { Axios } from "axios";
import "./style.css";
import { API_URL } from "../../constants";

const Profile = () => {
  const currentUser = async (data) => {
    const response = await Axios.get(`${API_URL}users`, data);
  };

  const onSubmit = (data) => {
    console.log(data);
    currentUser(data);
  };
  return (
    <>
      <div>
        <h1>profile</h1>
      </div>
    </>
  );
};

export default Profile;
