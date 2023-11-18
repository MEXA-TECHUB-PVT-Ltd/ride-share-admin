// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  Key,
  Settings,
  AlertCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap"; 

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/sample_user_icon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserDropdown = () => {

  const navigate = useNavigate();

  const [modaldelete, setModaldelete] = useState(false);
  const modalopendelete = () => {
    setModaldelete(!modaldelete);
  };

  const handedelete = () => {
    navigate("/")
  }

  return (
    <>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <div className="user-nav d-sm-flex d-none">
            {/* <span className="user-name fw-bold">John Doe</span>
            <span className="user-status">Admin</span> */}
          </div>
          <Avatar
            img={defaultAvatar}
            imgHeight="40"
            imgWidth="40"
            status="online"
          />
        </DropdownToggle>
        <DropdownMenu style={{width:"200px"}} end>
          {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem> */}
          <DropdownItem tag={Link} to="/updatepassword" >
            <Key size={14} className="me-75" />
            <span className="align-middle">Update Password</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            to="/privacypolicy"
          >
            <Settings size={14} className="me-75" />
            <span className="align-middle">Privacy Policy</span>
          </DropdownItem>
          <DropdownItem tag={Link} to="/termsandconditions" >
            <AlertCircle size={14} className="me-75" />
            <span className="align-middle">Terms & Conditions</span>
          </DropdownItem>

          <DropdownItem tag={Link} onClick={modalopendelete}>
            <Power size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <Modal isOpen={modaldelete} toggle={modalopendelete} centered>
        <ModalHeader toggle={modalopendelete}> Confirmation </ModalHeader>

        <ModalBody className="text-center mt-1 mb-1">
          <div >
            <p >Do you want to logout ?</p>
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
             Logout
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>

  );
};

export default UserDropdown;
