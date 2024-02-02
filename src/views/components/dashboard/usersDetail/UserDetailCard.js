import React from "react";
import { Card, CardBody, CardTitle, Row, Col, Badge } from "reactstrap";
import moment from "moment";

const UserDetailCard = ({ title, rowData }) => {
  const calculateAge = (dateOfBirth) => {
    if (dateOfBirth) {
      const today = moment();
      const birthDate = moment(dateOfBirth);
      return today.diff(birthDate, "years");
    }
    return "Not Provided";
  };
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <Row>
          <UserInfoSection
            title="Email"
            value={rowData?.email || "Not Provided"}
          />
          <UserInfoSection
            title="Phone"
            value={rowData?.phone || "Not Provided"}
          />
          <UserInfoSection
            title="DOB"
            value={
              rowData?.date_of_birth
                ? moment(rowData?.date_of_birth).format("DD-MM-YYYY")
                : "Not Provided"
            }
          />
          <UserInfoSection
            title="Gender"
            value={rowData?.gender || "Not Provided"}
          />
          <UserInfoSection
            title="Age"
            value={calculateAge(rowData?.date_of_birth)}
          />
          <UserInfoSection
            title="Block Status"
            value={
              rowData?.block_status ? (
                <Badge color="danger">Blocked</Badge>
              ) : (
                <Badge color="success">UnBlocked</Badge>
              )
            }
          />
          <UserInfoSection
            title="Account Status"
            value={
              rowData?.deactivated ? (
                <Badge color="warning">Deactivated</Badge>
              ) : (
                <Badge color="success">Active</Badge>
              )
            }
          />
          <UserInfoSection
            title="Insurance Status"
            value={
              rowData?.insurance_status ? (
                <Badge color="success">Yes</Badge>
              ) : (
                <Badge color="secondary">No</Badge>
              )
            }
          />
        </Row>
      </CardBody>
    </Card>
  );
};

const UserInfoSection = ({ title, value }) => (
  <Col xs="12" md="6" lg="4" className="mb-2">
    <div>
      <strong>{title}:</strong> {value || "Not Provided"}
    </div>
  </Col>
);

export default UserDetailCard;
