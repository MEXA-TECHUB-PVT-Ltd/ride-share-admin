import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
  ModalFooter,
} from "reactstrap";
import SmallSpinner from "../loaders/SmallSpinner";

// Define a mapping for key to label transformation
const keyToLabel = {
  license_number: "License Number",
  expiry_date: "Expiry Date",
  is_expire: "Is Expired",
  user_details: "User Details",
  // Add more mappings as necessary
};

// Helper function to format dates
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Renders the key-value rows, transforming keys using the keyToLabel map
const renderKeyValueRows = (data) => {
  if (!data || typeof data !== "object") return null;
  return Object.entries(data).map(([key, value]) => {
    if (
      key === "id" ||
      key === "user_id" ||
      key === "back_image" ||
      key === "front_image" ||
      key === "created_at" ||
      key === "updated_at"
    )
      return null;
    let displayValue = value;
    if (typeof value === "boolean") {
      displayValue = value ? "Yes" : "No";
    } else if (typeof value === "object") {
      displayValue = renderNestedObject(value);
    } else if (key.includes("date")) {
      displayValue = formatDate(value);
    }
    const label = keyToLabel[key] || key.replace(/_/g, " ");

    return (
      <Row key={key} className="mb-2">
        <Col md={4} className="fw-bold">
          {label}:
        </Col>
        <Col md={8}>{displayValue}</Col>
      </Row>
    );
  });
};

const renderNestedObject = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value], index) => {
    if (key !== "id" && value !== null && value !== undefined) {
      const label = keyToLabel[key] || key.replace(/_/g, " ");
      acc.push(
        <div key={index}>
          <Row>
            <Col md={4} className="fw-bold">
              {label}:
            </Col>
            <Col md={8}>
              {typeof value === "object"
                ? renderKeyValueRows(value)
                : String(value)}
            </Col>
          </Row>
        </div>
      );
    }
    return acc;
  }, []);
};

const renderImageField = (label, url) => (
  <Row key={label} className="mb-2">
    <Col md={4} className="fw-bold">
      {label}:
    </Col>
    <Col md={8}>
      <img
        src={url}
        alt={label}
        style={{ maxWidth: "200px", height: "auto" }}
      />
    </Col>
  </Row>
);

const VerifyDriver = ({
  modalOpen,
  toggleModal,
  isLoading,
  confirmAction,
  actionButton,
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>Verify Driver</ModalHeader>
      <ModalBody>Are you sure you want to verify this driver?</ModalBody>
      <ModalFooter>
        <Button
          color={actionButton === "Verified" ? "success" : "danger"}
          onClick={confirmAction}
        >
          {isLoading ? <SmallSpinner /> : actionButton}
        </Button>{" "}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyDriver;
