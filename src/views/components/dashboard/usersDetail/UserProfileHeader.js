import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { imgUrl } from "../../../../baseUrl";
import UpdateBlockStatus from "../../modals/users/UpdateBlockStatus";

const UserProfileHeader = ({ userData }) => {
  const [modalupdatestatus, setModalupdatestatus] = useState(false);
  const [statusData, setStatusData] = useState();

  const handleOpenUpdateStatusModal = (row) => {
    setStatusData(row);
    setModalupdatestatus(!modalupdatestatus);
  };
  return (
    <>
      <Row className="justify-content-center mb-4">
        <Col md="6" lg="4" className="text-center">
          <img
            src={`${imgUrl}${userData?.profile_picture_details?.file_name}`}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: "120px", height: "120px" }}
          />
          <h3 className="mt-3">{userData?.first_name}</h3>
          <Button
            color={!userData?.block_status ? "danger" : "success"}
            onClick={() => handleOpenUpdateStatusModal(userData)}
            className="mt-2"
          >
            {userData?.block_status ? "Unblock User" : "Block User"}
          </Button>
        </Col>
      </Row>
      <UpdateBlockStatus
        modalupdatestatus={modalupdatestatus}
        modalopenstatus={handleOpenUpdateStatusModal}
        userData={userData}
      />
    </>
  );
};

export default UserProfileHeader;