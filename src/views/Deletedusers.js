import { useState } from "react";
import DataTable from "react-data-table-component";
import { Search, Eye, Trash2 } from "react-feather";
import {
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Tooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimage from "@src/assets/images/logo/avatar.jpg";
import adimage from "@src/assets/images/pages/adimage.png";
import {
  useDeleteUserMutation,
  useGetAllRecentlyDeletedQuery,
  useGetAllUsersQuery,
} from "../redux/dashboardApi";
import moment from "moment";
import { imgUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
import UpdateBlockStatus from "./components/modals/users/UpdateBlockStatus";
import user_image from "/dummy_user.png";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allUsers,
    refetch,
    isLoading,
    error,
  } = useGetAllRecentlyDeletedQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const navigate = useNavigate();

  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const hasData = error ? [] : allUsers;

  const [tooltipOpenview, setTooltipOpenview] = useState(false);

  const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  const [modaldelete, setModaldelete] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const modalopendelete = (row) => {
    setDeleteData(row);
    setModaldelete(!modaldelete);
  };

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = hasData?.result?.response?.filter((item) => {
    const filterName = item?.first_name || item?.email;
    return filterName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  const highlightMatch = (text, term) => {
    const lowerText = text?.toLowerCase();
    const lowerTerm = term?.toLowerCase();
    const startIndex = lowerText?.indexOf(lowerTerm);

    if (startIndex === -1) {
      return text;
    }

    const beforeMatch = text?.slice(0, startIndex);
    const match = text?.slice(startIndex, startIndex + term.length);
    const afterMatch = text?.slice(startIndex + term.length);
    return (
      <>
        {beforeMatch}
        <span style={{ backgroundColor: "#FF144D29" }}>{match}</span>
        {afterMatch}
      </>
    );
  };

  const columns = [
    {
      name: "Profile Image",
      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "10px",
            }}
          >
            <img
              src={
                row?.profile_uri ? `${imgUrl}${row.profile_uri}` : user_image
              }
              alt={row?.profile_uri || "User avatar"}
              style={{ borderRadius: "50px", width: "40px", height: "40px" }}
            />
          </div>
        </>
      ),
    },
    {
      name: "Name",
      cell: (row) => (
        <>{highlightMatch(row?.first_name, searchTerm) || "N/A"}</>
      ),
    },
    {
      name: "Email",
      cell: (row) => <>{highlightMatch(row?.email, searchTerm)}</>,
      sortable: true,
    },
    {
      name: "Deleted Date",
      selector: "deleted_at",
      sortable: true,
      cell: (row) =>
        row.deleted_at
          ? moment(row.deleted_at).format("YYYY-MM-DD HH:mm:ss")
          : "N/A",
    },
    {
      name: "Remaining",
      selector: "remaining_days_until_complete_deletion",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "10px",
            }}
          >
            <div>
              <Trash2
                style={{ cursor: "pointer", fontSize: "15px", color: "red" }}
                id="deleteTooltip"
                onClick={() => modalopendelete(row)}
                onMouseEnter={toggleTooltipDelete}
                onMouseLeave={toggleTooltipDelete}
              />
              <Tooltip
                placement="top"
                isOpen={tooltipOpenDelete}
                target="deleteTooltip"
                toggle={toggleTooltipDelete}
              >
                Delete
              </Tooltip>
            </div>
            <div>
              <Eye
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id="viewTooltip"
                onClick={() =>
                  navigate("/user-details", {
                    state: { user: row },
                  })
                }
                onMouseEnter={toggleTooltipview}
                onMouseLeave={toggleTooltipview}
              />
              <Tooltip
                placement="top"
                isOpen={tooltipOpenview}
                target="viewTooltip"
                toggle={toggleTooltipview}
              >
                View
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [modalview, setModalview] = useState(false);
  const [rowData, setRowData] = useState();
  const modalopenview = (row) => {
    setRowData(row);
    setModalview(!modalview);
  };

  const [status, setStatus] = useState(false);
  const [modalupdatestatus, setModalupdatestatus] = useState(false);
  const modalopenstatus = (row) => {
    setRowData(row);
    setModalupdatestatus(!modalupdatestatus);
  };

  const handleDeleteUser = () => {
    try {
      deleteUser({
        id: deleteData?.id,
      }).unwrap();
      refetch();
      setModaldelete(false);
      toast.success("User deleted Successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
              <h1>Users</h1>
            </Col>

            <Col xs="8" md="4" className="text-right">
              <div
                className="mb-2"
                style={{ borderRadius: "5px", width: "90%" }}
              >
                <InputGroup>
                  <Input
                    placeholder="Search ...."
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
              highlightOnHover
              responsive
              customStyles={customStyles}
              onChangePage={handlePageChange}
            />
          </div>
        </>
      )}

      <Modal isOpen={modaldelete} toggle={modalopendelete} centered>
        <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you really want to delete this user?</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignContent: "right",
              gap: "10px",
            }}
          >
            <Button color="secondary" onClick={() => setModaldelete(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={deleteLoading}
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <UpdateBlockStatus
        modalupdatestatus={modalupdatestatus}
        modalopenstatus={modalopenstatus}
        userData={rowData}
        refetch={refetch}
      />

      <ToastContainer />
    </>
  );
};

export default Users;
