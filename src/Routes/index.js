import { Route, Switch } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Techs from "../Pages/Techs";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/techs">
          <Techs />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  );
};
export default Routes;
