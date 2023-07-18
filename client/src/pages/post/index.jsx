import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostHook } from "../../hooks/postHook";
import { useCommentHook } from "../../hooks/commentHook";
import { useState, useEffect, isValidElement, useRef } from "react";
import "./style.css";
import Button from "../../components/ui/Button";
import { authStore } from "../../store/auth";
import Textarea from "../../components/ui/Textarea";
import { commentSchema } from "../../validation-schemas/comment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthHook } from "../../hooks/authHook";
import Comments from "../../components/Comment";
import Post from "../../components/Posts/Post";

const post = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getUser } = useAuthHook();
  const { getPost, deletePost } = usePostHook();
  const { createComment } = useCommentHook();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
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
        setComments(response.data.comments);
        console.log(response.data);
        // console.log(response.data.creatorId);
      } catch (error) {
        console.log(error);
      }
    };

    specificPost();
  }, []);

  const removePost = async () => {
    if (post.creatorId && userId === post.creatorId._id) {
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
        await createComment(data, post._id);
        setComment(data);
        // console.log(data);
      } else {
        alert("Connect first");
      }
    } catch (err) {
      console.log("Could not create comment");
    }
  };

  return (
    <>
      <Post post={post} onClick={removePost}></Post>

      <div className="specific-post-container">
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              style={{
                fontSize: "20px",
                textDecoration: "none",
              }}>
              <b>Login</b>
            </Link>
            <h1>Please connect first to comment</h1>
          </>
        )}

        <Comments comments={comments} />

        <form
          className="forum-comment-container"
          onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            className="forum-comment-content "
            name="description"
            placeholder="Create a comment for this post"
            register={register}
          />
          <Button type="submit" label="Comment" onClick={onSubmit} />
        </form>
      </div>
    </>
  );
};

export default post;
