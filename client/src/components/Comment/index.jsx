import { Link } from "react-router-dom";
import "./style.css";
import { formatDate } from "../../utils/date";
import Button from "../../components/ui/Button";
import { authStore } from "../../store/auth";

const Comments = ({ comments, onClick }) => {
  const { userId } = authStore((store) => store);
  return (
    <div className="comment-container">
      {/*comments && comments.map */}
      {comments?.map((comment, index) => {
        return (
          <div key={index} className="comment-content">
            {/* <link
              rel="stylesheet"
              href="https://icons.veryicon.com/png/o/miscellaneous/flat-wireframe-library/trash-bin-3.png"
            /> */}
            <div className="photo-comment-container">
              <img
                className="photo-comment-content"
                src={comment.creatorId.image}
                alt=""
              />
            </div>
            <div className="comment-description">
              <h1 style={{ display: "flex" }}>
                <Link to={`/profile/${comment.creatorId._id}`}>
                  {comment.creatorId.username}{" "}
                </Link>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "1px",
                    marginLeft: "20px",
                  }}>
                  {formatDate(comment.date)}
                </p>
              </h1>
              <p style={{ fontSize: "20px" }}>{comment.description}</p>
              {comment.creatorId && userId === comment.creatorId._id && (
                <Button
                  style={{ marginTop: "4px", margin: "auto" }}
                  label="delete"
                  onClick={onClick}></Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
