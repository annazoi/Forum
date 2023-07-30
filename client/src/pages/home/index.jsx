import Button from "../../components/ui/Button";
import "./style.css";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { usePostHook } from "../../hooks/postHook";
import { useEffect, useState, CSSProperties } from "react";
import { postSchema } from "../../validation-schemas/post";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../components/ui/Textarea";
import { authStore } from "../../store/auth";
import Posts from "../../components/Posts";
import Search from "../../components/Search";
import { toast } from "react-toastify";
import Spinner from "../../components/ui/Spinner";

// const override = {
//   CSSProperties: {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   },
// };
const Home = () => {
  const { isLoggedIn } = authStore((store) => store);

  const { createPost, getPosts, loading, error } = usePostHook();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      // image: "",
    },
    resolver: yupResolver(postSchema),
  });

  const getAllPosts = async () => {
    try {
      const posts = await getPosts();
      if (posts) {
        setPosts(posts);
        setFilteredPosts(posts);
      }
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

  useEffect(() => {
    getAllPosts();
  }, []);

  const onSubmit = async (data) => {
    // console.log("data", data);
    try {
      if (isLoggedIn) {
        const res = await createPost(data);
        console.log("res", res);
        if (res.message === "OK") {
          toast.success("post created successfully");
          getAllPosts();
        }
      } else return alert("connect first");
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
          <Button
            style={{ marginTop: "1px" }}
            type="submit"
            label={loading && posts.length > 0 ? "Loading" : "Post"}
          />
        </form>
      </div>
      <Search onChange={handleFilterChange}></Search>
      {loading ? (
        <Spinner loading={loading}></Spinner>
      ) : error ? (
        <h1
          style={{
            margin: "0 auto",
            marginTop: "50px",
            marginBottom: "100px",
            textAlign: "center",
          }}>
          {error}
        </h1>
      ) : (
        <Posts posts={filteredPosts} to={"/posts"} />
      )}
      {/* {error && }
      {posts && <Posts posts={filteredPosts} to={"/posts"} />} */}
    </>
  );
};

export default Home;
