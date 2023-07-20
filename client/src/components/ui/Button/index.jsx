import "./style.css";

const Button = ({ type = "button", label = "click", onClick, style }) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className="button-container"
      type={type}>
      {label}
    </button>
  );
};

export default Button;
