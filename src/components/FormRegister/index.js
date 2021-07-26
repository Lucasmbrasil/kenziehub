import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import "./styles.css";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

const FormRegister = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
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

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <span>Preencha os dados abaixo:</span>
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
          color="secondary"
          endIcon={<Icon>send</Icon>}
          fullWidth
        >
          Registrar
        </Button>
      </div>
    </form>
  );
};

export default FormRegister;
