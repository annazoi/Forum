import { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";

const Menu = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await Axios.get("http://localhost:3000/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {/* <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <h1>{post.title}</h1>
              </li>
            );
          })}
      </ul> */}
      <h1>Start a forum with a new post</h1>
      <form className="input">
        <input className="post-title" type="text" placeholder="title"></input>
        <textarea
          type="text"
          className="post-descriction"
          placeholder="share a thought"
          post="title"></textarea>
      </form>

      <input className="post-button" type="submit"></input>
    </div>
  );
};

export default Menu;
