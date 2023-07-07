import Button from "../../components/ui/Button";
import { API_URL } from "../../constants";
import "./style.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { usePostHook } from "../../hooks/postHook";
import { useEffect } from "react";
import { postSchema } from "../../validation-schemas/post";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../components/ui/Textarea";

const Menu = () => {
  const { postUser, data, loading } = usePostHook();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    if (!data) return;
    if (data) return alert("Successfully Uploading");
    console.log(data);
  }, [data]);

  const onSubmit = (data) => {
    postUser(data);
    console.log(data);
  };

  // const getAlert = () => {
  //   alert("ee");
  // };

  return (
    <div>
      <h1>Start a forum with a new post</h1>
      {/* <Button onClick={getAlert} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ul className="input">
            <Input
              className="post-title"
              name="title"
              type="text"
              placeholder="Title"
              register={register}
            />
            <Textarea
              className="post-descriction"
              name="description"
              type="text"
              placeholder="Share a Thought"
              register={register}
            />
            {/* <Input
              className="post-descriction"
              name="description"
              type="text"
              placeholder="Share a Thought"
              register={register}
            /> */}
            <Button type="submit" label={loading ? "Loading" : "Post"} />
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Menu;
