import React, { useState } from "react";
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
  CardTitle,
  Button, // Import Button from reactstrap
} from "reactstrap";
import moment from "moment";
import {
  useDeleteRideMutation,
  useGetAllRidesByUserQuery,
} from "../../../../redux/dashboardApi";
import DeleteRideModal from "../../modals/dashboard/usersDeatils/DeleteRideModal";
import SmallSpinner from "../../loaders/SmallSpinner";

const RideDetailsTable = ({ user_id, is_verified }) => {
  const { data, isLoading, refetch } = useGetAllRidesByUserQuery({
    user_id: user_id,
  });
  const [deleteRide, { isLoading: isDeleteLoading }] = useDeleteRideMutation();

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);

  const pageSize = 50; // Number of items per page

  const rides = data && data?.result?.response;
  const pageCount = Math.ceil(rides?.length / pageSize);

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  // Function to handle delete (Placeholder for actual implementation)
  const handleDelete = (rideId) => {
    console.log("Deleting ride with ID:", rideId);
    // Implement deletion logic here
  };

  const currentData =
    data && rides?.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDeleteClick = (rideId) => {
    setSelectedRideId(rideId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteRide({ id: selectedRideId }).unwrap();
      // Optionally, show a success message to the user
      refetch();
      console.log("Ride deleted successfully");
    } catch (error) {
      // Handle or display the error message
      console.error("Failed to delete the ride:", error);
    } finally {
      // Close the modal and potentially refresh the ride list
      toggleModal();
    }
  };

  return (
    <>
      {isLoading ? (
        <SmallSpinner />
      ) : !data ? (
        <p>No rides available</p>
      ) : (
        <Card className="mb-3">
          <CardBody>
            <CardTitle tag="h5">Ride Details</CardTitle>
            <div style={{ overflowX: "auto" }}>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pickup Location</th>
                    <th>Drop Off Location</th>
                    <th>Ride Date</th>
                    <th>Price per seat</th>
                    <th>Pickup Time</th>
                    <th>Ride Status</th>
                    {!is_verified && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    currentData?.map((ride, index) => (
                      <tr key={ride?.id}>
                        <th scope="row">
                          {currentPage * pageSize + index + 1}
                        </th>
                        <td>{ride?.pickup_address}</td>
                        <td>{ride?.drop_off_address}</td>
                        <td>{moment(ride?.ride_date).format("YYYY-MM-DD")}</td>
                        <td>{ride?.price_per_seat || "Not Provided"}</td>
                        <td>
                          {ride?.time_to_pickup
                            ? moment(ride.time_to_pickup, "HH:mm:ss").format(
                                "h:mm A"
                              )
                            : "Not Provided"}
                        </td>
                        <td>{ride?.ride_status || "Pending"}</td>
                        {!is_verified && (
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDeleteClick(ride.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        )}
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
      )}
      <DeleteRideModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        confirmAction={confirmDelete}
        modalTitle="Confirm Delete"
        modalBody="Are you sure you want to delete this ride?"
        isLoading={isDeleteLoading}
      />
    </>
  );
};

export default RideDetailsTable;
