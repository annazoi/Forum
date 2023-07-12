import { Link } from "react-router-dom";
import "./style.css";

const Linkpost = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index} className="post-container">
            <div className="post-content">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Linkpost;
