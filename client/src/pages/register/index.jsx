import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import Input from "../../components/ui/Input";
import { API_URL } from "../../constants";
import Button from "../../components/ui/Button";
import { registerSchema } from "../../validation-schemas/auth";
import { useAuthHook } from "../../hooks/authHook";
import { useEffect } from "react";

const Register = () => {
  const { registerUser, loading, error, data } = useAuthHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (!data) return;
    if (data.token) return alert("Successfully Creating");
  }, [data]);

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
  };

  return (
    <div className="register-form">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
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
          {error && <p>{error}</p>}
          <Button type="submit" label={loading ? "Loanding" : "Sign Up"} />
        </div>
      </form>
    </div>
  );
};

export default Register;
