import { useState, useEffect } from "react";
import { usePostHook } from "../../hooks/postHook";
import "./style.css";
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index} className="post-container">
            {/* <div className="post-content"> */}
            <Link to={`/post/${post._id}`}>{post.title}</Link>
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
};

const CurrentPost = ({ posts }) => {
  return (
    <div className="posts-container">
      {posts.map((post, index) => {
        return (
          <div key={index} className="post-container">
            <div className="post-content">
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
// export default CurrentPost;
