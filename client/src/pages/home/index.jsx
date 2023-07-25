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
import ImagePicker from "../../components/ui/ImagePicker";
import BeatLoader from "react-spinners/BeatLoader";

// const override = {
//   CSSProperties: {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   },
// };
const Home = () => {
  const { isLoggedIn, userId } = authStore((store) => store);

  const { createPost, getPosts, loading } = usePostHook();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(postSchema),
  });

  const getAllPosts = async () => {
    try {
      const posts = await getPosts();
      // console.log("allPosts", posts);
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
  };

  const setFileToBase = (file) => {
    makeBase64(file).then((base64) => {
      setValue("image", base64);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const makeBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
          <ImagePicker onChange={handleImage} />
          {/* <input name="image" type="file" onChange={handleImage} /> */}
          <Button
            style={{ marginTop: "1px" }}
            type="submit"
            label={loading && posts.length > 0 ? "Loading" : "Post"}
          />
        </form>
      </div>
      <Search onChange={handleFilterChange}></Search>
      {loading ? (
        <BeatLoader
          color="rgb(43, 80, 70)"
          loading={loading}
          // cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Posts posts={filteredPosts} to={"/posts"} />
      )}
    </>
  );
};

export default Home;
