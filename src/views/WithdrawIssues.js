import DataTable from "react-data-table-component";
import {
  Row,
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useGetWithdrawErrorsQuery } from "../redux/dashboardApi";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WithdrawIssues = () => {
  const { data, isLoading } = useGetWithdrawErrorsQuery();
  const [modal, setModal] = useState(false);
  const [currentIssue, setCurrentIssue] = useState({});
  const navigate = useNavigate()

  const toggleModal = () => setModal(!modal); 

  const columns = [
    {
      name: "User Email",
      cell: (row, index) => <>{row?.user_info?.email}</>,
    },
    { name: "Withdrawal Email", selector: "email", sortable: true },
    { name: "Requested withdrawal amount", selector: "amount", sortable: true },
    {
      name: "Error",
      cell: (row, index) => <>{row?.errors?.name}</>,
      sortable: true,
    },
    {
      name: "Error Date",
      cell: (row, index) => <>{moment(row?.created_at).format("DD/MM/YYYY")}</>,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Button
          color="primary"
          onClick={() => {
            setCurrentIssue(row);
            toggleModal();
          }}
        >
          Details
        </Button>
      ),
    },
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
            <Col xs="10" md="11">
              <h1>Withdrawal Error Log</h1>
            </Col>
          </Row>

          <DataTable
            columns={columns}
            data={data?.result}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
          />
        </>
      )}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Issue Details</ModalHeader>
        <ModalBody>
          <p>
            <strong>Username:</strong>{" "}
            {currentIssue?.user_info?.first_name
              ? `${currentIssue.user_info.first_name} ${currentIssue.user_info.last_name}`
              : "NOT PROVIDED"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {` ${currentIssue.user_info?.email || "NOT PROVIDED"}`}
          </p>
          <p>
            <strong>Withdrawal Email:</strong> {currentIssue.email}
          </p>
          <p>
            <strong>Requested Amount:</strong> $
            {parseFloat(currentIssue.amount).toFixed(2)}
          </p>
          <p>
            <strong>Issue Name:</strong> {currentIssue.errors?.name}
          </p>
          <p>
            <strong>Issue Detail:</strong> {currentIssue.errors?.details}
          </p>
          <p>
            <strong>Issue Message:</strong> {currentIssue.errors?.message}
          </p>
          <p>
            <strong>Issue Date:</strong>{" "}
            {moment(currentIssue.created_at).format("DD/MM/YYYY")}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() =>
              navigate(`/user-details?user_id=${currentIssue?.user_id}`)
            }
          >
            See User
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WithdrawIssues;
