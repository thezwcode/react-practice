import { useState, useRef, useContext } from "react";
import { accountSignIn, accountSignUp } from "../../api/auth-api";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    error,
    data: response,
  } = useHttp(isLogin ? accountSignIn : accountSignUp, true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    sendRequest({
      emailData: enteredEmail,
      passwordData: enteredPassword,
      getToken: true,
    });
  };

  if (status === "completed" && !error) {
    authCtx.login(response.idToken);
  }

  return (
    <section className={classes.auth}>
      {error && <div className="centered">{error}</div>}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
