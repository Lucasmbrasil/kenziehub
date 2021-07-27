import FormLogin from "../../components/FormLogin";

const Login = ({ authentication, setAuthentication }) => {
  return (
    <>
      <FormLogin
        authentication={authentication}
        setAuthentication={setAuthentication}
      />
    </>
  );
};
export default Login;
