import "./style.css";

const Profile = ({ user, posts }) => {
  return (
    <>
      <div className="profile-container">
        <img className="photo-profile" src={user.image} alt="" />
        <div className="profile-content">
          <p>{user.username}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
