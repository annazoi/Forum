import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthHook } from "../../hooks/authHook";
import { usePostHook } from "../../hooks/postHook";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import { authStore } from "../../store/auth";

const profile = () => {
  const { userId } = authStore((store) => store);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const { getUser } = useAuthHook();
  const { getPosts } = usePostHook();

  useEffect(() => {
    const getCreator = async () => {
      try {
        const res = await getUser(params.creatorId);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Could not get creator");
      }
    };
    const returnPosts = async () => {
      const posts = await getPosts(params.creatorId);
      setPosts(posts.data);
    };

    getCreator();
    returnPosts();
  }, []);

  return (
    <>
      <Profile user={user}></Profile>

      <Posts posts={posts}></Posts>
    </>
  );
};

export default profile;
