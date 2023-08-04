import { useState } from "react";
import "./style.css";
import { authStore } from "../../../store/auth";
import { Link, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { formatDate } from "../../../utils/date";
import { VscTrash } from "react-icons/vsc";

const Post = ({ post, onClick }) => {
  const { userId } = authStore((store) => store);

  return (
    <div className="specificPost-content">
      <span
        style={{
          borderBottom: "3px solid rgba(101, 101, 101, 0.252)",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}>
        Your Story
      </span>
      <span style={{ fontSize: "25px" }}>
        <b>{post.title}</b>
      </span>
      <span
        style={{
          fontSize: "20px",
          borderBottom: "3px solid rgba(101, 101, 101, 0.252)",
        }}>
        {post.description}
      </span>
      {post.creatorId && userId === post.creatorId._id && (
        <Button
          style={{ fontSize: "20px" }}
          label={<VscTrash />}
          onClick={onClick}></Button>
      )}
      <span>
        <h1>
          Story By:{" "}
          <Link to={`/profile/${post?.creatorId?._id}`}>
            {post?.creatorId?.username}
          </Link>
        </h1>
      </span>
      <span>{formatDate(post?.date)}</span>
    </div>
  );
};

export default Post;
