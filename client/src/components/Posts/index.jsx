import "./style.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";

const Posts = ({ posts }) => {
  return (
    <div className="post-container">
      {posts.map((post, index) => {
        return (
          <div key={index} className="post-content ">
            <Heading size="md">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </Heading>

            <Text py="2">{post.description}</Text>
            <Link to={`/post/${post._id}`}>Show More</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
