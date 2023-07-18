import "./style.css";
import { useEffect, useState } from "react";
import { useProfileHook } from "../../hooks/profileHook";
import Button from "../../components/ui/Button";
import { useImageHook } from "../../hooks/imageHook";
import { usePostHook } from "../../hooks/postHook";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const { getProfile } = useProfileHook();
//   const { getImage } = useImageHook();

//   useEffect(() => {
//     const getSpecificProfile = async () => {
//       try {
//         const response = await getProfile();
//         setUser(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getSpecificProfile();
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="user-content">
//           <h1>Username: {user.username}</h1>
//           <h1>name: {user.name}</h1>
//           <h1>surname: {user.surname}</h1>
//           <h1>Email: {user.email}</h1>
//         </div>
//         <Button label="Settings"></Button>
//       </div>
//     </>
//   );
// };

// export default Profile;

const Profile = () => {
  const { getPost } = usePostHook();

  useEffect(() => {
    const post = async () => {
      const response = await getPost();
      console.log(response.data);
    };
  }, []);
};

export default Profile;
