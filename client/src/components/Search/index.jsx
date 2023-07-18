import { useState } from "react";
import "./style.css";
import SearchList from "./SearchList";

const Search = ({ posts }) => {
  const [searchField, setSearchField] = useState("");

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchField.toLowerCase()) ||
      post.description.toLowerCase().includes(searchField.toLowerCase())
    );
  });
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <section>
      <div>
        <input
          type="search"
          placeholder="Search for posts"
          onChange={handleChange}
        />
      </div>
      <SearchList filteredPosts={filteredPosts} />
    </section>
  );
};

export default Search;
