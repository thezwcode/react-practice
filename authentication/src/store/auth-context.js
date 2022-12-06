import React, { useCallback, useEffect, useState } from "react";
import { refreshAuthentication } from "../api/auth-api";
import CheckAuthenticationModal from "../components/Layout/CheckAuthenticationModal";
import useHttp from "../hooks/use-http";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let loginRefreshTimer;

const calculateRemainingTime = () => {
  const timeRemaining =
    +localStorage.getItem("expiryTime") - new Date().getTime();
  return timeRemaining;
};

export const AuthContextProvider = (props) => {
  const {
    sendRequest,
    status,
    error,
    data: response,
  } = useHttp(refreshAuthentication, true);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const isUserLoggedIn = !!token;
  const refreshAuthHandler = () => {
    sendRequest({ refreshToken: localStorage.getItem("refreshToken") });
    setShowSessionModal(false);
  };

  const stopAuthHandler = () => {
    logoutHandler();
    setShowSessionModal(false);
  };

  const checkContinueAuth = () => {
    setShowSessionModal(true);
  };

  const loginHandler = useCallback((token, expiresIn, refreshToken) => {
    const expiryTime = new Date(
      new Date().getTime() + +expiresIn * 1000
    ).getTime();
    localStorage.setItem("expiryTime", expiryTime);
    localStorage.setItem("refreshToken", refreshToken);
    console.log(calculateRemainingTime());
    console.log("showSessionModal: " + showSessionModal);
    loginRefreshTimer = setTimeout(
      checkContinueAuth, // refresh
      calculateRemainingTime()
    );
    console.log("showSessionModal: " + showSessionModal);

    localStorage.setItem("token", token);
    setToken(token);
  }, []);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    localStorage.removeItem("refreshToken");
    clearTimeout(loginRefreshTimer);
  };

  useEffect(() => {
    if (status === "completed" && !error) {
      loginHandler(
        response.id_token,
        response.expires_in,
        response.refresh_token
      );
    }
  }, [status, error, response, loginHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {showSessionModal && (
        <CheckAuthenticationModal
          message="Session ended. Would you continue your session?"
          onCancel={stopAuthHandler}
          onAccept={refreshAuthHandler}
        />
      )}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
