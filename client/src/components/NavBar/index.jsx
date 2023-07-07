import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
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
      path: "/menu",
      label: "Home",
      // color: "red"
    },
    {
      path: "/profile",
      label: "Profile",
      color: "orange",
    },
  ];

  return (
    <div>
      <ul className="link-items">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              style={{ color: link.color ? link.color : "yellow" }}
              to={link.path}>
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
