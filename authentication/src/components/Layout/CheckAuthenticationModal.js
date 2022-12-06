import Modal from "./Modal";

const CheckAuthenticationModal = (props) => {
  const { message, onCancel, onAccept } = props;
  return (
    <Modal>
      <p>{message}</p>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onAccept}>Yes</button>
      </div>
    </Modal>
  );
};

export default CheckAuthenticationModal;
