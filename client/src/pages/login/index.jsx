import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Input from "./components/Input";

// const Login = () => {
//   const datas = [
//     {
//       id: 0,
//       placeholder: "username *",
//       name: "username",
//       type: "text",
//     },
//     {
//       id: 1,
//       placeholder: "password *",
//       name: "password",
//       type: "password",
//     },
//   ];

//   return (
//     <div className="login-form">
//       <h1>Sign In</h1>
//       <form>
//         <div>
//           <ul className="input-container">
//             {datas.map((data, index) => {
//               return (
//                 <>
//                   <input
//                     key={index.id}
//                     type={data.type}
//                     placeholder={data.placeholder}
//                     data={data.dataText}
//                   />
//                 </>
//               );
//             })}
//           </ul>
//           <input className="login-button  " type="submit" />
//         </div>
//       </form>
//     </div>
//   );
// };

const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),

    // password: yup.number().positive().integer().min(8).max(12).required(),
    password: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ul className="input-container">
            <input
              type="text"
              placeholder="username *"
              data="username"
              {...register("username")}
            />
            <p>{errors.username?.message}</p>
            <input
              type="password"
              placeholder="password *"
              data="password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </ul>
          <input className="login-button  " type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
