import { useState } from "react";
import DataTable from 'react-data-table-component';
import { Eye } from "react-feather";
import {
    Row, Col, Tooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userimage from "@src/assets/images/logo/avatar.jpg";
import adimage from "@src/assets/images/pages/adimage.png"; 

const Deletedusers = () => { 

    const [tooltipOpenview, setTooltipOpenview] = useState(false); 

    const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview); 

    const data = [
        { id: 1, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"10",status: "active" },
        { id: 2, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"1",status: "active" },
        { id: 1, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"80",status: "active" },
        { id: 2, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"10",status: "active" },
        { id: 1, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"0",status: "active" },
        { id: 2, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"10",status: "active" },
        { id: 1, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"10",status: "active" },
        { id: 2, name: 'John', email: "john@gmail.com", deleted_date: "20 Jan,2000", gender: "male", age: "30", remainingdays:"70",status: "active" },
    ];

    const columns = [
        {
            name: 'Profile Image',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
                        <img src={adimage} alt="..." style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                    </div>
                </>
            ),
        },
        { name: 'Name', selector: 'name', sortable: true },
        { name: 'Email', selector: 'email', sortable: true }, 
        { name: 'Deleted Date', selector: 'deleted_date', sortable: true },   
        { name: 'Remaining Days', selector: 'remainingdays', sortable: true }, 
         
        // {
        //     name: 'Status',
        //     cell: row => (
        //         <>
        //             <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
        //                 <Button
        //                     color='success'
        //                     // onClick={modalopenstatus}
        //                 >
        //                     Active
        //                 </Button>
        //             </div>
        //         </>
        //     ),
        // },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>

                        <div>
                            <Eye
                                style={{ color: "#00cfe8", fontSize: "15px" }}
                                id="viewTooltip"
                                onClick={() => modalopenview()}
                                onMouseEnter={toggleTooltipview}
                                onMouseLeave={toggleTooltipview}
                            />
                            <Tooltip placement="top" isOpen={tooltipOpenview} target="viewTooltip" toggle={toggleTooltipview}>
                                View
                            </Tooltip>
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

    const [modalupdatestatus, setModalupdatestatus] = useState(false);
    const modalopenstatus = () => {
        setModalupdatestatus(!modalupdatestatus);
    };

    const handeupdatestatus = () => {
        setTimeout(() => {
            toast.success('User status updated Successfully !', {
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

    return (
        <>

            <Row>
                <Col xs="10" md="11">
                    <h1 >Deleted Users</h1>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                customStyles={customStyles} 
            />

            <Modal isOpen={modalview} toggle={modalopenview} centered>
                <ModalHeader toggle={modalopenview}>User Details</ModalHeader>

                <ModalBody className="mt-0 mb-1">
                    <div >
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <img src={adimage} alt="..." style={{ borderRadius: "50px", width: "60px", height: "60px" }} />
                        </div>
                    </div>

                    <Row>

                        <Col xs="6" md="8" >
                            <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", gap: "5px", alignContent: "start" }}>
                                <h5 className="text-left">Name</h5>
                                <h5 className="text-left">Email</h5>
                                <h5 className="text-left">Deleted Date</h5>
                                {/* <h5 className="text-left">Gender</h5>
                                <h5 className="text-left">Age</h5> */}
                                <h5 className="text-left">Remaining Days</h5>
                                {/* <h5 className="text-left">Status</h5> */}
                            </div>
                        </Col>

                        <Col xs="6" md="4" >
                            <div style={{ display: "flex", justifyContent: "right", flexDirection: "column", gap: "5px", alignContent: "right" }}>
                                <h6 className="text-right">John</h6>
                                <h6 className="text-right">john@gmail.com</h6>
                                <h6 className="text-right">20 Jan,2000</h6>
                                {/* <h6 className="text-right">Male</h6>
                                <h6 className="text-right">30</h6> */}
                                <h6 className="text-right">0</h6>
                                {/* <h6 className="text-right">Active</h6> */}
                            </div>
                        </Col>

                    </Row>

                </ModalBody>

            </Modal>

            <Modal isOpen={modalupdatestatus} toggle={modalopenstatus}>
                <ModalHeader toggle={modalopenstatus}> Confirmation </ModalHeader>

                <ModalBody className="text-center mt-1 mb-1">
                    <div >
                        <p >Do you want to update the users status?</p>
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

export default Deletedusers;
