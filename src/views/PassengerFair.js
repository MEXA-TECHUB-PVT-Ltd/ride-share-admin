import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash2, PlusCircle, UploadCloud, X } from "react-feather";
import {
  Row,
  Col,
  Tooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adimage from "@src/assets/images/pages/adimage.png";
import "./Rideprice.css";
import {
  useCreatePRMutation,
  useDeletePRMutation,
  useGetAllPRQuery,
  useUpdatePRMutation,
} from "../redux/dashboardApi";

const btnchnge = {
  letterSpacing: "1px",
  width: "content-fit",
  marginTop: "8px",
  color: "#333",
  backgroundColor: "rgba(195, 0, 0,0.2)",
  borderColor: "rgba(195, 0, 0,0.2)",
  padding: "10px",
  paddingLeft: "40px",
  paddingRight: "40px",
  font: "normal normal normal 12px/14px Arial",
  borderRadius: "50px",
  boxShadow: "none",
  fontWeight: "medium",
  boxShadow: "none",
  borderRadius: "50px",
  fontSize: "15px",
  textTransform: "capitalize",
};

const PassengerFair = () => {
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

  const [createPR, { isLoading: createLoading }] = useCreatePRMutation();
  const [updatePR, { isLoading: updatedLoading }] = useUpdatePRMutation();
  const [deletePR, { isLoading: deleteLoading }] = useDeletePRMutation();
  const { data: prData, refetch, isLoading } = useGetAllPRQuery();

  const toggleTooltipEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  const toggleTooltipadd = () => setTooltipOpenadd(!tooltipOpenadd);

  const data = [{ id: 1, rate: "200" }];

  const columns = [
    {
      name: "id",
      cell: (row, index) => <>{++index}</>,
    },
    {
      name: "Rate",
      selector: "rate",
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
              <Edit
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id="editTooltip"
                onClick={() => modalopenedit(row)}
                onMouseEnter={toggleTooltipEdit}
                onMouseLeave={toggleTooltipEdit}
              />
              <Tooltip
                placement="top"
                isOpen={tooltipOpenEdit}
                target="editTooltip"
                toggle={toggleTooltipEdit}
              >
                Edit
              </Tooltip>
            </div>

            {/* <div>
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
            </div> */}
          </div>
        </>
      ),
    },
  ];

  const [emptyfieldalert, setEmptyfieldalert] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const modalopen = () => {
    setModalOpen(!modalOpen);
  };

  const [modaledit, setModaledit] = useState(false);
  const [rowData, setRowData] = useState();
  const modalopenedit = (row) => {
    setRowData(row);
    setModaledit(!modaledit);
  };

  const [modaldelete, setModaldelete] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const modalopendelete = (row) => {
    setDeleteData(row);
    setModaldelete(!modaldelete);
  };

  const handedelete = () => {
    setTimeout(() => {
      toast.success("Ride fair deleted Successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
      setModaldelete(false);
    }, 1000);
  };

  const [modalupdatestatus, setModalupdatestatus] = useState(false);
  const modalopenstatus = () => {
    setModalupdatestatus(!modalupdatestatus);
  };

  const handeupdatestatus = () => {
    setTimeout(() => {
      toast.success("Poster status updated Successfully !", {
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

  const handleDelete = async () => {
    try {
      await deletePR({
        id: deleteData?.id,
      }).unwrap();
      refetch();
      toast.success("Passenger fair Deleted Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
      });
      setModaldelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(true);
    // Perform any other actions based on the selected option
  };

  return (
    <>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Row>
            <Col xs="10" md="11">
              <h1>Passenger Fare</h1>
            </Col>
            {/* <Col xs="2" md="1" className="text-right">
              <PlusCircle
                style={{ cursor: "pointer", fontSize: "15px" }}
                id="addTooltip"
                onClick={modalopen}
                onMouseEnter={toggleTooltipadd}
                onMouseLeave={toggleTooltipadd}
              />
              <Tooltip
                placement="bottom"
                isOpen={tooltipOpenadd}
                target="addTooltip"
                toggle={toggleTooltipadd}
              >
                Add
              </Tooltip>
            </Col> */}
          </Row>

          <DataTable
            columns={columns}
            data={prData?.result?.response}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
            />
            {/* <div>
              <p>Add fare for your passengers on time</p>
            </div> */}
        </>
      )}

      <Modal isOpen={modalOpen} toggle={modalopen} centered>
        <ModalHeader toggle={modalopen}>Add Passenger Fare</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{ rate: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.rate) {
                errors.rate = "Value is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              console.log("hello");
              try {
                await createPR({
                  rate: values.rate,
                }).unwrap();
                toast.success("Passenger Fare Added Successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
                });
                refetch();
                setEmptyfieldalert(false);
                setModalOpen(false);
                setSelectedOption("");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <>
                <ModalBody>
                  <Form>
                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        Passenger Rate
                      </Label>
                      <Field name="rate" autoFocus as={Input} type="number" />

                      <ErrorMessage name="rate">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignContent: "right",
                      }}
                    >
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto"
                      >
                        Add
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <Modal isOpen={modaledit} toggle={modalopenedit} centered>
        <ModalHeader toggle={modalopenedit}>Edit Passenger Fare</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{ rate: rowData ? rowData?.rate : "" }}
            validate={(values) => {
              const errors = {};
              if (!values.rate) {
                errors.rate = "Value is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              try {
                await updatePR({
                  id: rowData?.id,
                  rate: values.rate,
                }).unwrap();
                refetch();
                toast.success("Passenger Fare Added Successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
                });
                setEmptyfieldalert(false);
                setModaledit(false);
              } catch (error) {
                console.log(error);
              }

              setSelectedOption("");
            }}
          >
            {({ isSubmitting }) => (
              <>
                <ModalBody>
                  <Form>
                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        Passenger Rate
                      </Label>
                      <Field name="rate" autoFocus as={Input} type="number" />

                      <ErrorMessage name="rate">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignContent: "right",
                      }}
                    >
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto"
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <Modal isOpen={modaldelete} toggle={modalopendelete} centered>
        <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to delete passenger fair?</p>
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
            <Button color="primary" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* <Modal isOpen={modalupdatestatus} toggle={modalopenstatus}>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p>Do you want to update the poster status?</p>
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
            <Button color="primary" onClick={handeupdatestatus}>
              Update
            </Button>
          </div>
        </ModalFooter>
      </Modal> */}

      <ToastContainer />
    </>
  );
};

export default PassengerFair;
