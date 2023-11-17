import { useState } from "react";
import DataTable from 'react-data-table-component';
import { Search, Eye } from "react-feather";
import {
    Input, InputGroup, InputGroupText, Row, Col, Tooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userimage from "@src/assets/images/logo/avatar.jpg";
import adimage from "@src/assets/images/pages/adimage.png";

const Users = () => {

    const [tooltipOpenview, setTooltipOpenview] = useState(false);

    const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

    const data = [
        { id: 1, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "block" },
        { id: 2, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "unblock" },
        { id: 3, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "block" },
        { id: 4, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "unblock" },
        { id: 5, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "block" },
        { id: 6, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "unblock" },
        { id: 7, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "block" },
        { id: 8, name: 'John', email: "john@gmail.com", dob: "20 Jan,2000", gender: "male", age: "30", status: "unblock" },
    ];

    // search
    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <span style={{ backgroundColor: '#FF144D29' }}>{match}</span>
                {afterMatch}
            </>
        );
    };

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
        {
            name: 'Name',
            cell: row => (
                <>
                    {highlightMatch(row.name, searchTerm)}
                </>
            )
        },
        { name: 'Email', selector: 'email', sortable: true },
        { name: 'DOB', selector: 'dob', sortable: true },
        { name: 'Gender', selector: 'gender', sortable: true },
        {
            name: 'Status',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
                        <Button
                            color={`${row.status == "block" ? "success" : "danger"}`}
                            onClick={() => modalopenstatus(row)}
                            style={{ width: "130px" }}
                        >
                            {row.status == "block" ?
                                "Block"
                                :
                                "Unblock"
                            }
                        </Button>
                    </div>
                </>
            ),
        },
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

    const [status, setStatus] = useState(false);
    const [modalupdatestatus, setModalupdatestatus] = useState(false);
    const modalopenstatus = (row) => {
        setStatus(row.id)
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
                <Col xs="4" md="8">
                    <h1 >Users</h1>
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
                                <Search style={{width:"15px"}} />
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
                                <h5 className="text-left">Date Of Birth</h5>
                                <h5 className="text-left">Gender</h5>
                                <h5 className="text-left">Age</h5>
                                <h5 className="text-left">Status</h5>
                            </div>
                        </Col>

                        <Col xs="6" md="4" >
                            <div style={{ display: "flex", justifyContent: "right", flexDirection: "column", gap: "5px", alignContent: "right" }}>
                                <h6 className="text-right">John</h6>
                                <h6 className="text-right">john@gmail.com</h6>
                                <h6 className="text-right">20 Jan,2000</h6>
                                <h6 className="text-right">Male</h6>
                                <h6 className="text-right">30</h6>
                                <h6 className="text-right">Active</h6>
                            </div>
                        </Col>

                        <Col xs='12' className="mt-1">
                            <h2 className="text-left">Review :</h2>
                        </Col>

                        <Col xs='12' className="">
                            <h6 className="text-right">
                                John is a great conversationalist. Our chats were not only enjoyable but also meaningful. He showed genuine interest in getting to know me, and the conversations flowed effortlessly.
                            </h6>
                        </Col>

                    </Row>

                </ModalBody>

            </Modal>

            <Modal isOpen={modalupdatestatus} toggle={modalopenstatus} centered>
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

export default Users;
