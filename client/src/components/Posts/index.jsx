import "./style.css";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <div className="post-container">
      {posts.map((post, index) => {
        return (
          <Link key={index} className="post-content" to={`/post/${post._id}`}>
            {post.title}
            <h1 style={{ fontSize: "15px" }}> Your Story</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
