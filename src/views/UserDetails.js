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

const UserDetails = () => {
  const location = useLocation();
  const rowData = location?.state?.user;

  return (
    <div className="user-details-container p-4">
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
      <p>{about}</p>
    </CardBody>
  </Card>
);

export default UserDetails;
