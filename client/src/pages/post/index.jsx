import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePostHook } from "../../hooks/postHook";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import Axios from "axios";
import "./style.css";
import Button from "../../components/ui/Button";
import { authStore } from "../../store/auth";
// import Post from "../../components/Post";

const Post = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getPost, deletePost } = usePostHook();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  // const [removePost, setRemovePost] = useState({});
  const params = useParams();

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

  return (
    <>
      <div className="specificPost-container">
        <div className="title-container">
          <p>{post.title}</p>
        </div>
        <div className="description-container">
          <p>{post.description}</p>
        </div>
        <Button
          label="delete"
          onClick={async () => {
            if (isLoggedIn && userId === post.creatorId) {
              await deletePost(post._id).then((response) => {
                console.log("deleted");
              });
              navigate("/home");
            } else {
              alert("delete only your post");
            }

            // setRemovePost(response.data);
          }}></Button>
      </div>
    </>
  );
};

export default Post;
