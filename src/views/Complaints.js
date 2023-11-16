import { useState } from "react";
import DataTable from 'react-data-table-component';
import { Search, Eye } from "react-feather";
import {
    Input, InputGroup, InputGroupText, Row, Col, Tooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userimage from "@src/assets/images/logo/avatar.jpg";
import adimage from "@src/assets/images/pages/car.jpg";

const Complaints = () => {

    const [tooltipOpenview, setTooltipOpenview] = useState(false);

    const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

    const data = [
        { id: 1, name: 'John', email: "john@gmail.com", complain: "Driver arrived late without prior notice, causing delays", gender: "male", age: "30", status: "block" },
        { id: 2, name: 'John', email: "john@gmail.com", complain: "Unprofessional behavior from the driver during the trip", gender: "male", age: "30", status: "unblock" },
        { id: 3, name: 'John', email: "john@gmail.com", complain: "Car cleanliness was subpar, affecting the ride experience.", gender: "male", age: "30", status: "block" },
        { id: 4, name: 'John', email: "john@gmail.com", complain: "Unsafe driving practices observed during the journey.", gender: "male", age: "30", status: "unblock" },
        { id: 5, name: 'John', email: "john@gmail.com", complain: "Unexpected route taken, significantly prolonging the trip.", gender: "male", age: "30", status: "block" },
        { id: 6, name: 'John', email: "john@gmail.com", complain: "Driver didn't follow the specified drop-off location", gender: "male", age: "30", status: "unblock" },
        { id: 7, name: 'John', email: "john@gmail.com", complain: "Charged an incorrect fare amount for the distance traveled.", gender: "male", age: "30", status: "block" },
        { id: 8, name: 'John', email: "john@gmail.com", complain: "Driver canceled the ride abruptly without explanation, inconveniencing plans.", gender: "male", age: "30", status: "unblock" },
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
            name: 'Car Detail',
            cell: row => (
                <>
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
                        <img src={adimage} alt="..." style={{ borderRadius: "5px", width: "100px", height: "40px" }} />
                    </div>
                </>
            ),
        },
         {
            name: 'User Name',
            cell: row => (
                <>
                    {highlightMatch(row.name, searchTerm)}
                </>
            )
        },
        { name: 'User Email', selector: 'email', sortable: true },
        { name: 'Complain', selector: 'complain', sortable: true },

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
                    <h1 >Complaints</h1>
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
                <ModalHeader toggle={modalopenview}>Complain Details</ModalHeader>

                <ModalBody className="mt-0 mb-1">
                    <div className="mt-0 mb-2" >
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <img src={adimage} alt="..." style={{ borderRadius: "10px", width: "300px", height: "150px" }} />
                        </div>
                    </div>

                    <Row>

                        <Col xs="6" md="8" >
                            <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", gap: "5px", alignContent: "start" }}>
                                <h5 className="text-left">Rider Name</h5>
                                <h5 className="text-left">Rider Email</h5>
                            </div>
                        </Col>

                        <Col xs="6" md="4" >
                            <div style={{ display: "flex", justifyContent: "right", flexDirection: "column", gap: "5px", alignContent: "right" }}>
                                <h6 className="text-right">John</h6>
                                <h6 className="text-right">john@gmail.com</h6>
                            </div>
                        </Col>

                        <Col xs='12' className="mt-1">
                            <h2 className="text-left">Complain :</h2>
                        </Col>

                        <Col xs='12' className="">
                            <h6 className="text-right">
                                Driver arrived late without prior notice, causing delays
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

export default Complaints;
