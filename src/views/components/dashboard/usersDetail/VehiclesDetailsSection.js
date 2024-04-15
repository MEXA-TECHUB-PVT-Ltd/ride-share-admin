import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import moment from "moment";
import user_image from "/doc.png";

const VehiclesDetailsSection = ({ vehiclesDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(vehiclesDetails?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedVehicles = vehiclesDetails?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!Array.isArray(vehiclesDetails) || vehiclesDetails?.length === 0) {
    return <p>No vehicles details available.</p>;
  }

  return (
    <Card className="mb-3 vehicle-details-card">
      <CardBody>
        <CardTitle tag="h5">Vehicles</CardTitle>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Model</th>
              <th>License Plate</th>
              <th>Color</th>
              <th>License Expiry Date</th>
              <th>Insurance Image</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVehicles.map((vehicle, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th scope="row">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </th>
                  <td>{vehicle.vehicle_brand?.Make_Name ?? "N/A"}</td>
                  <td>{vehicle.vehicle_model?.Model_Name ?? "N/A"}</td>
                  <td>{vehicle.license_plate_no ?? "N/A"}</td>
                  <td>{vehicle.vehicle_color?.name ?? "N/A"}</td>
                  <td>
                    {vehicle.license_expiry_date
                      ? moment(vehicle.license_expiry_date).format("DD-MM-YYYY")
                      : "N/A"}
                  </td>
                  <td>
                    <a
                      href={vehicle?.insurance_image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={vehicle?.insurance_image || user_image}
                        alt=""
                        style={{ width: "100px", height: "auto" }}
                        onError={(e) => {
                          e.target.src = user_image;
                        }}
                      />
                    </a>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <Pagination aria-label="Vehicle Pagination">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i} active={i + 1 === currentPage}>
              <PaginationLink onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              next
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>
      </CardBody>
    </Card>
  );
};

export default VehiclesDetailsSection;
