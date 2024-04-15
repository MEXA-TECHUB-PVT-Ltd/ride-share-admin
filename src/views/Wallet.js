import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Search } from "react-feather";
import {
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import moment from "moment";
import {
  useGetAdminTransactionsQuery,
  useGetAdminWalletQuery,
  useGetAllTransactionHistoryQuery,
} from "../redux/dashboardApi";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetAllTransactionHistoryQuery();
  const { data: wallet } = useGetAdminWalletQuery();
  const [modal, setModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  // Extract transactions from the response
  const transactions = data?.transactions || [];

  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const columns = [
    {
      name: "Total Amount",
      selector: (row) => `$${parseFloat(row.amount.total).toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Admin Amount",
      selector: (row) => `$${parseFloat(row.admintax).toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Button
          color="primary"
          onClick={() => {
            setCurrentTransaction(row);
            toggleModal();
          }}
        >
          Details
        </Button>
      ),
    },

    // Add or adjust columns as needed
  ];

  const customStyles = {
    table: {
      style: {
        marginBottom: "5px",
      },
    },
    headCells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Row>
            <Col xs="4" md="8">
              <h1>Transaction History</h1>
            </Col>
            <Col xs="8" md="4" className="text-right">
              <div className="d-flex justify-content-center">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      Wallet Balance: ${wallet?.transactions?.balance}
                    </CardTitle>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>

          <div className="mb-2">
            <DataTable
              columns={columns}
              data={transactions || []}
              pagination
              highlightOnHover
              responsive
              customStyles={customStyles}
              onChangePage={handlePageChange}
            />
          </div>
        </>
      )}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Transaction Details</ModalHeader>
        <ModalBody>
          <p>
            <strong>Total Amount:</strong> $
            {parseFloat(currentTransaction?.amount?.total)?.toFixed(2)}
          </p>
          <p>
            <strong>Admin Tax:</strong> $
            {parseFloat(currentTransaction?.admintax)?.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {currentTransaction?.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {moment(currentTransaction?.created_at)?.format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </p>
          <p>
            <strong>Description:</strong> {currentTransaction?.description}
          </p>
          <hr />
          <h5>Joiner Details</h5>
          <p>
            <strong>ID:</strong> {currentTransaction?.joiner_details?.id}
          </p>
          <p>
            <strong>First Name:</strong>{" "}
            {currentTransaction?.joiner_details?.first_name || "Not Provided"}
          </p>
          <p>
            <strong>Last Name:</strong>{" "}
            {currentTransaction?.joiner_details?.last_name || "Not Provided"}
          </p>
          <p>
            <strong>Email:</strong> {currentTransaction?.joiner_details?.email}
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={() =>
              navigate(
                `/user-details?user_id=${currentTransaction?.joiner_details?.id}`
              )
            }
          >
            See joiner details
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Wallet;
