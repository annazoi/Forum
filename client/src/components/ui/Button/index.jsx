import "./style.css";

const Button = ({ type = "button", label = "click", onClick }) => {
  return (
    <button onClick={onClick} className="button-container" type={type}>
      {label}
    </button>
  );
};

export default Button;
