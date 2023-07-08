import { usePostHook } from "../../hooks/postHook";
import "./style.css";

const Post = () => {
  const posts = usePostHook((post) => {});

  return (
    <>
      <div>
        <p>posts</p>
        <p>{}</p>
      </div>
    </>
  );
};

export default Post;
