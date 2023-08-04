import "./style.css";
import { useEffect, useState } from "react";
import { usePostHook } from "../../hooks/postHook";
import { useUserHook } from "../../hooks/userHook";
import { useAuthHook } from "../../hooks/authHook";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import { authStore } from "../../store/auth";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation-schemas/auth";
import { useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import ImagePicker from "../../components/ui/ImagePicker";
import Modal from "../../components/Modal";

const profile = () => {
  const { isLoggedIn, userId } = authStore((store) => store);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const { getUser, error, loading } = useUserHook();
  const { registerUser } = useAuthHook();
  const { updateUser } = useUserHook();
  const { getPosts } = usePostHook();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const user = await getUser(params.creatorId);
        // console.log("user", user);
        if (user) {
          setUser(user);
          let userData = {
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            image: user.image,
          };
          console.log(userData);
          reset(userData);
        }
      } catch (err) {
        console.log(err, "Could not get User");
      }
    };
    const getAllPosts = async () => {
      const posts = await getPosts(params.creatorId);
      if (posts) {
        setPosts(posts);
      }
    };

    getSpecificUser();
    getAllPosts();
  }, []);

  // if (openModal) {
  //   document.body.classList.add("modal-container");
  // } else {
  //   document.body.classList.remove("modal-container");
  // }

  const handlModal = () => {
    setOpenModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateUser(params.creatorId, data);
      // console.log(updatedUser);
    } catch (err) {
      console.log("could not update user", err);
    }
  };

  const handleImage = (image) => {
    setValue("image", image);
  };

  return (
    <>
      <div className="profile-container">
        {loading ? (
          <Spinner></Spinner>
        ) : error ? (
          <h1
            style={{
              margin: "0 auto",
              marginTop: "150px",
              textAlign: "center",
            }}>
            {error}
          </h1>
        ) : (
          <Profile user={user} onClick={handlModal}></Profile>
        )}

        <Modal
          isOpen={openModal}
          handlClose={setOpenModal}
          children={
            <form
              className="edit-profile-form"
              onSubmit={handleSubmit(onSubmit)}>
              <Input
                // defaultValue={user.name}
                name="name"
                type="text"
                placeholder="Name"
                register={register}
                error={errors.name?.message}
              />
              <Input
                // defaultValue={user.surname}
                name="surname"
                type="text"
                placeholder="Surname"
                register={register}
                error={errors.surname?.message}
              />

              <Input
                // defaultValue={user.username}
                name="username"
                type="text"
                placeholder="Username"
                register={register}
                error={errors.username?.message}
              />

              <Input
                // defaultValue={user.email}
                name="email"
                type="email"
                placeholder="Email"
                register={register}
                error={errors.email?.message}
              />

              <Input
                // value={user.password}
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors.password?.message}
              />

              <Input
                // value={user.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                register={register}
                error={errors.confirmPassword?.message}
              />

              <ImagePicker
                value={getValues("image")}
                register={register}
                onChange={handleImage}
              />
              <div className="buttons-container">
                <Button
                  variant="danger"
                  label="Cancel"
                  onClick={() => {
                    {
                      setOpenModal(false);
                    }
                  }}></Button>
                <Button label="Save" type="submit" />
              </div>
            </form>
          }></Modal>
      </div>
      <div style={{ marginTop: "40px" }}>
        <Posts posts={posts}></Posts>
      </div>
    </>
  );
};

export default profile;
