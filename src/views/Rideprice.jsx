import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Edit, Trash2, PlusCircle, UploadCloud, X } from "react-feather";
import {
    Row,
    Col, Tooltip, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adimage from "@src/assets/images/pages/adimage.png";
import "./Rideprice.css"

const btnchnge = {
    letterSpacing: "1px",
    width: 'content-fit',
    marginTop: '8px',
    color: '#333',
    backgroundColor: 'rgba(195, 0, 0,0.2)',
    borderColor: 'rgba(195, 0, 0,0.2)',
    padding: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    font: 'normal normal normal 12px/14px Arial',
    borderRadius: "50px",
    boxShadow: "none",
    fontWeight: "medium",
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "15px",
    textTransform: "capitalize"
}

const RidePrice = () => {

    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
    const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

    const toggleTooltipEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
    const toggleTooltipadd = () => setTooltipOpenadd(!tooltipOpenadd);

    const data = [
        { id: 1, miles: "10", driver_charges: "200", extra_person_Charges: "300" },
        { id: 2, miles: "15", driver_charges: "150", extra_person_Charges: "250" },
        { id: 3, miles: "20", driver_charges: "250", extra_person_Charges: "350" },
        { id: 4, miles: "10", driver_charges: "200", extra_person_Charges: "300" },
        { id: 5, miles: "10", driver_charges: "200", extra_person_Charges: "300" },
        { id: 6, miles: "10", driver_charges: "200", extra_person_Charges: "300" },
        { id: 7, miles: "15", driver_charges: "150", extra_person_Charges: "250" },
        { id: 8, miles: "20", driver_charges: "250", extra_person_Charges: "350" },
    ];

    const columns = [
        {
            name: 'Distance',
            cell: row => (
                <>
                    {row.miles} miles
                </>
            ),
        },
        { name: 'Driver Charges', selector: 'driver_charges', sortable: true },
        { name: 'Extra Person Charges', selector: 'extra_person_Charges', sortable: true },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>

                        <div>
                            <Edit
                                style={{ cursor: "pointer", color: "#00cfe8", fontSize: "15px" }}
                                id="editTooltip"
                                onClick={() => modalopenedit()}
                                onMouseEnter={toggleTooltipEdit}
                                onMouseLeave={toggleTooltipEdit}
                            />
                            <Tooltip placement="top" isOpen={tooltipOpenEdit} target="editTooltip" toggle={toggleTooltipEdit}>
                                Edit
                            </Tooltip>
                        </div>

                        <div>
                            <Trash2
                                style={{ cursor: "pointer", fontSize: "15px", color: "red" }}
                                id="deleteTooltip"
                                onClick={() => modalopendelete()}
                                onMouseEnter={toggleTooltipDelete}
                                onMouseLeave={toggleTooltipDelete}
                            />
                            <Tooltip placement="top" isOpen={tooltipOpenDelete} target="deleteTooltip" toggle={toggleTooltipDelete}>
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
    const modalopenedit = () => {
        setModaledit(!modaledit);
    };

    const [modaldelete, setModaldelete] = useState(false);
    const modalopendelete = () => {
        setModaldelete(!modaldelete);
    };

    const handedelete = () => {
        setTimeout(() => {
            toast.success('Ride fair deleted Successfully !', {
                position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
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
            toast.success('Poster status updated Successfully !', {
                position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
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
                display: "flex", justifyContent: "center", alignContent: "center"
            },
        },
        cells: {
            style: {
                display: "flex", justifyContent: "center", alignContent: "center"
            },
        },
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleSelect = option => {
        setSelectedOption(option);
        setDropdownOpen(true);
        // Perform any other actions based on the selected option
    };

    return (
        <>

            <Row>
                <Col xs="10" md="11">
                    <h1 >Ride Fair</h1>
                </Col>
                <Col xs="2" md="1" className="text-right">
                    <PlusCircle
                        style={{ cursor: "pointer", fontSize: "15px", color: "" }}
                        id="addTooltip"
                        onClick={() => modalopen()}
                        onMouseEnter={toggleTooltipadd}
                        onMouseLeave={toggleTooltipadd}
                    />
                    <Tooltip placement="bottom" isOpen={tooltipOpenadd} target="addTooltip" toggle={toggleTooltipadd}>
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

            <Modal isOpen={modalOpen} toggle={modalopen} centered>
                <ModalHeader toggle={modalopen}>Add Ride Fair</ModalHeader>

                <ModalBody>

                    <Formik

                        initialValues={{ drivercharges: '', extrapersoncharges: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.drivercharges) {
                                errors.drivercharges = 'Value is Required';
                            } else if (!values.extrapersoncharges) {
                                errors.extrapersoncharges = 'Value is Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(values);
                            if (selectedOption == "") {
                                setEmptyfieldalert(true);
                                setTimeout(async () => {
                                    setEmptyfieldalert(false);
                                }, 3000)
                            } else {

                                toast.success('Ride Fair Added Successfully !', {
                                    position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
                                });
                                setEmptyfieldalert(false);
                                setModalOpen(false);
                                setSelectedOption("");

                            }

                        }}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <ModalBody>
                                    <Form   >

                                        <div className="mb-2">
                                            <Label className='form-label' for='login-email'>
                                                Miles
                                            </Label>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                                <DropdownToggle
                                                    tag="span"
                                                    data-toggle="dropdown"
                                                    aria-expanded={dropdownOpen}
                                                    className="dropdown-input"
                                                >
                                                    {selectedOption}
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu">
                                                    <DropdownItem onClick={() => handleSelect('20')}>
                                                        20
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleSelect('30')}>
                                                        30
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleSelect('40')}>
                                                        40
                                                    </DropdownItem>
                                                    {/* Add more DropdownItems as needed */}
                                                </DropdownMenu>
                                            </Dropdown>

                                            <div align="left" sx={{ pt: 0, height: "1px" }}>
                                                {emptyfieldalert ?
                                                    <span style={{ marginTop: "1px", fontSize: "14px", color: "red" }}>
                                                        Value is required
                                                    </span>
                                                    :
                                                    <></>}
                                            </div>

                                        </div>

                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Driver Charges
                                            </Label>
                                            <Field
                                                name='drivercharges'
                                                autoFocus
                                                as={Input}
                                                type='number'
                                            />

                                            <ErrorMessage name="drivercharges">
                                                {msg => <div className="error" style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Extra Person Charges
                                            </Label>
                                            <Field
                                                name='extrapersoncharges'
                                                autoFocus
                                                as={Input}
                                                type='number'
                                            />

                                            <ErrorMessage name="extrapersoncharges">
                                                {msg => <div className="error" style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
                                            <Button
                                                color='primary'
                                                type='submit'
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
                <ModalHeader toggle={modalopenedit}>Edit Ride Fair</ModalHeader>

                <ModalBody>

                    <Formik

                        initialValues={{ drivercharges: '', extrapersoncharges: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.drivercharges) {
                                errors.drivercharges = 'Value is Required';
                            } else if (!values.extrapersoncharges) {
                                errors.extrapersoncharges = 'Value is Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(values);
                            if (selectedOption == "") {
                                setEmptyfieldalert(true);
                                setTimeout(async () => {
                                    setEmptyfieldalert(false);
                                }, 3000)
                            } else {

                                toast.success('Ride Fair updated Successfully !', {
                                    position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
                                });
                                setEmptyfieldalert(false);
                                setModaledit(false);
                                setSelectedOption("");

                            }

                        }}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <ModalBody>
                                    <Form   >

                                        <div className="mb-2">
                                            <Label className='form-label' for='login-email'>
                                                Miles
                                            </Label>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                                <DropdownToggle
                                                    tag="span"
                                                    data-toggle="dropdown"
                                                    aria-expanded={dropdownOpen}
                                                    className="dropdown-input"
                                                >
                                                    {selectedOption}
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu">
                                                    <DropdownItem onClick={() => handleSelect('20')}>
                                                        20
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleSelect('30')}>
                                                        30
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleSelect('40')}>
                                                        40
                                                    </DropdownItem>
                                                    {/* Add more DropdownItems as needed */}
                                                </DropdownMenu>
                                            </Dropdown>

                                            <div align="left" sx={{ pt: 0, height: "1px" }}>
                                                {emptyfieldalert ?
                                                    <span style={{ marginTop: "1px", fontSize: "14px", color: "red" }}>
                                                        Value is required
                                                    </span>
                                                    :
                                                    <></>}
                                            </div>

                                        </div>

                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Driver Charges
                                            </Label>
                                            <Field
                                                name='drivercharges'
                                                autoFocus
                                                as={Input}
                                                type='number'
                                            />

                                            <ErrorMessage name="drivercharges">
                                                {msg => <div className="error" style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Extra Person Charges
                                            </Label>
                                            <Field
                                                name='extrapersoncharges'
                                                autoFocus
                                                as={Input}
                                                type='number'
                                            />

                                            <ErrorMessage name="extrapersoncharges">
                                                {msg => <div className="error" style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
                                            <Button
                                                color='primary'
                                                type='submit'
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

            <Modal isOpen={modaldelete} toggle={modalopendelete} centered >
                <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

                <ModalBody className="text-center mt-1 mb-1">
                    <div >
                        <p >Do you want to delete eise fair?</p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "10px" }}>
                        <Button color="secondary" onClick={() => setModaldelete(false)}>
                            Cancel
                        </Button>
                        <Button
                            color='primary'
                            onClick={handedelete}
                        >
                            Delete
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalupdatestatus} toggle={modalopenstatus}>
                <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

                <ModalBody className="text-center mt-1 mb-1">
                    <div >
                        <p >Do you want to update the poster status?</p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "10px" }}>
                        <Button color="secondary" onClick={() => setModalupdatestatus(false)}>
                            Cancel
                        </Button>
                        <Button
                            color='primary'
                            onClick={handeupdatestatus}
                        >
                            Update
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default RidePrice;
