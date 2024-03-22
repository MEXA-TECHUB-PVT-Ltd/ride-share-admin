import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SmallSpinner from "../../../loaders/SmallSpinner";

const DeleteRideModal = ({
  isOpen,
  toggle,
  confirmAction,
  modalTitle,
  modalBody,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>{modalBody}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmAction}>
          {isLoading ? <SmallSpinner /> : "Delete"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteRideModal;
