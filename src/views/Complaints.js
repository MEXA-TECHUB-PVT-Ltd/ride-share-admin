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
  Badge,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeleteComplaintsMutation,
  useGetAllComplaintsQuery,
  useUpdateBlockStatusMutation,
} from "../redux/dashboardApi";

const Complaints = () => {
  const [tooltipOpenview, setTooltipOpenview] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const {
    data: complaintData,
    refetch,
    isLoading,
    error,
  } = useGetAllComplaintsQuery();
  const [updateBlockStatus, { isLoading: updatedLoading }] =
    useUpdateBlockStatusMutation();
  const [deleteComplaint, { isLoading: deleteLoading }] =
    useDeleteComplaintsMutation();

  const [rowData, setRowData] = useState();

  
  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = complaintData?.result?.response?.filter((item) => {
    const riderName =
      item?.rider_details?.first_name || item?.rider_details?.email;
    return riderName?.toLowerCase().includes(searchTerm?.toLowerCase());
  });
  
  const hasData = error ? [] : filteredData
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
      name: "Rider Name",
      selector: "rider_details.first_name",
      sortable: true,
    },
    {
      name: "Rider Email",
      selector: "rider_details.email",
      sortable: true,
    },
    { name: "Complain", selector: "reason", sortable: true },

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
              <Eye
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id="viewTooltip"
                onClick={() => modalopenview(row)}
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
          </div>
        </>
      ),
    },
  ];

  const [modalview, setModalview] = useState(false);
  const modalopenview = (row) => {
    setRowData(row);
    setModalview(!modalview);
  };

  const [statusData, setStatusData] = useState();
  const [modalupdatestatus, setModalupdatestatus] = useState(false);
  const modalopenstatus = (row) => {
    setStatusData(row);
    setModalupdatestatus(!modalupdatestatus);
  };
  const handeupdatestatus = async () => {
    try {
      await updateBlockStatus({
        id: statusData?.rider_details?.id,
        block_status: !statusData.rider_details?.block_status,
      }).unwrap();
      refetch();
      setModalupdatestatus(false);
      setModalview(false);
      toast.success(`Rider status Updated Successfully !`, {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [modaldelete, setModaldelete] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const modalopendelete = (row) => {
    setDeleteData(row);
    setModaldelete(!modaldelete);
  };

  const [modaldeleteAll, setModaldeleteAll] = useState(false);
  const modalopendeleteAll = (row) => {
    setModaldeleteAll(!modaldeleteAll);
  };

  const handleDelete = async () => {
    try {
      await deleteComplaint({
        id: deleteData?.id,
      }).unwrap();
      refetch();
      setModaldelete(false);
      toast.success("Deleted Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const row of selectedRows) {
        await deleteComplaint({ id: row.id }).unwrap();
      }
      refetch();
      setIsDataEmpty(false);
      if (error) {
        setIsDataEmpty(true);
      }
      setSelectedRows([]);
      setModaldeleteAll(false);
      toast.success("Selected rows deleted successfully", {
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
              <h1>Complaints</h1>
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
            {selectedRows.length > 0 && (
              <Col xs="8" md="4" className="mb-2">
                <Button color="danger" onClick={modalopendeleteAll}>
                  Delete Selected
                </Button>
              </Col>
            )}
          </Row>

          <div className="mb-2">
            <DataTable
              columns={columns}
              data={hasData || []}
              pagination
              highlightOnHover
              responsive
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              selectableRowsHighlight
            />
          </div>
        </>
      )}

      <Modal
        isOpen={modalview}
        toggle={modalopenview}
        centered
        style={{ maxWidth: "800px" }}
      >
        <ModalHeader toggle={modalopenview}>Complain Details</ModalHeader>

        <ModalBody
          className="mt-0 mb-1"
          style={{ maxWidth: "800px", overflow: "auto" }}
        >
          <Row>
            <Col xs="6" md="8" className="mb-1">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  gap: "5px",
                  alignContent: "start",
                  flexWrap: "wrap",
                }}
              >
                <h5 className="text-left">User Name</h5>
                <h5 className="text-left">User Email</h5>
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
                  flexWrap: "wrap",
                }}
              >
                <h6 className="text-right">
                  {rowData?.user_details?.first_name || "NULL"}
                </h6>
                <h6 className="text-right">{rowData?.user_details?.email}</h6>
              </div>
            </Col>

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
                <h5 className="text-left">Rider Name</h5>
                <h5 className="text-left">Rider Email</h5>
                <h5 className="text-left">Rider Block Status</h5>
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
                  flexWrap: "wrap",
                }}
              >
                <h6 className="text-right">
                  {rowData?.rider_details?.first_name || "NULL"}
                </h6>
                <h6 className="text-right">{rowData?.rider_details?.email}</h6>
                <Badge
                  color={`${
                    rowData?.rider_details?.block_status ? "danger" : "success"
                  }`}
                >
                  {rowData?.rider_details?.block_status ? "Blocked" : "UnBlock"}
                </Badge>
              </div>
            </Col>

            <Col xs="12" className="mt-1">
              <h2 className="text-left">Complain :</h2>
            </Col>

            <Col xs="12" className="">
              <h6 className="text-right">{rowData?.reason}</h6>
            </Col>
            <Col xs="12" className="mt-1">
              <p>
                {" "}
                Do you want to {" "}
                {!rowData?.rider_details?.block_status ? "Block" : "UnBlock"}
              </p>
              <Button
                className={`text-right ${
                  !rowData?.rider_details?.block_status
                    ? "btn-danger"
                    : "btn-success"
                }`}
                onClick={() => modalopenstatus(rowData)}
              >
                {!rowData?.rider_details?.block_status ? "Block" : "UnBlock"}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalupdatestatus} toggle={modalopenstatus} centered>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>
              Do you want to{" "}
              {!rowData?.rider_details?.block_status ? "Block" : "UnBlock"} the
              rider status?
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
            <Button
              color="primary"
              disabled={updatedLoading}
              onClick={handeupdatestatus}
            >
              Update
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modaldelete} toggle={modalopendelete} centered>
        <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to delete this complaint?</p>
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modaldeleteAll} toggle={modalopendeleteAll} centered>
        <ModalHeader toggle={modalopendeleteAll}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to delete selected complaints?</p>
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
            <Button color="secondary" onClick={() => setModaldeleteAll(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={deleteLoading}
              onClick={handleBulkDelete}
            >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Complaints;
