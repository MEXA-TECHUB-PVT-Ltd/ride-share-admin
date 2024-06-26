import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Search, Eye } from "react-feather";
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
  Badge,
  FormGroup,
  Label,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllUsersQuery } from "../redux/dashboardApi";
import moment from "moment";
import { imgUrl } from "../baseUrl";
import { useNavigate, Link } from "react-router-dom";
import UpdateBlockStatus from "./components/modals/users/UpdateBlockStatus";
import user_image from "/dummy_user.png";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOption, setFilterOption] = useState("all");
  const [isVerifiedDriver, setIsVerifiedDriver] = useState(false);
  // non-verified;
  const options =
    filterOption == "verified"
      ? true
      : filterOption == "non-verified"
      ? false
      : undefined;
  const {
    data: allUsers,
    refetch,
    isLoading,
    error,
  } = useGetAllUsersQuery({
    page: currentPage,
    is_verified_driver: options,
  });
  const navigate = useNavigate();

  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const hasData = error ? [] : allUsers;

  const [tooltipOpenview, setTooltipOpenview] = useState(false);

  const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setCurrentPage(1); // Reset currentPage to 1 when filter changes
  };

  const filteredData = useMemo(() => {
    if (!allUsers || error) return [];
    return allUsers?.result?.response?.filter((item) => {
      const filterName = item?.first_name || item?.email;
      return (
        filterName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
        (filterOption === "all" || item?.is_verified_driver)
      );
    });
  }, [allUsers, error, filterOption, searchTerm]);

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
              src={row?.profile_uri ? `${row.profile_uri}` : user_image}
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
        <>{highlightMatch(row?.first_name, searchTerm) || "Not Provided"}</>
      ),
    },
    {
      name: "Email",
      cell: (row) => <>{highlightMatch(row?.email, searchTerm)}</>,
      sortable: true,
    },
    {
      name: "Status",
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
            <Badge color={`${row?.block_status ? "danger" : "success"}`}>
              {row?.block_status ? "Blocked" : "UnBlock"}
            </Badge>
          </div>
        </>
      ),
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
            <Button
              color={`${row.block_status ? "success" : "danger"}`}
              onClick={() => modalopenstatus(row)}
              style={{ width: "120px" }}
            >
              {!row.block_status ? "Block" : "Unblock"}
            </Button>
            <Link to={`/user-details?user_id=${row?.id}`}>
              <Eye
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id="viewTooltip"
                onClick={() =>
                  navigate("/user-details", {
                    state: { user: row, deleted_users: false },
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
            </Link>
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

  const handeupdatestatus = () => {
    setTimeout(() => {
      toast.success("User status updated Successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
      setModalupdatestatus(false);
    }, 1000);
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

  // console.log(allUsers);

  return (
    <>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Row className="mb-2">
            <Col xs="4" md="8">
              <h1>Users</h1>
            </Col>
            <Col
              xs="8"
              md="4"
              className="d-flex align-items-center sm:flex-wrap"
            >
              <div>
                <FormGroup className="d-flex align-items-center gap-2">
                  <Label for="filterOption" style={{ fontSize: "1rem" }}>
                    Filter:
                  </Label>
                  <Input
                    type="select"
                    name="filterOption"
                    id="filterOption"
                    value={filterOption}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }} // Consider adjusting this width
                  >
                    <option value="all">Unverified Users</option>
                    <option value="verified">Verified Users</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="mb-3 ms-1" style={{ borderRadius: "5px" }}>
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

      <Modal isOpen={modalview} toggle={modalopenview} centered>
        <ModalHeader toggle={modalopenview}>User Details</ModalHeader>

        <ModalBody className="mt-0 mb-1">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src={`${imgUrl}${rowData?.profile_picture_details?.file_name}`}
                alt="..."
                style={{ borderRadius: "50px", width: "60px", height: "60px" }}
              />
            </div>
          </div>

          <Row>
            <Col xs="6" md="8">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  gap: "5px",
                  alignContent: "start",
                }}
              >
                <h5 className="text-left">Name</h5>
                <h5 className="text-left">Email</h5>
                <h5 className="text-left">Phone</h5>
                <h5 className="text-left">DOB</h5>
                <h5 className="text-left">Gender</h5>
                <h5 className="text-left">Age</h5>
                <h5 className="text-left">Block Status</h5>
                <h5 className="text-left">Account Status</h5>
                <h5 className="text-left">Insurance Status</h5>
              </div>
            </Col>

            <Col xs="6" md="4">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  flexDirection: "column",
                  gap: "5px",
                  alignContent: "right",
                }}
              >
                <h6 className="text-right">{rowData?.first_name || "N/A"}</h6>
                <h6 className="text-right">{rowData?.email}</h6>
                <h6 className="text-right">{rowData?.phone || "N/A"}</h6>
                <h6 className="text-right">
                  {moment(rowData?.date_of_birth).format("DD-MM-YYYY") || "N/A"}
                </h6>
                <h6 className="text-right">{rowData?.gender}</h6>
                <h6 className="text-right">{rowData?.age || "N/A"}</h6>
                <h6 className="text-right">
                  {rowData?.block_status ? "Blocked" : "UnBlocked" || "N/A"}
                </h6>
                <h6 className="text-right">
                  {rowData?.deactivated ? "Deactivated" : "Active" || "N/A"}
                </h6>
                <h6 className="text-right">
                  {rowData?.insurance_status ? "No" : "Yes"}
                </h6>
              </div>
            </Col>

            <Col xs="12" className="mt-1">
              <h2 className="text-left">About :</h2>
            </Col>

            <Col xs="12" className="">
              <p className="text-right">{rowData?.about}</p>
            </Col>

            <Col xs="12" className="mt-1">
              <h2 className="text-left">Bank Details</h2>
            </Col>
            {rowData?.bank_details?.map((detail, index) => (
              <Row key={index} className="mt-1">
                <p>#{++index}</p>
                <Col xs="6" md="8">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                      gap: "5px",
                      alignContent: "start",
                    }}
                  >
                    <h5 className="text-left">Cardholder Name</h5>
                    <h5 className="text-left">Card Number</h5>
                    <h5 className="text-left">Expiry Date</h5>
                    <h5 className="text-left">CVV</h5>
                  </div>
                </Col>

                <Col xs="6" md="4">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      flexDirection: "column",
                      gap: "5px",
                      alignContent: "right",
                    }}
                  >
                    <h6 className="text-right">
                      {detail?.cardholder_name || "N/A"}
                    </h6>
                    <h6 className="text-right">
                      {detail?.card_number || "N/A"}
                    </h6>
                    <h6 className="text-right">
                      {detail?.expiry_date
                        ? moment(detail?.expiry_date).format("DD-MM-YYYY")
                        : "N/A"}
                    </h6>
                    <h6 className="text-right">{detail?.cvv || "N/A"}</h6>
                  </div>
                </Col>
              </Row>
            ))}
          </Row>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalupdatestatus} toggle={modalopenstatus} centered>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>
              Do you want to {rowData?.block_status ? "Block" : "UnBlock"} the
              users status?
            </p>
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
            <Button
              color="secondary"
              onClick={() => setModalupdatestatus(false)}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={handeupdatestatus}>
              Update
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
