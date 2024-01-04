import { useState } from "react";
import DataTable from "react-data-table-component";
import { Search, Eye, Edit } from "react-feather";
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
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimage from "@src/assets/images/logo/avatar.jpg";
import adimage from "@src/assets/images/pages/adimage.png";
import {
  useGetAllByInsQuery,
  useUpdateInsStatusMutation,
} from "../redux/dashboardApi";

const NonInsuranceUsers = () => {
  const { data: allUsers, refetch, isLoading, error } = useGetAllByInsQuery();

  const [tooltipOpenview, setTooltipOpenview] = useState(false);

  const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

  const hasData = error ? [] : allUsers;

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = hasData?.result?.response?.filter((item) => {
    const filterName = item?.first_name || item?.email;
    return filterName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const [updateInsStatus, { isLoading: updatedLoading }] =
    useUpdateInsStatusMutation();
  const handleStatusChange = async (status, row) => {
    try {
      await updateInsStatus({
        user_id: row?.id,
        status: status,
      }).unwrap();
      refetch();
      toast.success(`Status Updated Successfully !`, {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
    } catch (error) {
      console.log(error);
    }
  };

  const highlightMatch = (text, term) => {
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const startIndex = lowerText.indexOf(lowerTerm);

    if (startIndex === -1) {
      return text;
    }

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + term.length);
    const afterMatch = text.slice(startIndex + term.length);
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
      name: "id",
      cell: (row, index) => <>{++index}</>,
    },
    {
      name: "Name",
      cell: (row) => (
        <>{highlightMatch(row?.email || row?.full_name, searchTerm)}</>
      ),
    },
    { name: "Email", selector: "email", sortable: true },
    {
      name: "Status",
      selector: "connected_insurances_user",
      sortable: true,
    },
    {
      name: "Insurance",
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
            <Badge color="warning">
              {row.insurance_status ? "Insurance" : "No Insurance"}
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
            <div>
              <Dropdown
                isOpen={openDropdownId === row?.id}
                toggle={() => toggleDropdown(row?.id)}
              >
                <DropdownToggle color="success" caret>
                  Update Status
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleStatusChange("contacted", row)}
                    disabled={updatedLoading}
                  >
                    Contacted
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [modalview, setModalview] = useState(false);
  const modalopenview = () => {
    setModalview(!modalview);
  };

  const [status, setStatus] = useState(false);
  const [modalupdatestatus, setModalupdatestatus] = useState(false);
  const modalopenstatus = (row) => {
    setStatus(row.id);
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

  return (
    <>
      <Row>
        <Col xs="4" md="8">
          <h1>Non Insurance Users</h1>
        </Col>

        <Col xs="8" md="4" className="text-right">
          <div className="mb-2" style={{ borderRadius: "5px", width: "90%" }}>
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
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
        />
      </div>

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
                src={adimage}
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
                <h5 className="text-left">Date Of Birth</h5>
                <h5 className="text-left">Gender</h5>
                <h5 className="text-left">Age</h5>
                <h5 className="text-left">Status</h5>
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
                <h6 className="text-right">John</h6>
                <h6 className="text-right">john@gmail.com</h6>
                <h6 className="text-right">20 Jan,2000</h6>
                <h6 className="text-right">Male</h6>
                <h6 className="text-right">30</h6>
                <h6 className="text-right">Active</h6>
              </div>
            </Col>

            <Col xs="12" className="mt-1">
              <h2 className="text-left">Description :</h2>
            </Col>

            <Col xs="12" className="">
              <h6 className="text-right">
                Insurance costs can be a significant factor. He might delay or
                avoid getting insurance due to financial constraints or
                perceiving insurance expenses as excessive.
              </h6>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalupdatestatus} toggle={modalopenstatus} centered>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to update the users status?</p>
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

      <ToastContainer />
    </>
  );
};

export default NonInsuranceUsers;
