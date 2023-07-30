import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthHook } from "../../hooks/authHook";
import { usePostHook } from "../../hooks/postHook";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import { authStore } from "../../store/auth";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";

const profile = () => {
  const { userId } = authStore((store) => store);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const { getUser, error, loading } = useAuthHook();
  const { getPosts } = usePostHook();

  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const user = await getUser(params.creatorId);
        // console.log(user);
        if (user) {
          setUser(user);
        }
      } catch (err) {
        console.log(err, "Could not get User");
      }
    };
    const getAllPosts = async () => {
      const posts = await getPosts(params.creatorId);
      if (posts) {
        setPosts(posts);
      }
    };

    getSpecificUser();
    getAllPosts();
  }, []);

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
          <Profile user={user}></Profile>
          {/* {userId && ( */}
          <div>
            <p>
              Full Name: {user.name} {user.surname}
            </p>
            <p>Username: {user.username}</p>
            <p>email: {user.email}</p>
            <Button label="Edit your informations"></Button>
          </div>
          {/* )} */}
          <div style={{ marginTop: "40px" }}>
            <Posts posts={posts}></Posts>
          </div>
        </>
      )}
    </>
  );
};

export default profile;
