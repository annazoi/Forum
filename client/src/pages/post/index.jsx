import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, isValidElement, useRef } from "react";
import { usePostHook } from "../../hooks/postHook";
import { authStore } from "../../store/auth";
import { commentSchema } from "../../validation-schemas/comment";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import Comments from "../../components/Comment";
import Post from "../../components/Posts/Post";
import Spinner from "../../components/ui/Spinner";
import { ToastContainer, toast } from "react-toastify";

const post = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getPost, deletePost, createComment, error, loading } = usePostHook();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: "",
    },
    resolver: yupResolver(commentSchema),
  });

  const specificPost = async () => {
    try {
      const post = await getPost(params.postId);
      if (post) {
        setPost(post);
        setComments(post.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

  const notify = () => {
    toast("succesfully comment");
  };

  const onSubmit = async (data) => {
    try {
      if (isLoggedIn) {
        const res = await createComment(data, post._id);
        setComment(data);
        // console.log(data);
        specificPost();
      } else {
        alert("Connect first");
      }
    } catch (err) {
      console.log("Could not create comment");
    }
  };

  const removedComment = () => {};

  return (
    <>
      {loading ? (
        <Spinner loading={loading}></Spinner>
      ) : error ? (
        <h1
          style={{ margin: "0 auto", marginTop: "150px", textAlign: "center" }}>
          {error}
        </h1>
      ) : (
        <>
          {" "}
          <Post post={post} onClick={removePost}></Post>
          <div className="comments-container">
            {!isLoggedIn && (
              <>
                <h1>
                  Please connect first to comment{" "}
                  <Link to="/login">
                    <b>Login</b>
                  </Link>
                </h1>
              </>
            )}
            <Comments comments={post.comments} />
          </div>
        </>
      )}
      {!error && (
        <div className="create-post-form " style={{ marginTop: "40px" }}>
          <form className="input-comment" onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              name="description"
              placeholder="Create a comment for this post"
              register={register}
              className="texrarea-comment"
            />
            <Button
              style={{ marginTop: "1px" }}
              type="submit"
              label={loading ? "Loading " : "Comment"}
              onClick={onSubmit}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default post;
