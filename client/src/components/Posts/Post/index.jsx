import { useState } from "react";
import "./style.css";

const Post = ({ post, onClick }) => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getPost, deletePost } = usePostHook();

  const removePost = async () => {
    if (isLoggedIn && userId === post.creatorId) {
      await deletePost(post._id).then((response) => {
        console.log("deleted");
      });
      navigate("/home");
    } else {
      // alert("delete only your post");
    }
  };

  return (
    <div className="specificPost-container">
      <div className="title-container">
        <p>{post.title}</p>
      </div>
      <div className="description-container">
        <p>{post.description}</p>
      </div>

      {isLoggedIn && userId === post.creatorId ? (
        <Button label="delete" onClick={onClick}></Button>
      ) : null}
    </div>
  );
};

export default Post;
