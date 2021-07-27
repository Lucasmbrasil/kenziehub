import { Route, Switch } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Techs from "../Pages/Techs";

const Routes = ({ authentication, setAuthentication }) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login
            authentication={authentication}
            setAuthentication={setAuthentication}
          />
        </Route>
        <Route exact path="/techs">
          <Techs setAuthentication={setAuthentication} />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  );
};
export default Routes;
