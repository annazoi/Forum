import { Link } from "react-router-dom";
import "./style.css";

const Comments = ({ comments }) => {
  return (
    <div className="comment-container">
      {/*comments && comments.map */}
      {comments?.map((comment, index) => {
        return (
          <div key={index} className="line">
            <Link>{comment.creatorId.username}:</Link>
            <p style={{ fontSize: "20px" }}>{comment.description}</p>
            <p>{comment.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
