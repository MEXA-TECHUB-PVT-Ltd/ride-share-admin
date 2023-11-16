import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Edit, Trash2, PlusCircle } from "react-feather";
import {
    Row,
    Col, Tooltip,
    Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PresetQuestions = () => {

    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
    const [tooltipOpenadd, setTooltipOpenadd] = useState(false);

    const toggleTooltipEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    const toggleTooltipDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
    const toggleTooltipadd = () => setTooltipOpenadd(!tooltipOpenadd);

    const data = [
        { id: 1, question: 'How long have you been single/Available?' },
        { id: 2, question: 'What challenges have you had in dating?' },
        { id: 3, question: ' What is your biggest lesson learnt in Dating?' },
        { id: 4, question: 'What are you looking for in a Partner?' },
        { id: 5, question: 'What Are your hobbies?' },
        { id: 6, question: ' What is your biggest lesson learnt in Dating?' }, 
    ];

    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Questions', selector: 'question', sortable: true },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>

                        <div>
                            <Edit
                                style={{ color: "#00cfe8", fontSize: "15px" }}
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
                                style={{ fontSize: "15px", color: "red" }}
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
            toast.success('Question deleted Successfully !', {
                position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
            });
            setModaldelete(false);
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

    return (
        <>

            <Row>
                <Col xs="10" md="11">
                    <h1 >Car Type</h1>
                </Col>
                <Col xs="2" md="1" className="text-right">
                    <PlusCircle
                        style={{ fontSize: "15px", color: "red" }}
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

            <Modal isOpen={modalOpen} toggle={modalopen}>
                <ModalHeader toggle={modalopen}>Add Question</ModalHeader>

                <ModalBody>

                    <Formik

                        initialValues={{ question: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.question) {
                                errors.question = 'Question is Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(values);
                            setTimeout(() => {
                                toast.success('Question Added Successfully !', {
                                    position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
                                });
                                setModalOpen(false);
                            }, 1000);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <ModalBody>
                                    <Form   >
                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Question
                                            </Label>
                                            <Field
                                                name='question'
                                                autoFocus
                                                as={Input}
                                                type='textarea' // Use 'textarea' instead of 'text'
                                                rows={5}
                                            />

                                            <ErrorMessage name="question">
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

            <Modal isOpen={modaledit} toggle={modalopenedit}>
                <ModalHeader toggle={modalopenedit}>Edit Question</ModalHeader>

                <ModalBody>

                    <Formik

                        initialValues={{ question: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.question) {
                                errors.question = 'Question is Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(values);
                            setTimeout(() => {
                                toast.success('Question updated Successfully !', {
                                    position: toast.POSITION.BOTTOM_RIGHT  // Apply a custom class for styling
                                });
                                setModaledit(false);
                            }, 1000);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <ModalBody>
                                    <Form   >
                                        <div className='mb-2'>
                                            <Label className='form-label' for='login-email'>
                                                Question
                                            </Label>
                                            <Field
                                                name='question'
                                                autoFocus
                                                as={Input}
                                                type='textarea' // Use 'textarea' instead of 'text'
                                                rows={5}
                                            />

                                            <ErrorMessage name="question">
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

            <Modal isOpen={modaldelete} toggle={modalopendelete}>
                <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

                <ModalBody className="text-center mt-1 mb-1">
                    <div >
                        <p >Do you want to delete this question?</p>
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

            <ToastContainer />
        </>
    );
};

export default PresetQuestions;
