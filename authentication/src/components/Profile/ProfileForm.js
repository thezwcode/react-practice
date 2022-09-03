import { useContext, useRef } from "react";
import { changePassword } from "../../api/auth-api";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = (props) => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const { sendRequest, status, error } = useHttp(changePassword, true);
  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("form submitted!");
    sendRequest({
      token: authCtx.token,
      newPassword: newPasswordRef.current.value,
    });
  };
  const isSuccessfulChange = status === "completed" && !error;
  return (
    <>
      {isSuccessfulChange && (
        <p style={{ color: "purple" }}>Password was changed successfully</p>
      )}
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
