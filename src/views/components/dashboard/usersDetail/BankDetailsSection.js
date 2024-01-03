import React, { useState } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  Button,
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

  const currentBankDetails = bankDetails?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Bank Details</CardTitle>
        {currentBankDetails?.map((detail, index) => (
          <BankDetail
            key={index}
            detail={detail}
            index={(currentPage - 1) * itemsPerPage + index + 1}
          />
        ))}
        <Pagination aria-label="Bank details pagination">
          {[...Array(pages)]?.map((_, pageIndex) => (
            <PaginationItem
              key={pageIndex}
              active={pageIndex + 1 === currentPage}
            >
              <PaginationLink onClick={() => handlePageChange(pageIndex + 1)}>
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </CardBody>
    </Card>
  );
};

const BankDetail = ({ detail, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-1">
      <Button color="info" onClick={toggle} className="w-100 text-left">
        <CreditCard
          size={16}
          className="mr-5"
          style={{ marginRight: "10px" }}
        />
        Bank Detail #{index}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Row>
              <DetailCol
                icon={<User size={16} />}
                title="Cardholder Name"
                value={detail?.cardholder_name}
              />
              <DetailCol
                icon={<CreditCard size={16} />}
                title="Card Number"
                value={detail?.card_number}
              />
              <DetailCol
                icon={<Calendar size={16} />}
                title="Expiry Date"
                value={moment(detail?.expiry_date).format("DD-MM-YYYY")}
              />
              <DetailCol
                icon={<Lock size={16} />}
                title="CVV"
                value={detail?.cvv}
              />
            </Row>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

const DetailCol = ({ icon, title, value }) => (
  <Col xs="12" md="6" className="mb-1">
    <div className="d-flex align-items-center">
      {icon}
      <div className="ml-2" style={{ marginLeft: '10px'}}>
        <strong>{title}:</strong> {value || "N/A"}
      </div>
    </div>
  </Col>
);

export default BankDetailsSection;
