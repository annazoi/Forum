import { Link } from "react-router-dom";
import "./style.css";
import { authStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isLoggedIn, userId } = authStore((store) => store);

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
      color: "purple",
    },
    {
      path: "/register",
      label: "Register",
      color: "purple",
    },
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
      // color: "purple",
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
      <p>UserId: {`${userId}`}</p>

      <div className="link-items">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              className="link-content"
              style={{ color: link.color ? link.color : "pink" }}
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
