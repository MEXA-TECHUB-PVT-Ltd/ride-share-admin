import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useUpdateBlockStatusMutation } from "../../../../redux/dashboardApi";
import UpdateStatusM from "./UpdateStatusM";

const ViewContactUs = ({
  modalview,
  modalopenview,
  contactUsData,
  refetch,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const [modal, setModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleModal = () => setModal(!modal);

  const handleStatusChange = (status, row) => {
    setSelectedStatus(status);
    toggleModal();
  };

  const [updateBlockStatus, { isLoading: updatedLoading }] =
    useUpdateBlockStatusMutation();

  const handleUpdateStatus = async (status) => {
    try {
      await updateBlockStatus({
        id: contactUsData?.id,
        status: status,
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
      <Modal isOpen={modalview} toggle={modalopenview} centered>
        <ModalHeader toggle={modalopenview}>User Details</ModalHeader>

        <ModalBody className="mt-0 mb-1">
          <Row>
            <Col>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>
                      <strong>Name:</strong>
                    </td>
                    <td>{contactUsData?.full_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{contactUsData?.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Message:</strong>
                    </td>
                    <td>{contactUsData?.message || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>{contactUsData?.status || "N/A"}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret color="primary">
              Update Status
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleStatusChange("contacted")}>
                Contacted
              </DropdownItem>
              <DropdownItem onClick={() => handleStatusChange("dismissed")}>
                Dismissed
              </DropdownItem>
              <DropdownItem onClick={() => handleStatusChange("pending")}>
                Pending
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalBody>
      </Modal>
      <UpdateStatusM
        modalupdatestatus={modal}
        modalopenstatus={toggleModal}
        contactUsData={contactUsData}
        status={selectedStatus}
        refetch={refetch}
        modalopenview={modalopenview}
      />
    </div>
  );
};

export default ViewContactUs;
