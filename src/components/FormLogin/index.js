import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import App from "../../";
const FormLogin = ({ authentication, setAuthentication }) => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);

        setAuthentication(true);
        history.push("/techs");
      })
      .catch((e) => console.log(e));
  };
  const handleLogout = () => {
    localStorage.clear();
    setAuthentication(false);
  };
  console.log(authentication);
  console.log(user);
  return (
    <>
      <img src="" />
      <form onSubmit={handleSubmit(handleForm)}>
        <h2>Faça seu login:</h2>
        <div>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Senha"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("password")}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <div className="button">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
        </div>
        <p>
          Não tem uma conta ainda? <Link to="/register">Registre-se</Link>
        </p>
      </form>
    </>
  );
};

export default FormLogin;
