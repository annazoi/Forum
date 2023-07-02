import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const Register = () => {
//   const datas = [
//     {
//       id: 0,
//       placeholder: "name *",
//       name: "nameText",
//     },
//     {
//       id: 1,
//       placeholder: "surname *",
//       name: "surnameText",
//     },
//     {
//       id: 2,
//       placeholder: "username *",
//       name: "usernameText",
//     },
//     {
//       id: 3,
//       placeholder: "email *",
//       name: "emailText",
//     },
//     {
//       id: 4,
//       placeholder: "password *",
//       name: "pswText",
//     },
//     {
//       id: 5,
//       placeholder: "confirm password *",
//       name: "pswText",
//     },
//   ];
//   return (
//     <div className="register-form">
//       <h1>Register</h1>
//       <form>
//         <div>
//           <ul className="input-container">
//             {datas.map((data, index) => {
//               return (
//                 <input
//                   key={index.id}
//                   type="value"
//                   placeholder={data.placeholder}
//                   data={data.name}
//                   required></input>
//               );
//             })}
//           </ul>
//           <input className="register-button" type="submit" />
//         </div>
//       </form>
//     </div>
//   );
// };

const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    // password: yup
    //   // .string()
    //   .number()
    //   .positive()
    //   .integer()
    //   .min(8)
    //   .max(12)
    //   .required(),
    password: yup.number().required("only numbers"),
    confirmPsw: yup
      .number()
      .oneOf([yup.ref("password"), null])
      .required("invalid password"),
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
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="forum-container">
          <input
            type="text"
            placeholder="name *"
            data="name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
          <input
            type="text"
            placeholder="surname *"
            data="surname"
            {...register("surname")}
          />
          <p>{errors.surname?.message}</p>
          <input
            type="text"
            placeholder="username *"
            data="username"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
          <input
            type="text"
            placeholder="email *"
            data="email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="password *"
            data="password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            placeholder="confirm password *"
            data="confirmPsw"
            {...register("confirmPsw")}
          />
          <p>{errors.confirmPsw?.message}</p>
          <input className="register-button" type="submit"></input>
        </ul>
      </form>
    </div>
  );
};

export default Register;
