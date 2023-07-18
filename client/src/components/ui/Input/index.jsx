import "./style.css";
const Input = ({
  name,
  type = "text",
  placeholder,
  value,
  props,
  register,
  error,
  className = "",
  onClick,
}) => {
  return (
    <>
      <input
        className={`input-container ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        {...props}
        {...register(name)}
        onClick={onClick}
      />
      {error && <p className="error-container">{error}</p>}
    </>
  );
};

export default Input;
