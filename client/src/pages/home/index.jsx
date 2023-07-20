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
import Search from "../../components/Search";
import { toast } from "react-toastify";

const Home = () => {
  const { isLoggedIn, userId } = authStore((store) => store);

  const { createPost, getPosts, loading } = usePostHook();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(postSchema),
  });

  const getAllPosts = async () => {
    try {
      const posts = await getPosts();
      console.log("asd", posts);
      setPosts(posts.data);
      setFilteredPosts(posts.data);
    } catch (err) {
      return {
        message: "Could not get Posts",
        data: null,
      };
    }
  };

  const handleFilterChange = (event) => {
    setFilteredPosts(
      posts.filter((post) => {
        return post.title.includes(event.target.value);
      })
    );
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      if (isLoggedIn) {
        await createPost(data);
        if (data.success === true) {
          toast.success("post created successfully");
        }
        getAllPosts();
        // console.log(data);
      } else return alert("connect first or error with id");
    } catch (err) {
      console.log("Could not create post");
    }
  };
  return (
    <>
      <div className="forum-container">
        <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ margin: "20px" }}>Start a forum with a new post</h1>
          <Input
            name="title"
            type="text"
            placeholder="Title"
            className="title-post"
            register={register}
          />
          <Textarea
            name="description"
            type="text"
            placeholder="Share a Thought"
            register={register}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <Button
            style={{ marginTop: "1px" }}
            type="submit"
            label={loading && posts.length > 0 ? "Loading" : "Post"}
          />
        </form>
      </div>
      <Search onChange={handleFilterChange}></Search>
      <Posts posts={filteredPosts} to={"/posts"} />
    </>
  );
};

export default Home;
