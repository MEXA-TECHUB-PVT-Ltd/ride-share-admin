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
  Alert,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adimage from "@src/assets/images/pages/adimage.png";
import "./Rideprice.css";
import {
  useCreateDRMutation,
  useDeleteDRMutation,
  useGetAllDRQuery,
  useUpdateDRMutation,
} from "../redux/dashboardApi";
import DeleteModalTF from "./components/modals/DeleteModalTF";

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

const Rideprice = () => {
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

  const [addError, setAddError] = useState();

  const [createDR, { isLoading: createLoading }] = useCreateDRMutation();
  const [updateDR, { isLoading: updatedLoading }] = useUpdateDRMutation();
  const [deleteDR, { isLoading: deleteLoading }] = useDeleteDRMutation();
  const { data: drData, refetch, isLoading } = useGetAllDRQuery();

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
      name: "Start Range Per Mile",
      selector: "start_range",
      sortable: true,
    },
    {
      name: "End Range Per Mile",
      selector: "end_range",
      sortable: true,
    },
    {
      name: "Rate Per Mile",
      selector: "rate_per_mile",
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
      toast.success("Driver fair deleted Successfully !", {
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
    console.log("deleted");
    try {
      await deleteDR({
        id: deleteData?.id,
      }).unwrap();
      refetch();
      toast.success("Deleted Successfully", {
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
              <h1>Driver Fare</h1>
            </Col>
            <Col xs="2" md="1" className="text-right">
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
            </Col>
          </Row>

          <DataTable
            columns={columns}
            data={drData?.result?.response}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
          />
        </>
      )}

      <Modal isOpen={modalOpen} toggle={modalopen} centered>
        <ModalHeader toggle={modalopen}>Add Driver Fare</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              start_range: "",
              end_range: "",
              rate_per_mile: "",
            }}
            validate={(values) => {
              const errors = {};

              // Check if start_range is not provided or negative
              if (!values.start_range && values.start_range !== 0) {
                errors.start_range = "Start range is Required";
              } else if (values.start_range < 0) {
                errors.start_range = "Start range cannot be negative";
              }

              // Check if end_range is not provided or negative
              if (!values.end_range && values.end_range !== 0) {
                errors.end_range = "End range is Required";
              } else if (values.end_range < 0) {
                errors.end_range = "End range cannot be negative";
              }

              // Check if rate_per_mile is not provided or negative
              if (!values.rate_per_mile && values.rate_per_mile !== 0) {
                errors.rate_per_mile = "Rate per mile is Required";
              } else if (values.rate_per_mile < 0) {
                errors.rate_per_mile = "Rate per mile cannot be negative";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              console.log("hello");
              try {
                await createDR({
                  start_range: values.start_range,
                  end_range: values.end_range,
                  rate_per_mile: values.rate_per_mile,
                }).unwrap();
                toast.success("Driver Fare Added Successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                refetch();
                setEmptyfieldalert(false);
                setModalOpen(false);
                setSelectedOption("");
              } catch (error) {
                console.log(error);
                setAddError(error?.data?.message)
              }
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ isSubmitting }) => (
              <>
                <ModalBody>
                  <Form>
                    <div className="mb-2">
                      {
                        addError && <Alert color='danger'>{ addError }</Alert>  
                      }
                      <Label className="form-label" for="start-range">
                        Starting Mile Range (e.g., 0 miles)
                      </Label>
                      <Field
                        name="start_range"
                        autoFocus
                        as={Input}
                        type="number"
                        id="start-range"
                        placeholder="Enter the starting mile range (e.g., 0 miles)"
                      />

                      <ErrorMessage name="start_range">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Label className="form-label" for="end-range">
                        Ending Mile Range (e.g., 10 miles)
                      </Label>
                      <Field
                        name="end_range"
                        autoFocus
                        as={Input}
                        type="number"
                        id="end-range"
                        placeholder="Enter the ending mile range (e.g., 10 miles)"
                      />

                      <ErrorMessage name="end_range">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Label className="form-label" for="rate-per-mile">
                        Rate Per Mile (in currency per mile)
                      </Label>
                      <Field
                        name="rate_per_mile"
                        autoFocus
                        as={Input}
                        type="number"
                        id="rate-per-mile"
                        placeholder="Enter the rate per mile (e.g., $1.50 per mile)"
                      />

                      <ErrorMessage name="rate_per_mile">
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
            initialValues={{
              start_range: rowData ? rowData?.start_range : "",
              end_range: rowData ? rowData?.end_range : "",
              rate_per_mile: rowData ? rowData?.rate_per_mile : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.start_range) {
                errors.rate = "Value is Required";
              }
              if (!values.end_range) {
                errors.rate = "Value is Required";
              }
              if (!values.rate_per_mile) {
                errors.rate = "Value is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              try {
                await updateDR({
                  id: rowData?.id,
                  start_range: values.start_range,
                  end_range: values.end_range,
                  rate_per_mile: values.rate_per_mile,
                }).unwrap();
                refetch();
                toast.success("Driver Fare Updated Successfully !", {
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
                        Start Range Per Mile
                      </Label>
                      <Field
                        name="start_range"
                        autoFocus
                        as={Input}
                        type="number"
                      />

                      <ErrorMessage name="start_range">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        End Range Per Mile
                      </Label>
                      <Field
                        name="end_range"
                        autoFocus
                        as={Input}
                        type="number"
                      />

                      <ErrorMessage name="end_range">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        Rate Per Mile
                      </Label>
                      <Field
                        name="rate_per_mile"
                        autoFocus
                        as={Input}
                        type="number"
                      />

                      <ErrorMessage name="rate_per_mile">
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
            <DeleteModalTF text="Do you want to delete driver fair?" />
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
      <ToastContainer />
    </>
  );
};

export default Rideprice;
