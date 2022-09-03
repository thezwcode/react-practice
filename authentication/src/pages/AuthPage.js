import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const authenticatedHandler = (token, expiresIn) => {
    authCtx.login(token);
    history.replace("/");
    const expiryTime = new Date() + expiresIn;
    setTimeout(()=>authCtx.logout(), expiresIn);
  };

  return <AuthForm onAuthentication={authenticatedHandler} />;
};

export default AuthPage;
