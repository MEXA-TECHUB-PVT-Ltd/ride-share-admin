import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Badge,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Search } from "react-feather";
import {
  useGetVerificationRequestsQuery,
  useVerifyDriverMutation,
} from "../redux/dashboardApi";
import { verificationColumns } from "../utils/verificationRequest.utli";
import VerificationViewModal from "./components/modals/VerificationViewModal";
import VerifyDriver from "./components/modals/VerifiyDriver";

const VerificationRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tooltipOpenView, setTooltipOpenView] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedRequest, setSelectedRequest] = useState(null); // For storing the selected request
  const [modalOpen, setModalOpen] = useState(false); // For controlling the modal open/close
  const [modalVerifyOpen, setModalVerifyOpen] = useState(false); // For controlling the modal open/close
  console.log("Before API call:", { limit, page });
  const { data, isLoading, refetch } = useGetVerificationRequestsQuery({
    limit,
    page,
  });

  const [verifyDriver, { isLoading: isVerifying }] = useVerifyDriverMutation();

  // Extract pagination information from the API response
  const paginationInfo = data?.result?.paginationInfo;
  const totalItems = paginationInfo?.totalItems || 0;
  const totalPages = paginationInfo?.totalPages || 0;
  const currentPage = paginationInfo?.currentPage || 1;

  // Define pagination options for DataTable
  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  // Define handle page change function
  const handlePageChange = (page) => {
    setPage(page); // Assuming 'page' is now the direct number argument
  };

  // Filtering function based on search term
  const filteredData = data?.result?.response.filter((item) =>
    item.user_details.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle when a row is clicked
  const handleRowClick = (row) => {
    setSelectedRequest(row);
    toggleModal();
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleVerifyModal = () => {
    setModalVerifyOpen(!modalVerifyOpen);
  };

  const handleVerification = (row) => {
    setSelectedRequest(row);
    toggleVerifyModal();
  };

  // update the driver status
  const handleDriverVerification = async () => {
    console.log(selectedRequest?.user_id);
    if (selectedRequest) {
      const body = {
        user_id: selectedRequest?.user_id,
        is_verified_driver: !selectedRequest?.user_details?.is_verified_driver,
      };
      try {
        await verifyDriver(body).unwrap();
        refetch();
        toggleVerifyModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleViewVerificationModal = (row) => {
    handleRowClick(row);
  };
  const toggleTooltipView = () => setTooltipOpenView(!tooltipOpenView);

  const columns = verificationColumns(
    handleVerification,
    handleViewVerificationModal,
    toggleTooltipView,
    tooltipOpenView
  );

  return (
    <>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Row className="mb-2">
            <Col xs="4" md="8">
              <h1>Verification Requests</h1>
            </Col>
            <Col xs="8" md="4">
              <div
                className="mb-3 ms-1"
                style={{ borderRadius: "5px", width: "90%" }}
              >
                <InputGroup>
                  <Input
                    placeholder="Search by Email ...."
                    color="secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroupText>
                    <Search style={{ width: "15px" }} />
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>
          </Row>
          <div className="mb-2">
            <DataTable
              columns={columns}
              data={filteredData || []}
              pagination
              paginationServer
              paginationTotalRows={totalItems}
              paginationPerPage={limit}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationComponentOptions={paginationOptions}
              onChangePage={handlePageChange}
              highlightOnHover
              responsive
              onRowClicked={handleRowClick}
            />
          </div>
          <VerificationViewModal
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            selectedRequest={selectedRequest}
          />
          <VerifyDriver
            modalOpen={modalVerifyOpen}
            toggleModal={toggleVerifyModal}
            isLoading={isVerifying}
            confirmAction={handleDriverVerification}
            actionButton={
              selectedRequest?.user_details?.is_verified_driver
                ? "Unverified"
                : "Verified"
            }
          />
        </>
      )}
    </>
  );
};

export default VerificationRequests;
