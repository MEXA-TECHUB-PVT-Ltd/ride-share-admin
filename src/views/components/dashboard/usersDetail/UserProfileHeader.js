import React, { useState } from "react";
import { Row, Col, Button, Badge } from "reactstrap";
import { imgUrl } from "../../../../baseUrl";
import UpdateBlockStatus from "../../modals/users/UpdateBlockStatus";
import adimage from "@src/assets/images/pages/adimage.png";
import user_image from "/dummy_user.png";



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
            src={
              userData?.profile_uri
                ? `${imgUrl}${userData.profile_uri}`
                : user_image
            }
            alt={userData?.profile_uri || "User avatar"}
            className="img-fluid rounded-circle"
            style={{ width: "120px", height: "120px" }}
          />
          <h3 className="mt-3">
            Username: {userData?.first_name || "Not Provided"}
          </h3>
          {/* <Badge color={`${userData?.block_status ? "danger" : "primary"}`}>
            {userData?.block_status ? "Unblock User" : "Block User"}
          </Badge> */}
          {/* <Button
            color={!userData?.block_status ? "danger" : "success"}
            onClick={() => handleOpenUpdateStatusModal(userData)}
            className="mt-2"
          >
            {userData?.block_status ? "Unblock User" : "Block User"}
          </Button> */}
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
