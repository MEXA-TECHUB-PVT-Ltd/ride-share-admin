import React from "react";
import { Card, CardBody, CardTitle, Row, Col, Badge } from "reactstrap";
import moment from "moment";

const UserDetailCard = ({ title, rowData }) => (
  <Card className="mb-3">
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      <Row>
        <UserInfoSection title="Email" value={rowData?.email} />
        <UserInfoSection title="Phone" value={rowData?.phone} />
        <UserInfoSection
          title="DOB"
          value={moment(rowData?.date_of_birth).format("DD-MM-YYYY")}
        />
        <UserInfoSection title="Gender" value={rowData?.gender} />
        <UserInfoSection title="Age" value={rowData?.age} />
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

const UserInfoSection = ({ title, value }) => (
  <Col xs="12" md="6" lg="4" className="mb-2">
    <div>
      <strong>{title}:</strong> {value || "N/A"}
    </div>
  </Col>
);

export default UserDetailCard;
