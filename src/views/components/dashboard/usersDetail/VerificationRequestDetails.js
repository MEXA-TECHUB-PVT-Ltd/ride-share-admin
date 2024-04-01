import React, { useState } from "react";
import { useGetVerificationRequestsByUserQuery } from "../../../../redux/dashboardApi";
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import user_image from "/dummy_user.png";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const VerificationRequestDetails = ({ user_id }) => {
  const { data, isLoading } = useGetVerificationRequestsByUserQuery(145);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => setModal(!modal);
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    toggleModal();
  };
  return (
    <>
      <Card className="p-2">
        <Row className="mb-2">
          <Col md={4} className="fw-bold">
            License_number:
          </Col>
          <Col md={8}>{data?.result?.response?.[0]?.license_number}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={4} className="fw-bold">
            Expiry Date:
          </Col>
          <Col md={8}>
            {formatDate(data?.result?.response?.[0]?.expiry_date)}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={4} className="fw-bold">
            License Expired:
          </Col>
          <Col md={8}>
            {data?.result?.response?.[0]?.is_expire ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={4} className="fw-bold">
            Email:
          </Col>
          <Col md={8}>{data?.result?.response?.[0]?.user_details?.email}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={4} className="fw-bold">
            Is Verified:
          </Col>
          <Col md={8}>
            {data?.result?.response?.[0]?.user_details?.is_verified_driver
              ? "Yes"
              : "No"}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={6} className="fw-bold d-flex flex-column">
            Front Image:
            <img
              src={data?.result?.response?.[0]?.front_image || user_image}
              alt={"Front Image"}
              style={{
                maxWidth: "200px",
                height: "auto",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleImageClick(
                  data?.result?.response?.[0]?.front_image || user_image
                )
              }
            />
          </Col>
          <Col md={6} className="fw-bold d-flex flex-column">
            Back Image:
            <img
              src={data?.result?.response?.[0]?.back_image || user_image}
              alt={"Back Image"}
              style={{
                maxWidth: "200px",
                height: "auto",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleImageClick(
                  data?.result?.response?.[0]?.back_image || user_image
                )
              }
            />
          </Col>
        </Row>
        <Row className="mb-2"></Row>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody className="text-center">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "auto" }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default VerificationRequestDetails;
