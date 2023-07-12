import Button from "../../components/ui/Button";
import "./style.css";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { usePostHook } from "../../hooks/postHook";
import { useEffect, useState } from "react";
import { postSchema } from "../../validation-schemas/post";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../components/ui/Textarea";
import { authStore } from "../../store/auth";
import Post from "../../components/Post";

const Home = () => {
  const { isLoggedIn, userId } = authStore((store) => store);

  const { createPost, getPosts, loading, id } = usePostHook();

  const [posts, setPosts] = useState([]);

  // const refresh = () => window.location.reload(true);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    const getAllPosts = async () => {
      const posts = await getPosts();
      setPosts(posts.data);
      // console.log(posts);
    };
    getAllPosts();
  }, []);

  const onSubmit = (data) => {
    if (isLoggedIn) {
      createPost(data);
      // console.log(data);
    } else return alert("connect first or error with id");
  };

  return (
    <div>
      {/* <Button onClick={getAlert} /> */}
      <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Start a forum with a new post</h1>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          register={register}
        />
        <Textarea
          name="description"
          type="text"
          placeholder="Share a Thought"
          register={register}
        />
        <Button
          type="submit"
          label={loading ? "Loading" : "Post"}
          // onClick={refresh}
        />
      </form>

      {/* <Post posts={posts} /> */}
      <Post posts={posts} to={"/posts"}></Post>
    </div>
  );
};

export default Home;
