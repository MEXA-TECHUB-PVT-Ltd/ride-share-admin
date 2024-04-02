import React, { useState } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { User, CreditCard, Calendar, Lock } from "react-feather";

const BankDetailsSection = ({ bankDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  if (!Array.isArray(bankDetails) || bankDetails?.length === 0) {
    return <p>No bank details available.</p>;
  }

  const pages = Math.ceil(bankDetails?.length / itemsPerPage);
  const currentBankDetails = bankDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to calculate pagination numbers
  const getPaginatedNumbers = () => {
    const totalNumbers = 5; // Total numbers to display in pagination
    const totalBlocks = totalNumbers + 2; // Total blocks including next and previous

    if (pages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(startPage + totalNumbers - 3, pages - 1);

      let pages = [1];
      if (startPage > 2) {
        pages.push("...");
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < pages - 1) {
        pages.push("...");
      }
      pages.push(pages);
      return pages;
    }

    return Array.from({ length: pages }, (_, i) => i + 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Bank Details</CardTitle>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cardholder Name</th>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>CVV</th>
            </tr>
          </thead>
          <tbody>
            {currentBankDetails.map((detail, index) => (
              <tr key={index}>
                <th scope="row">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </th>
                <td>{detail.cardholder_name || "N/A"}</td>
                <td>{detail.card_number || "N/A"}</td>
                <td>
                  {moment(detail.expiry_date).format("DD-MM-YYYY") || "N/A"}
                </td>
                <td>{detail.cvv || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {getPaginatedNumbers().map((page, index) => (
            <PaginationItem
              key={index}
              active={page === currentPage}
              disabled={page === "..."}
            >
              <PaginationLink onClick={() => handlePageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={currentPage === pages}>
            <PaginationLink
              next
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === pages}>
            <PaginationLink last onClick={() => handlePageChange(pages)} />
          </PaginationItem>
        </Pagination>
      </CardBody>
    </Card>
  );
};

export default BankDetailsSection;
