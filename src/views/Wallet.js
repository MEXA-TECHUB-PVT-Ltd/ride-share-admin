import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Search } from "react-feather";
import {
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Spinner,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import moment from "moment";
import {
  useGetAdminTransactionsQuery,
  useGetAdminWalletQuery,
} from "../redux/dashboardApi";

const Wallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch, isLoading } = useGetAdminTransactionsQuery();
  const { data: wallet } = useGetAdminWalletQuery();

  // Extract transactions from the response
  const transactions = data?.transactions || [];

  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  // Assuming the need to integrate a search feature
  // This would require adjustments based on your actual data structure and requirements
  const filteredData = searchTerm
    ? transactions.filter((transaction) =>
        transaction.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

  const columns = [
    // Adjust these columns according to your actual data
    // Here's an example based on the provided data structure
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `$${parseFloat(row.amount).toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    // Add or adjust columns as needed
  ];

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
            <Col xs="4" md="8">
              <h1>Transaction History</h1>
            </Col>
            <Col xs="8" md="4" className="text-right">
              <div className="d-flex justify-content-center">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      Wallet Balance: ${wallet?.transactions?.balance}
                    </CardTitle>
                  </CardBody>
                </Card>
              </div>

              {/* <div
                className="mb-2"
                style={{ borderRadius: "5px", width: "90%" }}
              >
                <InputGroup>
                  <Input
                    placeholder="Search ...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroupText>
                    <Search style={{ width: "15px" }} />
                  </InputGroupText>
                </InputGroup>
              </div> */}
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
              onChangePage={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Wallet;
