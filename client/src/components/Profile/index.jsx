import { authStore } from "../../store/auth";
import Button from "../ui/Button";
import "./style.css";
import { VscTools } from "react-icons/vsc";

const Profile = ({ user, onClick }) => {
  const { userId } = authStore((store) => store);
  return (
    <>
      <div className="profile-component-container">
        <img className="photo-profile" src={user.image} alt="" />
        <div className="profile-content">
          <h1>
            <b>{user.username}</b>
          </h1>
        </div>
      </div>
      {userId === user._id && (
        <div className="profile-component-content">
          <p>
            <b style={{ color: "rgb(52, 83, 25)" }}>Full Name: </b>
            {user.name} {user.surname}
          </p>
          <p>
            <b style={{ color: "rgb(52, 83, 25)" }}>Username: </b>{" "}
            {user.username}
          </p>
          <p>
            <b style={{ color: "rgb(52, 83, 25)" }}>Email: </b>
            {user.email}
          </p>
          <Button label={<VscTools />} onClick={onClick} />
        </div>
      )}
    </>
  );
};

export default Profile;
