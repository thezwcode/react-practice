import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const authenticatedHandler = (token, expiresIn, refreshToken) => {
    console.log("wait 10s");
    authCtx.login(token, "10", refreshToken);
    history.replace("/");
  };

  return <AuthForm onAuthentication={authenticatedHandler} />;
};

export default AuthPage;
