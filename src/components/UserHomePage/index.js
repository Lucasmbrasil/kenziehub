import axios from "axios";
import { useEffect, useState } from "react";

const UserHomePage = () => {
  const [user, setUser] = useState({});

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    return JSON.parse(localToken);
  });
  const [techs, setTechs] = useState();
  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch((e) => console.log(e));
  }, [token]);

  useEffect(() => {
    axios.get(`https://kenziehub.me/users/${user.id}`);
  }, []);
  return (
    <>
      <h2>Bem-vindo {user.name} </h2>

      <div></div>
    </>
  );
};
export default UserHomePage;
