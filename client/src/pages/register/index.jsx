import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerSchema } from "../../validation-schemas/auth";
import { useAuthHook } from "../../hooks/authHook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagePicker from "../../components/ui/ImagePicker";

const Register = () => {
  const { registerUser, loading, error, data } = useAuthHook();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (!data) return;
    if (data.token) return navigate("/login");
  }, [data]);

  const onSubmit = (data) => {
    try {
      registerUser(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleImage = (image) => {
    setValue("image", image);
  };

  // const handleTest = (e) => {
  //   console.log(e.target.name,e.target.vak=lue);
  // };

  return (
    <div className="register-form">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input placeholder="test" name="test" onChange={handleTest} />
          <input placeholder="test2" name="test2" onChange={handleTest} /> */}

        <Input
          name="name"
          type="text"
          placeholder="Name"
          register={register}
          error={errors.name?.message}
        />
        <Input
          name="surname"
          type="text"
          placeholder="Surname"
          register={register}
          error={errors.surname?.message}
        />

        <Input
          name="username"
          type="text"
          placeholder="Username"
          register={register}
          error={errors.username?.message}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <ImagePicker onChange={handleImage} />

        {error && <p>{error}</p>}

        <Button
          type="submit"
          label={loading ? "Loanding" : "Sign Up"}
          style={{ marginTop: "20px" }}
        />
      </form>
    </div>
  );
};

export default Register;
