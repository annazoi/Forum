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
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ImagePicker from "../../components/ui/ImagePicker";
import { commentSchema } from "../../validation-schemas/comment";

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
      <h1 style={{ paddingTop: "20px" }}>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
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
          <div className="image-register">
            <ImagePicker onChange={handleImage} />
          </div>

          {error && <p>{error}</p>}

          <Button type="submit" label={loading ? "Loanding" : "Sign Up"} />
        </div>
      </form>
    </div>
  );
};

export default Register;
