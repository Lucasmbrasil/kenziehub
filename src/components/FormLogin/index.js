import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const FormLogin = () => {
  const history = useHistory();
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
  const [loginError, setLoginError] = useState(false);
  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        history.push("/techs");
      })
      .catch((e) => setLoginError(true));
  };
  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLoginError(false);
  };

  return (
    <>
      <Snackbar open={loginError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          E-mail ou senha inválidos!
        </Alert>
      </Snackbar>
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
