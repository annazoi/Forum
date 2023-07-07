import "./style.css";
const Input = ({
  name,
  type = "text",
  placeholder,
  value,
  props,
  register,
  error,
  className = "input-container",
}) => {
  return (
    <>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        {...props}
        {...register(name)}
      />
      <p className="error-container">{error}</p>
    </>
  );
};

export default Input;
