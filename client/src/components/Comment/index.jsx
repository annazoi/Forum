import { Link } from "react-router-dom";
import "./style.css";
import { formatDate } from "../../utils/date";

const Comments = ({ comments }) => {
  return (
    <div className="comment-container">
      {/*comments && comments.map */}
      {comments?.map((comment, index) => {
        return (
          <div key={index} className="comment-content">
            <h1 style={{ marginTop: "6px" }}>
              <Link>{comment.creatorId.username}</Link>
              <p style={{ fontSize: "15px", marginTop: "1px" }}>
                {formatDate(comment.date)}
              </p>
            </h1>
            <p style={{ fontSize: "20px" }}>{comment.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
