import { useNavigate, useParams } from "react-router-dom";
import { usePostHook } from "../../hooks/postHook";
import { useCommentHook } from "../../hooks/commentHook";

import { useState, useEffect, isValidElement } from "react";
import Post from "../../components/Posts/Post";
import "./style.css";
import Button from "../../components/ui/Button";
import { authStore } from "../../store/auth";
import Axios from "axios";
import { API_URL } from "../../constants";
import Textarea from "../../components/ui/Textarea";
import { commentSchema } from "../../validation-schemas/comment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const CurrentPost = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getPost, deletePost } = usePostHook();
  const { createComment } = useCommentHook();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(commentSchema),
  });

  useEffect(() => {
    const specificPost = async () => {
      try {
        // const response = await Axios.get(`${API_URL}posts/${params.postId}`);
        const response = await getPost(params.postId);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    specificPost();
  }, []);

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

  const onSubmit = async (data) => {
    try {
      if (isLoggedIn) {
        createComment(data, post._id);
        console.log(data);
      } else {
        alert("Connect first");
      }
    } catch (err) {
      console.log("Could not create comment");
    }
  };

  return (
    <>
      <div className="specificPost-container">
        <div className="title-container">
          <p>{post.title}</p>
        </div>
        <div className="description-container">
          <p>{post.description}</p>
        </div>
        {isLoggedIn && userId === post.creatorId && (
          <Button label="delete" onClick={removePost} />
        )}
        {/* or */}
        {/* {isLoggedIn && userId === post.creatorId ? (
          <Button label="delete" onClick={removePost}></Button>
        ) : null} */}
      </div>
      <form className="comment-container" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          className="comment-content "
          name="description"
          type="text"
          placeholder="Create a comment for this post"
          register={register}
        />
        <Button type="submit" label="Comment" onClick={onSubmit} />
      </form>
    </>
  );
};

export default CurrentPost;
