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
import { useLocation } from "react-router-dom";
import { User, CreditCard, Calendar, Lock } from "react-feather";
import { imgUrl } from "../baseUrl";
import PreferencesDetailsSection from "./components/dashboard/usersDetail/PreferencesDetailsSection";
import VehiclesDetailsSection from "./components/dashboard/usersDetail/VehiclesDetailsSection";
import BankDetailsSection from "./components/dashboard/usersDetail/BankDetailsSection";
import UserDetailCard from "./components/dashboard/usersDetail/UserDetailCard";
import RideDetailsTable from "./components/dashboard/usersDetail/RideDetailsTable";
import UserProfileHeader from "./components/dashboard/usersDetail/UserProfileHeader";
import { ToastContainer } from "react-toastify";
import { saveAs } from "file-saver";
// import { Parser } from "json2csv";
import { Parser } from "@json2csv/plainjs";
import { unwind, flatten } from "@json2csv/transforms";

const UserDetails = () => {
  const location = useLocation();
  const rowData = location?.state?.user;
  const deleted_users = location?.state?.deleted_users;

  const exportToCSV = () => {
    try {
      const transforms = [
        unwind({
          paths: ["vehicles_details", "ride_details", "bank_details"], // Specify the paths of arrays to be unwound
          blankOut: true, // Set to true if you want to blank out repeated data
        }),
        flatten({
          objects: true,
          arrays: true, // Set to true if you also want to flatten arrays
        }),
      ];

      const opts = { transforms };
      const parser = new Parser(opts);
      const csv = parser.parse(rowData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "UserData.csv");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-details-container p-4">
      {deleted_users && (
        <Button color="primary" onClick={exportToCSV}>
          Export as CSV
        </Button>
      )}
      <UserProfileHeader userData={rowData} />
      <UserDetailCard title="User Information" rowData={rowData} />
      <AboutSection about={rowData?.about} />
      <BankDetailsSection bankDetails={rowData?.bank_details} />
      <VehiclesDetailsSection vehiclesDetails={rowData?.vehicles_details} />
      <PreferencesDetailsSection
        userPreferences={{
          chattiness_preferences: rowData?.chattiness_preferences,
          music_preferences: rowData?.music_preferences,
          pets_preferences: rowData?.pets_preferences,
          smoking_preferences: rowData?.smoking_preferences,
        }}
      />
      <RideDetailsTable rideDetails={rowData?.ride_details} />
      <ToastContainer />
    </div>
  );
};

const AboutSection = ({ about }) => (
  <Card className="mb-3">
    <CardBody>
      <CardTitle tag="h5">About:</CardTitle>
      <p>{about || "No details provided"}</p>
    </CardBody>
  </Card>
);

export default UserDetails;
