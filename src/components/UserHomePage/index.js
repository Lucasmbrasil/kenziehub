import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import "./styles.css";

const UserHomePage = () => {
  const history = useHistory();

  const [user, setUser] = useState({});

  const token = window.localStorage.getItem("token");

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [techs, setTechs] = useState();
  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch((e) => history.push("/"));
  }, [token, history]);

  useEffect(() => {
    if (user.id !== undefined) {
      axios
        .get(`https://kenziehub.me/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setTechs(response.data.techs))
        .catch((e) => console.log(e));
    }
  }, [token, user.id]);

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/users/techs", data, headers)
      .then((response) => {
        axios
          .get(`https://kenziehub.me/users/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => setTechs(response.data.techs));
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = (tech) => {
    axios
      .delete(`https://kenziehub.me/users/techs/${tech.id}`, headers)
      .then((response) => {
        axios
          .get(`https://kenziehub.me/users/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => setTechs(response.data.techs));
      })
      .catch((e) => console.log(e));
  };
  const handleBack = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <div className="container">
      <h2>Tecnologias aprendidas:</h2>
      <div className="cardContainer">
        {techs &&
          techs.map((tech, index) => (
            <div className="card" key={tech.id}>
              <p id="status">Tecnologia: {tech.title}</p>
              <p>Status: {tech.status}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDelete(tech)}
              >
                DELETAR
              </Button>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit(handleForm)} className="formAddTech">
        <h3>Adicionar nova tecnologia:</h3>
        <div>
          <TextField
            fullWidth
            label="Tecnologia"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Nível"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          />
        </div>

        <div className="button">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Adicionar Tecnologia
          </Button>
        </div>
      </form>
      <Button
        onClick={handleBack}
        variant="contained"
        color="primary"
        size="small"
      >
        Voltar
      </Button>
    </div>
  );
};
export default UserHomePage;
