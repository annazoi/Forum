import { useNavigate, useParams } from "react-router-dom";
import { usePostHook } from "../../hooks/postHook";
import { useState, useEffect, isValidElement } from "react";
import Post from "../../components/Posts/Post";
import "./style.css";
import Button from "../../components/ui/Button";
import { authStore } from "../../store/auth";

const CurrentPost = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const { getPost, deletePost } = usePostHook();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
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

  const createComment = async () => {
    if (isLoggedIn) {
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

        {isLoggedIn && userId === post.creatorId ? (
          <Button label="delete" onClick={removePost}></Button>
        ) : null}

        <Button label="Comment"></Button>
      </div>
    </>
  );
};

export default CurrentPost;
