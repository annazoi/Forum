import { Link } from "react-router-dom";
import "./style.css";
import { authStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isLoggedIn } = authStore((store) => store);

  const { logOut } = authStore((store) => store);

  const navigate = useNavigate();

  const logoutUser = () => {
    logOut();
    navigate("/login");
  };

  const links = [
    {
      path: "/login",
      label: "Login",
      color: "red",
    },
    {
      path: "/register",
      label: "Register",
      color: "green",
    },
    {
      path: "/home",
      label: "Home",

      // color: "red"
    },
    {
      path: "/profile",
      label: "Profile",
      color: "orange",
    },
    {
      path: "/posts",
      label: "Posts",
      color: "purple",
    },
    {
      label: "Logout",
      onPress: logoutUser,
      color: "grey",
    },
  ];

  const onClick = (link) => {
    if (link.onPress) {
      link.onPress();
    }
  };

  return (
    <div className="nav-bar-container">
      <p>LoggedIN: {`${isLoggedIn}`}</p>
      <ul className="link-items">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              style={{ color: link.color ? link.color : "yellow" }}
              to={link.path}
              onClick={() => onClick(link)}>
              {" "}
              {link.label}{" "}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default NavBar;
