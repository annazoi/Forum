import "./style.css";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <div className="post-container">
      {posts.map((post, index) => {
        return (
          <div key={index} className="post-content">
            <div className="post-info">
              <p style={{ fontSize: "20px", lineHeight: "30px" }}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </p>
              <h1 style={{ fontSize: "15px" }}> Your Story</h1>
            </div>

            {/* <Link to={`/post/${post._id}`}>Show More</Link> */}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
