import { Link } from "react-router-dom";
import "./style.css";
import { authStore } from "../../store/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import Search from "../Search";
import { usePostHook } from "../../hooks/postHook";

const NavBar = () => {
  const { logOut, logIn, isLoggedIn, userId } = authStore((store) => store);

  const [isSelected, setSelected] = useState("");

  const { pathname } = useLocation();

  const { getPosts } = usePostHook();
  const [posts, setPosts] = useState({});

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({});

  const logoutUser = () => {
    logOut();
    navigate("/login");
  };

  // const logInUser = () => {
  //   logIn();
  // };

  const returnPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const links = [
    {
      path: "/login",
      label: "Login",
      color: "white",
      // onPress:
    },
    // {
    //   path: "/register",
    //   label: "Register",
    //   color: "purple",
    // },
    {
      path: "/home",
      label: "Home",
      color: "white",
    },
    {
      path: "/profile",
      label: "Profile",
      color: "white",
      // onPress: users,
    },
    {
      label: "Logout",
      onPress: logoutUser,
      color: "white",
    },
  ];

  const onClick = (link) => {
    setSelected(link.label);
    if (link.onPress) {
      link.onPress();
    }
  };

  useEffect(() => {
    links.map((link) => {
      if (link.path === pathname) {
        setSelected(link.label);
      }
    });
  }, []);

  return (
    <div className="nav-bar-container">
      <div className="link-items">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              className="link-content"
              // style={{ color: link.color ? link.color : "black" }}
              style={{
                backgroundColor:
                  isSelected === link.label
                    ? "rgb(93, 112, 108) "
                    : " rgba(134, 112, 144, 0.5)",
              }}
              to={link.path}
              onClick={() => onClick(link)}>
              {" "}
              {link.label}{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
