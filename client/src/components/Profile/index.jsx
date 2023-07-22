import "./style.css";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>{user.name}</p>
      <p>{user.surname}</p>
      <p>{user.username}</p>
    </div>
  );
};

export default Profile;
