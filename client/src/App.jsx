import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/NavBar";
import Axios from "axios";
import Menu from "./pages/menu";

function App() {
  const [posts, setPosts] = useState("");

  const getPosts = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setPosts(response.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div>
        {posts}
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
