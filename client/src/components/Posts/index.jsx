import { useState, useEffect } from "react";
import { usePostHook } from "../../hooks/postHook";
import "./style.css";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
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

export default Posts;
