import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import user_image from "/dummy_user.png";

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

const VerificationViewModal = ({ modalOpen, toggleModal, selectedRequest }) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>
        Verification Request Details
      </ModalHeader>
      <ModalBody>
        {selectedRequest && (
          <div>
            <Row className="mb-2">
              <Col md={4} className="fw-bold">
                license_number:
              </Col>
              <Col md={8}>{selectedRequest?.license_number}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={4} className="fw-bold">
                Expiry Date:
              </Col>
              <Col md={8}>{formatDate(selectedRequest?.expiry_date)}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={4} className="fw-bold">
                License Expired:
              </Col>
              <Col md={8}>{selectedRequest?.is_expire ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={4} className="fw-bold">
                Email:
              </Col>
              <Col md={8}>{selectedRequest?.user_details?.email}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={4} className="fw-bold">
                Is Verified:
              </Col>
              <Col md={8}>
                {selectedRequest?.user_details?.is_verified_driver
                  ? "Yes"
                  : "No"}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={6} className="fw-bold d-flex flex-column">
                Front Image:
                <img
                  src={
                    selectedRequest?.front_image
                      ? selectedRequest?.front_image
                      : user_image
                  }
                  alt={"Front Image"}
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              </Col>
              <Col md={6} className="fw-bold d-flex flex-column">
                Back Image:
                <img
                  src={
                    selectedRequest?.back_image
                      ? selectedRequest?.back_image
                      : user_image
                  }
                  alt={"Front Image"}
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-2"></Row>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default VerificationViewModal;
