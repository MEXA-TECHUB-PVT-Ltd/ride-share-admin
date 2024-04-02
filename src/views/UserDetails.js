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
import { useLocation, useSearchParams } from "react-router-dom";
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
import { useGetUserWithDetailsQuery } from "../redux/dashboardApi";
import VerificationRequestDetails from "./components/dashboard/usersDetail/VerificationRequestDetails";

const UserDetails = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const userId = searchParams.get("user_id");
  let userData;
  let refetch; // Define refetch here
  if (userId) {
    const { data, refetch: refetchFn } = useGetUserWithDetailsQuery(userId);
    userData = data;
    refetch = refetchFn;
  }
  const rowData = location?.state?.user;
  const deleted_users = location?.state?.deleted_users;

  const profileData = rowData ? rowData : userData?.result;

  console.log(profileData);

  const user_id = rowData?.id || userId;
  const is_verified =
    rowData?.is_verified_driver || profileData?.is_verified_driver;
  console.log(user_id, is_verified);

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
      <UserProfileHeader userData={profileData} />
      <UserDetailCard title="User Information" rowData={profileData} />
      {refetch && (
        <VerificationRequestDetails
          user_id={user_id}
          is_verified={is_verified}
          refetch={refetch}
        />
      )}
      <AboutSection about={profileData?.about} />
      <BankDetailsSection bankDetails={profileData?.bank_details} />
      <VehiclesDetailsSection vehiclesDetails={profileData?.vehicles_details} />
      <PreferencesDetailsSection
        userPreferences={{
          chattiness_preferences: profileData?.chattiness_preferences,
          music_preferences: profileData?.music_preferences,
          pets_preferences: profileData?.pets_preferences,
          smoking_preferences: profileData?.smoking_preferences,
        }}
      />
      <RideDetailsTable user_id={user_id} is_verified={is_verified} />
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
