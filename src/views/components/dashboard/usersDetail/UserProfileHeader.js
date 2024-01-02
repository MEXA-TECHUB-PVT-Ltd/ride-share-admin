import React from "react";
import { Row, Col, Button } from "reactstrap";
import { imgUrl } from "../../../../baseUrl";

const UserProfileHeader = ({ userData, onBlockToggle }) => {
  return (
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
            //   onClick={() => onBlockToggle()}
            className="mt-2"
          >
            {userData?.block_status ? "Unblock User" : "Block User"}
          </Button>
      </Col>
    </Row>
  );
};

export default UserProfileHeader;
