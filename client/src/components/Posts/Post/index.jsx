import { useState } from "react";
import "./style.css";
import { authStore } from "../../../store/auth";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const Post = ({ post, onClick }) => {
  const { isLoggedIn, userId } = authStore((store) => store);

  return (
    <div className="specificPost-container">
      <div className="title-container">
        <p>{post.title}</p>
      </div>
      <div className="description-container">
        <p>{post.description}</p>
      </div>
      <div className="post-info">
        {post.creatorId && (
          <Link to={`profile/${userId}`}>{post.creatorId.username}</Link>
        )}
        {post.date && <p>{post.date}</p>}
      </div>

      {post.creatorId && userId === post.creatorId._id && (
        <Button label="delete" onClick={onClick}></Button>
      )}
    </div>
  );
};

export default Post;
