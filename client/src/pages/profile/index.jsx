import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthHook } from "../../hooks/authHook";
import Profile from "../../components/Profile";
const profile = () => {
  const [user, setUser] = useState({});
  const params = useParams();
  const { getUser } = useAuthHook();

  useEffect(() => {
    const getCreator = async () => {
      try {
        const res = await getUser(params.creatorId);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Could not get creator");
      }
    };
    getCreator();
  }, []);

  return (
    <>
      <div>
        <Profile user={user}></Profile>
      </div>
    </>
  );
};

export default profile;
