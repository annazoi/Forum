import Post from "../../Posts/Post";

const SearchList = ({ filteredPosts }) => {
  const filtered = filteredPosts.map((post, index) => (
    <Post key={index} post={post} />
  ));
  return <div>{filtered}</div>;
};

export default SearchList;
