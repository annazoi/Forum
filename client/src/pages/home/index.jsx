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
import Posts from "../../components/Posts";

const Home = () => {
  const { isLoggedIn, userId } = authStore((store) => store);

  const { createPost, getPosts, loading } = usePostHook();

  const [posts, setPosts] = useState([]);

  // const refresh = () => window.location.reload(true);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(postSchema),
  });

  const getAllPosts = async () => {
    try {
      const posts = await getPosts();
      console.log("asd", posts);
      setPosts(posts.data);
    } catch (err) {
      return {
        message: "Could not get Posts",
        data: null,
      };
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (isLoggedIn) {
        await createPost(data);
        getAllPosts();
        // console.log(data);
      } else return alert("connect first or error with id");
    } catch (err) {
      console.log("Could not create post");
    }
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
      <Posts posts={posts} to={"/posts"}></Posts>
    </div>
  );
};

export default Home;
