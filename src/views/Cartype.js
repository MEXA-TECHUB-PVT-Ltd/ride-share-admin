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
  useCreateCTMutation,
  useDeleteCTMutation,
  useGetAllCTQuery,
  useUpdateCTMutation,
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

const CarType = () => {
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

  const [createCT, { isLoading: createLoading }] = useCreateCTMutation();
  const [updateCT, { isLoading: updatedLoading }] = useUpdateCTMutation();
  const [deleteCT, { isLoading: deleteLoading }] = useDeleteCTMutation();
  const { data: ctData, refetch, isLoading } = useGetAllCTQuery();

  const toggleTooltipEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  const toggleTooltipadd = () => setTooltipOpenadd(!tooltipOpenadd);

  console.log(ctData?.result?.response);

  const data = ctData?.result?.response;

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <>{++index}</>,
    },
    { name: "Name", selector: "name", sortable: true },
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
        await deleteCT({
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
              <h1>Car Type</h1>
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
        <ModalHeader toggle={modalopen}>Add Car Type</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{ name: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is Required";
              }
              //   else if (!values.noofseats) {
              //     errors.noofseats = "Seats number is Required";
              //   }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              //   console.log(values);
              //   if (selectedFile == null) {
              //     // setEmptyfieldalert(true);
              //     // setTimeout(async () => {
              //     //   setEmptyfieldalert(false);
              //     // }, 3000);
              //   } else {
              //   setTimeout(() => {
              //     toast.success("Car Type Added Successfully !", {
              //       position: toast.POSITION.BOTTOM_RIGHT, // Apply a custom class for styling
              //     });
              //     setModalOpen(false);
              //     setSelectedFile(null);
              //   }, 1000);
              //   }
              try {
                await createCT({
                  name: values.name,
                }).unwrap();
                toast.success("Car Type Added Successfully !", {
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
                    {/* <div>
                      {hidecrossicon ? (
                        <div
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignContent: "right",
                          }}
                        >
                          <X
                            style={{
                              padding: 0.2,
                              backgroundColor: "rgba(195, 0, 0,0.2)",
                              borderRadius: "50px",
                              color: "white",
                              marginLeft: "410px",
                            }}
                            onClick={() => clearpreviewimage()}
                          />
                        </div>
                      ) : null}

                      <div
                        style={{
                          pt: 1,
                          width: "100%",
                          height: "160px",
                          p: "0.5px",
                          border: "1px dashed rgba(195, 0, 0,0.2)",
                          borderSpacing: "20px",
                          float: "center",
                          borderRadius: "5px",
                        }}
                      >
                        {hidelabel ? null : (
                          <div align="">
                            <label
                              htmlFor="fileInput"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                color: "#606060",
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "50px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                  }}
                                >
                                  <UploadCloud
                                    sx={{
                                      fontSize: "50px",
                                      color: "#606060",
                                      ml: 3.5,
                                      pb: 0,
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    paddingBottom: "2vh",
                                    fontFamily: "Inter",
                                  }}
                                >
                                  Upload Image
                                </span>
                              </div>
                            </label>
                            <input
                              style={{ display: "none" }}
                              id="fileInput"
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          {selectedFile && (
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Preview"
                              style={{
                                alignSelf: "center",
                                width: "80%",
                                height: "155px",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div align="left" sx={{ pt: 1, height: "20px" }}>
                        {emptyfieldalert ? (
                          <span
                            style={{
                              marginTop: "2px",
                              fontSize: "14px",
                              color: "red",
                            }}
                          >
                            Image is required
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div> */}

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

                    {/* <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        No of seats
                      </Label>
                      <Field
                        name="noofseats"
                        autoFocus
                        as={Input}
                        type="number"
                      />

                      <ErrorMessage name="noofseats">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div> */}

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
        <ModalHeader toggle={modalopenedit}>Edit Car Type</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{ name: rowData?.name || "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              try {
                await updateCT({
                  id: rowData?.id,
                  name: values.name,
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
                    {/* <div>
                      {hidecrossicon ? (
                        <div
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignContent: "right",
                          }}
                        >
                          <X
                            style={{
                              padding: 0.2,
                              backgroundColor: "rgba(195, 0, 0,0.2)",
                              borderRadius: "50px",
                              color: "white",
                              marginLeft: "410px",
                            }}
                            onClick={() => clearpreviewimage()}
                          />
                        </div>
                      ) : null} */}

                    {/* <div
                        style={{
                          pt: 1,
                          width: "100%",
                          height: "160px",
                          p: "0.5px",
                          border: "1px dashed rgba(195, 0, 0,0.2)",
                          borderSpacing: "20px",
                          float: "center",
                          borderRadius: "5px",
                        }}
                      > */}
                    {/* {hidelabel ? null : (
                          <div align="">
                            <label
                              htmlFor="fileInput"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                color: "#606060",
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "50px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                  }}
                                >
                                  <UploadCloud
                                    sx={{
                                      fontSize: "50px",
                                      color: "#606060",
                                      ml: 3.5,
                                      pb: 0,
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    paddingBottom: "2vh",
                                    fontFamily: "Inter",
                                  }}
                                >
                                  Upload Image
                                </span>
                              </div>
                            </label>
                            <input
                              style={{ display: "none" }}
                              id="fileInput"
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </div>
                        )} */}
                    {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          {selectedFile && (
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Preview"
                              style={{
                                alignSelf: "center",
                                width: "80%",
                                height: "155px",
                              }}
                            />
                          )}
                        </div> */}
                    {/* </div> */}

                    {/* <div align="left" sx={{ pt: 1, height: "20px" }}>
                        {emptyfieldalert ? (
                          <span
                            style={{
                              marginTop: "2px",
                              fontSize: "14px",
                              color: "red",
                            }}
                          >
                            Image is required
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div> */}

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

                    {/* <div className="mb-2">
                      <Label className="form-label" for="login-email">
                        No Of Seats
                      </Label>
                      <Field
                        name="noofseats"
                        autoFocus
                        as={Input}
                        type="number"
                      />

                      <ErrorMessage name="noofseats">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div> */}

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
            <p>Do you want to delete this car type?</p>
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

export default CarType;
