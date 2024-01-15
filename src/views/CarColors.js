import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash2, PlusCircle, UploadCloud, X } from "react-feather";
import {
  Row,
  Col,
  Tooltip,
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
import {
    useCreateCCMutation,
  useCreateCTMutation,
  useDeleteCCMutation,
  useDeleteCTMutation,
  useGetAllCCQuery,
  useGetAllCTQuery,
  useUpdateCCMutation,
  useUpdateCTMutation,
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

const CarColor = () => {
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

  const [createCC, { isLoading: createLoading }] = useCreateCCMutation();
  const [updateCC, { isLoading: updatedLoading }] = useUpdateCCMutation();
  const [deleteCC, { isLoading: deleteLoading }] = useDeleteCCMutation();
  const { data: cc, refetch, isLoading } = useGetAllCCQuery();

  const toggleTooltipEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  const toggleTooltipadd = () => setTooltipOpenadd(!tooltipOpenadd);


  const data = cc?.result?.response;

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <>{++index}</>,
    },
    { name: "Name", selector: "name", sortable: true },
    { name: "Code", selector: "code", sortable: true },
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

  // image
  const [hidelabel, setHidelabel] = useState(false);
  const [hidecrossicon, setHidecrossicon] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setHidecrossicon(true);
    setHidelabel(true);
  };

  const clearpreviewimage = () => {
    setSelectedFile(null);
    setHidecrossicon(false);
    setHidelabel(false);
  };

  const [emptyfieldalert, setEmptyfieldalert] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const modalopen = () => {
    setModalOpen(!modalOpen);
  };

  // update image
  const [hideupdateimage, setUpdateimage] = useState(false);
  const [selectedImagepreview, setSelectedImagepreview] = useState(null);
  const [imageupdate, setImageupdate] = useState(null);
  const handleImageupdate = (e) => {
    const file = e.target.files[0];
    setImageupdate(e.target.files[0]);
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImagepreview(imageURL);
      setUpdateimage(true);
    }
  };

  const [modaledit, setModaledit] = useState(false);
  const [rowData, setRowData] = useState();

  const modalopenedit = (row) => {
    setRowData(row);
    setModaledit(!modaledit);
  };

  const [modaldelete, setModaldelete] = useState(false);
  const modalopendelete = (row) => {
    setRowData(row);
    setModaldelete(!modaldelete);
  };

  const handleDelete = async () => {
    try {
      await deleteCC({
        id: rowData?.id,
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

  return (
    <>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Row>
            <Col xs="10" md="11">
              <h1>Car Color</h1>
            </Col>
            <Col xs="2" md="1" className="text-right">
              <PlusCircle
                style={{ cursor: "pointer", fontSize: "15px", color: "" }}
                id="addTooltip"
                onClick={() => modalopen()}
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
            data={data}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
            // dense
          />
        </>
      )}

      <Modal isOpen={modalOpen} toggle={modalopen} centered>
        <ModalHeader toggle={modalopen}>Add Car Color</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{ name: "", code: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is Required";
              }
              if (!values.code) {
                errors.code = "Code is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await createCC({
                  name: values.name,
                  code: values.code,
                }).unwrap();
                toast.success("Car Color Added Successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                refetch();
                setEmptyfieldalert(false);
                setModalOpen(false);
                setSelectedOption("");
              } catch (error) {
                console.log(error);
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
                      <Label className="form-label" for="login-email">
                        Name
                      </Label>
                      <Field name="name" autoFocus as={Input} type="text" />

                      <ErrorMessage name="name">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        Code
                      </Label>
                      <Field name="code" autoFocus as={Input} type="text" />

                      <ErrorMessage name="code">
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
                        disabled={createLoading}
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
        <ModalHeader toggle={modalopenedit}>Edit Car Color</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              name: rowData?.name || "",
              code: rowData?.code || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is Required";
              }
              if (!values.code) {
                errors.code = "Code is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              try {
                await updateCC({
                  id: rowData?.id,
                  name: values.name,
                  code: values.code,
                }).unwrap();
                refetch();
                toast.success("Car Type Updated Successfully !", {
                  position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
                });
                setEmptyfieldalert(false);
                setModaledit(false);
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
                        Name
                      </Label>
                      <Field name="name" autoFocus as={Input} type="text" />

                      <ErrorMessage name="name">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        Code
                      </Label>
                      <Field name="code" autoFocus as={Input} type="text" />

                      <ErrorMessage name="code">
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
                        disabled={updatedLoading}
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
            <DeleteModalTF text="Do you want to delete this car color?" />
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

      <Modal isOpen={modalupdatestatus} toggle={modalopenstatus}>
        <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div>
            <p style={{ color: "black" }}>
              Do you want to update the poster status?
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

      <ToastContainer />
    </>
  );
};

export default CarColor;
