import { useState, useEffect } from "react";
import "./style.css";
import { usePostHook } from "../../hooks/postHook";

const Post = ({ posts }) => {
  return (
    <>
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
    </>
  );
};

export default Post;
