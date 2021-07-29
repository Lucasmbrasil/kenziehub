import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import "./styles.css";
import Icon from "@material-ui/core/Icon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const FormRegister = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    // .isValid(error, "email ja cadastrado"),
    name: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
    bio: yup.string().required("Campo obrigatório"),
    contact: yup.string().required("Campo obrigatório"),
    course_module: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [emailError, setEmailError] = useState(false);
  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        history.push("/");
      })
      .catch((e) => setEmailError(true));
  };
  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEmailError(false);
  };
  const handleBack = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <>
      <div className="backButton">
        <ArrowBackIcon id="backButton" size="small" onClick={handleBack} />
      </div>
      <form onSubmit={handleSubmit(handleForm)} className="formRegister">
        <h2>Preencha os dados abaixo:</h2>

        <Snackbar
          open={emailError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            E-mail já cadastrado!
          </Alert>
        </Snackbar>
        <div>
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
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

        <div>
          <TextField
            fullWidth
            label="Bio"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Contato"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("contact")}
            error={!!errors.contact}
            helperText={errors.contact?.message}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Módulo do curso"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("course_module")}
            error={!!errors.course_module}
            helperText={errors.course_module?.message}
          />
        </div>

        <div className="button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>done</Icon>}
            fullWidth
          >
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
