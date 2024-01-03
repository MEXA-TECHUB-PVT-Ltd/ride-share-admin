import React, { useState } from "react";
import { Table, Pagination, PaginationItem, PaginationLink, Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";

const RideDetailsTable = ({ rideDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of items per page
    if (!Array.isArray(rideDetails) || rideDetails?.length === 0) {
      return <p>No ride details available.</p>;
    }
  const pageCount = Math.ceil(rideDetails?.length / pageSize);

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const currentData = rideDetails?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Ride Details</CardTitle>
        <div style={{ overflowX: 'auto' }}> 
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pickup Location</th>
                <th>Drop Off Location</th>
                <th>Ride Date</th>
                <th>Status</th>
                <th>Caution Details</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((ride, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{ride?.pickup_location}</td>
                  <td>{ride?.drop_off_location}</td>
                  <td>{moment(ride?.ride_date).format("YYYY-MM-DD")}</td>
                  <td>{ride?.ride_status || "N/A"}</td>
                  <td>
                    {ride?.caution_details.map((caution, idx) =>
                      caution?.name ? (
                        <div key={idx}>{caution?.name}</div>
                      ) : null
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
          <Pagination>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => handlePageClick(e, currentPage - 1)}
                previous
              />
            </PaginationItem>
            {[...Array(pageCount)]?.map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={(e) => handlePageClick(e, i)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= pageCount - 1}>
              <PaginationLink
                onClick={(e) => handlePageClick(e, currentPage + 1)}
                next
              />
            </PaginationItem>
          </Pagination>
      </CardBody>
    </Card>
  );
};

export default RideDetailsTable;

