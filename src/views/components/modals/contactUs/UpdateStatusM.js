import React from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  useUpdateBlockStatusMutation,
  useUpdateCUStatusMutation,
} from "../../../../redux/dashboardApi";

const UpdateStatusM = ({
  modalupdatestatus,
  modalopenstatus,
  contactUsData,
  status,
  refetch,
  modalopenview,
}) => {
  const [updateCUStatus, { isLoading: updatedLoading }] =
    useUpdateCUStatusMutation();
  const handleUpdateStatus = async () => {
    try {
      await updateCUStatus({
        id: contactUsData?.id,
        status: status,
      }).unwrap();
      refetch();
      if (modalopenview) {
        modalopenview();
      }
      modalopenstatus();
      toast.success(`Status Updated Successfully !`, {
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
            <p>Do you want to update the status to: {status}?</p>
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
              onClick={handleUpdateStatus}
            >
              Update
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateStatusM;
