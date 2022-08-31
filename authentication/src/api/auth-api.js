import { useContext } from "react";

const API_KEY = "AIzaSyCvb_YJ363vUMA6JvkpHJ9-KjX2I-pixbE";
export const SIGNUP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const SIGNIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

let authFailedMessage = "Authentication failed!";

export const accountSignUp = async (requestData) => {
  const { emailData, passwordData, getToken } = requestData;
  const response = await fetch(SIGNUP_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      email: emailData,
      password: passwordData,
      returnSecureToken: getToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    alert("Connection failed!");
    return;
  }
  console.log(data);

  if (data.error && data.error.message) {
    if (
      data.error.code === 400 &&
      data.error.message.startsWith("WEAK_PASSWORD" || "INVALID_PASSWORD")
    ) {
      authFailedMessage = "Enter proper password";
    }
    alert(authFailedMessage);
    //throw new Error(data.error.message);
  }

  return data;
};

export const accountSignIn = async (
  emailData,
  passwordData,
  getToken = true
) => {
  const response = await fetch(SIGNIN_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      email: emailData,
      password: passwordData,
      returnSecureToken: getToken,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    alert("Sign up failed!");
    return;
  }
  console.log(data);

  if (data.error && data.error.message) {
    if (data.error.code === 400 && data.error.message === "EMAIL_NOT_FOUND") {
      authFailedMessage = "Invalid email";
    }
    alert(authFailedMessage);
    //throw new Error(data.error.message);
  }

  return data;
};
