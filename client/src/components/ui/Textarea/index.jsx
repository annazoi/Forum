import "./style.css";

const Textarea = ({
  name,
  type,
  placeholder,
  value,
  props,
  register,
  error,
  className = "post-description",
}) => {
  return (
    <textarea
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      {...props}
      {...register(name)}></textarea>
  );
};

export default Textarea;
