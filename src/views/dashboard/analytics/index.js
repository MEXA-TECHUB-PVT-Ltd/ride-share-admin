// ** React Imports
import { useContext, useState } from "react";

// ** Icons Imports
import { Award, ChevronDown, Eye, List } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";
// import Timeline from '../../../'
import AvatarGroup from "@components/avatar-group";
import DataTable from "react-data-table-component";
// ** Utils
// import { kFormatter } from '@utils'
import ReactPaginate from "react-paginate";
import adimage from "@src/assets/images/pages/adimage.png";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";
import "./table.css";
import SupportTracker from "../../ui-elements/cards/analytics/SupportTracker";

import SubscribersGained from "../../ui-elements/cards/statistics/SubscribersGained";
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived";
import AvgSessions from "../../ui-elements/cards/analytics/AvgSessions";
import ProfitLineChart from "../../ui-elements/cards/statistics/ProfitLineChart";
import {
  Card,
  Button,
  Input,
  Col,
  Row,
  Tooltip,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from "reactstrap";
import CardCongratulations from "../../ui-elements/cards/advance/CardCongratulations";
import OrdersBarChart from "../../ui-elements/cards/statistics/OrdersBarChart";
import MyTable from "../../Table";

import CompanyTable from "./CompanyTable";
import {
  useGetAllContactUsQuery,
  useGetAllCountQuery,
} from "../../../redux/dashboardApi";
import GraphRepresent from "../../components/dashboard/GraphRepresent";
import AppLink from "../../ui-elements/cards/statistics/AppLink";
import { ToastContainer } from "react-toastify";
import ViewContactUs from "../../components/modals/contactUs/ViewContactUs";
import UpdateStatusM from "../../components/modals/contactUs/UpdateStatusM";
const AnalyticsDashboard = () => {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tooltipOpenview, setTooltipOpenview] = useState(false);
  const toggleTooltipview = () => setTooltipOpenview(!tooltipOpenview);

  const {
    data: cuData,
    isLoading: loadingCU,
    error: cuError,
    refetch: refetchCU,
  } = useGetAllContactUsQuery({ limit: 10, page: 1 });
  // ** Context
  const { colors } = useContext(ThemeColors);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const [modalview, setModalview] = useState(false);
  const [rowData, setRowData] = useState();
  const modalopenview = (row) => {
    setRowData(row);
    setModalview(!modalview);
  };

  const [modal, setModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleModal = () => setModal(!modal);

  const handleStatusChange = (status, row) => {
    setRowData(row);
    setSelectedStatus(status);
    toggleModal();
  };
  const { data: allCount, refetch, isLoading, error } = useGetAllCountQuery();
  const columns = [
    {
      name: "ID",
      cell: (row, index) => <>{++index}</>,
    },
    { name: "Message", selector: "message", sortable: true },
    { name: "Status", selector: "status", sortable: true },
    {
      name: "Action",
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
            <Dropdown
              isOpen={openDropdownId === row?.id}
              toggle={() => toggleDropdown(row?.id)}
            >
              <DropdownToggle color="success" caret>
                Update Status
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => handleStatusChange("contacted", row)}
                >
                  Contacted
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleStatusChange("dismissed", row)}
                >
                  Dismissed
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleStatusChange("pending", row)}
                >
                  Pending
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div>
              <Eye
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id="viewTooltip"
                onClick={() => modalopenview(row)}
                onMouseEnter={toggleTooltipview}
                onMouseLeave={toggleTooltipview}
              />
              <Tooltip
                placement="top"
                isOpen={tooltipOpenview}
                target="viewTooltip"
                toggle={toggleTooltipview}
              >
                View
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];

  // const handlePagination = (page) => {
  //   dispatch(
  //     getData({
  //       sort,
  //       q: value,
  //       sortColumn,
  //       status: statusValue,
  //       perPage: rowsPerPage,
  //       page: page.selected + 1,
  //     })
  //   );
  //   setCurrentPage(page.selected + 1);
  // };

  // const CustomPagination = () => {
  //   const count = Number((data.length / rowsPerPage).toFixed(0));

  //   return (
  //     <ReactPaginate
  //       nextLabel=""
  //       breakLabel="..."
  //       previousLabel=""
  //       pageCount={count || 1}
  //       activeClassName="active"
  //       breakClassName="page-item"
  //       pageClassName={"page-item"}
  //       breakLinkClassName="page-link"
  //       nextLinkClassName={"page-link"}
  //       pageLinkClassName={"page-link"}
  //       nextClassName={"page-item next"}
  //       previousLinkClassName={"page-link"}
  //       previousClassName={"page-item prev"}
  //       onPageChange={(page) => handlePagination(page)}
  //       forcePage={currentPage !== 0 ? currentPage - 1 : 0}
  //       containerClassName={"pagination react-paginate justify-content-end p-1"}
  //     />
  //   );
  // };

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
    <div id="dashboard-analytics">
      <Row className="match-height">
        {/* <Col lg='6' xs='12'>
          <CardCongratulations />
        </Col> */}
        <Col lg="2" md="12" xs="12" sm="12">
          <SubscribersGained
            warning={colors.warning.main}
            count={allCount?.result?.insuranceUsersCount}
          />
        </Col>

        <Col lg="2" md="12" sm="12" xs="12">
          <OrdersBarChart
            warning={colors.warning.main}
            count={allCount?.result?.usersCount}
          />
        </Col>

        <Col lg="2" md="12" xs="12" sm="12">
          <OrdersReceived
            warning={colors.warning.main}
            count={allCount?.result?.complaintCount}
          />
        </Col>
        <Col lg="6" md="12" xs="12" sm="12">
          <AppLink
            warning={colors.warning.main}
            count={allCount?.result?.complaintCount}
          />
        </Col>

        {/* <Col lg='4' md='4' xs='12'>
        <ProfitLineChart info={colors.info.main} />

        </Col>  */}
      </Row>

      <Row className="match-height">
        <Col lg="12" xs="12">
          <GraphRepresent primary={colors.primary.main} />
        </Col>
      </Row>
      <Row className="match-height">
        {/* <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col> */}
        {/* <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col> */}
      </Row>
      <Row className="match-height">
        {/* <Col lg='12' md='12' xs='12'>
        <CompanyTable />
        </Col> */}
      </Row>
      <Row className="match-height mb-4">
        <Col lg="12" xs="12">
          <h1>Queries</h1>
          <DataTable
            columns={columns}
            data={cuData?.result?.response}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
          />
        </Col>
      </Row>
      <ToastContainer />
      <ViewContactUs
        modalview={modalview}
        modalopenview={modalopenview}
        contactUsData={rowData}
        refetch={refetchCU}
      />
      <UpdateStatusM
        modalupdatestatus={modal}
        modalopenstatus={toggleModal}
        contactUsData={rowData}
        status={selectedStatus}
        refetch={refetchCU}
      />
    </div>
  );
};

export default AnalyticsDashboard;
