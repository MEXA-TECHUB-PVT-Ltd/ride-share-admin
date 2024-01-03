import React from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useUpdateBlockStatusMutation } from "../../../../redux/dashboardApi";

const UpdateBlockStatus = ({
  modalupdatestatus,
  modalopenstatus,
  userData,
}) => {
  const [updateBlockStatus, { isLoading: updatedLoading }] =
    useUpdateBlockStatusMutation();

  console.log(userData);
  const handeupdatestatus = async () => {
    try {
      await updateBlockStatus({
        id: userData?.id,
        block_status: !userData?.block_status,
      }).unwrap();
      modalopenstatus();
      toast.success(`Rider status Updated Successfully !`, {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={modalupdatestatus} toggle={modalopenstatus} centered>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to update the rider status?</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignContent: "right",
              gap: "10px",
            }}
          >
            <Button color="secondary" onClick={modalopenstatus}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={updatedLoading}
              onClick={handeupdatestatus}
            >
              Update
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateBlockStatus;
