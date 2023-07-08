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
      />
      {error && <p className="error-container">{error}</p>}
    </>
  );
};

export default Input;
