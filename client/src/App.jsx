import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Post from "./pages/post";

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
