import classes from "./Modal.module.css";

import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  const portal = document.getElementById("modal-overlay");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </>
  );
};

export default Modal;
