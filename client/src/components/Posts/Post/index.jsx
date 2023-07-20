import { useState } from "react";
import "./style.css";
import { authStore } from "../../../store/auth";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { formatDate } from "../../../utils/date";

const Post = ({ post, onClick }) => {
  const { isLoggedIn, userId } = authStore((store) => store);

  return (
    <div className="specificPost-container">
      <div className="specificPost-content">
        <h1>You Story</h1>
        <p style={{ fontSize: "30px" }}>
          <b>{post.title}</b>
        </p>
        <p style={{ fontSize: "20px", marginTop: "60px" }}>
          {post.description}
        </p>

        <div className="specificPost-info">
          {post.creatorId && (
            <h1>
              Story By:{" "}
              <Link to={`profile/${userId}`}>{post.creatorId.username}</Link>
            </h1>
          )}
          {post.date && <p>{formatDate(post.date)}</p>}
        </div>
      </div>

      {post.creatorId && userId === post.creatorId._id && (
        <Button
          style={{ marginTop: "1px" }}
          label="delete"
          onClick={onClick}></Button>
      )}
    </div>
  );
};

export default Post;
