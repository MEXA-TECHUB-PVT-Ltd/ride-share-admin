import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import moment from "moment";

const VehiclesDetailsSection = ({ vehiclesDetails }) => {
  const [openCollapse, setOpenCollapse] = useState({});

  const toggleCollapse = (vehicleIndex) => {
    setOpenCollapse((prevState) => ({
      ...prevState,
      [vehicleIndex]: !prevState[vehicleIndex],
    }));
  };

  if (!Array.isArray(vehiclesDetails) || vehiclesDetails.length === 0) {
    return <p>No vehicles details available.</p>;
  }

  return (
    <Card className="mb-3 vehicle-details-card">
      <CardBody>
        <CardTitle tag="h5">Vehicles</CardTitle>
        {vehiclesDetails?.map((vehicle, index) => (
          <div key={index} className="vehicle-section">
            <Button
              color="info"
              onClick={() => toggleCollapse(index)}
              className="w-100 text-left vehicle-toggle-button mb-1"
            >
              Vehicle #{index + 1}
            </Button>
            <Collapse isOpen={!!openCollapse[index]}>
              <VehicleDetail vehicle={vehicle} />
            </Collapse>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

const VehicleDetail = ({ vehicle }) => (
  <Card className="mb-3">
    <CardBody>
      <CardTitle tag="h5">Vehicle Details</CardTitle>
      <ListGroup flush>
        <ListGroupItem>
          <Row>
            <Col xs="12" md="6">
              <strong>Brand:</strong>{" "}
              {vehicle.vehicle_brand?.Make_Name ?? "N/A"}
            </Col>
            <Col xs="12" md="6">
              <strong>Model:</strong>{" "}
              {vehicle.vehicle_model?.Model_Name ?? "N/A"}
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col xs="12" md="6">
              <strong>License Plate:</strong>{" "}
              {vehicle.license_plate_no ?? "N/A"}
            </Col>
            <Col xs="12" md="6">
              <strong>Color:</strong> {vehicle.vehicle_color?.name ?? "N/A"}
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col xs="12">
              <strong>License Expiry Date:</strong>
              {vehicle.license_expiry_date
                ? moment(vehicle.license_expiry_date).format("DD-MM-YYYY")
                : "N/A"}
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

export default VehiclesDetailsSection;
