const API_KEY = "AIzaSyCvb_YJ363vUMA6JvkpHJ9-KjX2I-pixbE";
const SIGNUP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const CHANGE_PASSWORD_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const REFRESH_TOKEN_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

//let authFailedMessage = "Authentication failed!";

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

  if (data.error && data.error.message) {
    throw new Error(data.error.message);
  }

  return data;
};

export const accountSignIn = async (requestData) => {
  const { emailData, passwordData, getToken } = requestData;

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

  if (data.error && data.error.message) {
    throw new Error(data.error.message);
  }
  console.log(data);
  return data;
};

export const changePassword = async (requestData) => {
  const { token, newPassword } = requestData;
  const response = await fetch(CHANGE_PASSWORD_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
      password: newPassword,
      returnSecureToken: true,
    }),
    headers: { "Content-Type": "application.json" },
  });

  const data = await response.json();

  if (data.error && data.error.message) {
    throw new Error(data.error.message);
  }
  return null;
};

export const refreshAuthentication = async (requestData) => {
  const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${requestData.refreshToken}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const data = await response.json();

  if (data.error && data.error.message) {
    throw new Error(data.error.message);
  }

  return data;
};
