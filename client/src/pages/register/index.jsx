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
  const [image, setImage] = useState();
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

  const handleImage = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
    setImage(file);
  };

  const setFileToBase = (file) => {
    makeBase64(file).then((base64) => {
      setValue("image", base64);
      setImage(base64);
    });
  };

  useEffect(() => {
    if (!data) return;
    if (data.token) return navigate("/login");
  }, [data]);

  const makeBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = (data) => {
    try {
      registerUser(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="register-form">
      <h1 style={{ paddingTop: "20px" }}>Register</h1>

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
          <div className="image-register">
            <ImagePicker onChange={handleImage} />
            {image && (
              <img className="handled-image-register" src={image} alt="" />
            )}
          </div>

          {error && <p>{error}</p>}

          <Button type="submit" label={loading ? "Loanding" : "Sign Up"} />
        </div>
      </form>
    </div>
  );
};

export default Register;
