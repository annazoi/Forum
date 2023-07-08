import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginSchema } from "../../validation-schemas/auth";
import { useAuthHook } from "../../hooks/authHook";
import { useEffect } from "react";
import { authStore } from "../../store/auth";

const Login = () => {
  const { logIn } = authStore((store) => store);

  const { loginUser, loading, error, data } = useAuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (!data) return;
    if (data.token) {
      logIn({
        token: data.token,
      });
      alert("Successfully Connection");
    }
    console.log(data);
  }, [data]);

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <div className="login-form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <Input
            name="email"
            type="text"
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
          {error && <p className="error-container">{error}</p>}

          <Button type="submit" label={loading ? "Loading" : "Sign In"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
