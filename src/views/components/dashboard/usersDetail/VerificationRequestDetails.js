import React, { useState } from "react";
import {
  useGetVerificationRequestsByUserQuery,
  useVerifyDriverMutation,
} from "../../../../redux/dashboardApi";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import user_image from "/doc.png";
import VerificationViewModal from "../../modals/VerificationViewModal";
import VerifyDriver from "../../modals/VerifiyDriver";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const VerificationRequestDetails = ({ user_id, is_verified, refetch }) => {
  console.log(user_id);
  const { data, isLoading, isError, error } =
    useGetVerificationRequestsByUserQuery(user_id);
  const [verifyDriver, { isLoading: isVerifying }] = useVerifyDriverMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    toggleModal();
  };

  const handleDriverVerification = async () => {
    const body = {
      user_id: user_id,
      is_verified_driver: !is_verified,
    };
    try {
      await verifyDriver(body).unwrap();
      refetch();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    if (error.status === 404) {
      return <p>No Records Added By User.</p>;
    } else {
      return <p>We are proceeding the request</p>;
    }
  }
  return (
    <>
      {data?.result?.response?.length === 0 ? (
        <p>No Records</p>
      ) : (
        <Card className="p-2">
          <CardTitle tag="h5">License Details</CardTitle>
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
          {/* <Row className="mb-2">
          <Col md={4} className="fw-bold">
            Is Verified:
          </Col>
          <Col md={8}>
            {data?.result?.response?.[0]?.user_details?.is_verified_driver
              ? "Yes"
              : "No"}
          </Col>
        </Row> */}
          <Row className="mb-2">
            <Col md={6} className="fw-bold d-flex flex-column">
              Front Image:
              <img
                src={data?.result?.response?.[0]?.front_image || user_image}
                alt="Front Image"
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
                onError={(e) => {
                  e.target.src = user_image;
                }}
              />
            </Col>
            <Col md={6} className="fw-bold d-flex flex-column">
              Back Image:
              <img
                src={data?.result?.response?.[0]?.back_image || user_image}
                alt="Back Image"
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
                onError={(e) => {
                  e.target.src = user_image;
                }}
              />
            </Col>
          </Row>
          <Row className="mb-2"></Row>
          <p>Do you want to {is_verified ? "un verify" : "verify"} the user?</p>
          <Button
            className="button-color"
            type="submit"
            // disabled={}
            onClick={toggleModal}
            block
            style={{ backgroundColor: "#ffd300 !important" }}
          >
            {is_verified ? "UnVerify" : "Verify"}
          </Button>
        </Card>
      )}
      <Modal isOpen={modal} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody className="text-center">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "auto" }}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      {data && (
        <VerifyDriver
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          isLoading={isVerifying}
          confirmAction={handleDriverVerification}
          actionButton={is_verified ? "Unverified" : "Verified"}
        />
      )}
    </>
  );
};

export default VerificationRequestDetails;
