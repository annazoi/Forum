import "./style.css";

const Button = ({
  type = "button",
  label = "click",
  onClick,
  style,
  className,
  variant = "primary",
}) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className={`button-container button-${variant} ${className}`}
      type={type}>
      {label}
    </button>
  );
};

export default Button;
