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
  const { isLoggedIn, userId } = authStore((store) => store);

  const { logOut } = authStore((store) => store);

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

  const returnPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const links = [
    {
      path: "/login",
      label: "Login",
      color: "purple",
    },
    // {
    //   path: "/register",
    //   label: "Register",
    //   color: "purple",
    // },
    {
      path: "/home",
      label: "Home",
      color: "purple",
    },
    {
      path: "/profile",
      label: "Profile",
      color: "purple",
      // onPress: users,
    },
    {
      label: "Logout",
      onPress: logoutUser,
      color: "black",
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
      <p>LoggedIN: {`${isLoggedIn}`}</p>

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
                    ? "rgb(171, 68, 171) "
                    : "rgb(207, 171, 223)  ",
              }}
              to={link.path}
              onClick={() => onClick(link)}>
              {" "}
              {link.label}{" "}
            </Link>
          );
        })}
      </div>
      {/* <div className="search-container">
        <Search details={posts}></Search>
      </div> */}
    </div>
  );
};

export default NavBar;
