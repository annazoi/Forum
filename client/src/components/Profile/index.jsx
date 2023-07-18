import "./style.css";

const Profile = ({ post }) => {
  return (
    <div>
      {" "}
      <p>{post.creatorId.username}</p>
    </div>
  );
};

export default Profile;
