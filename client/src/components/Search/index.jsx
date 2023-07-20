import { useState } from "react";
import "./style.css";
import Input from "../../components/ui/Input";

const Search = ({ onChange }) => {
  return (
    <div className="search-container">
      <input
        className="search-content"
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
