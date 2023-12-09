// ** React Imports
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";
import otpmain from "@src/assets/images/pages/otp.png";
// ** Reactstrap Imports

import logo from "@src/assets/images/logo/logo.png";

import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  // Form,
  Input,
  Button,
  Alert,
} from "reactstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import ReactInputVerificationCode from "react-input-verification-code";
import { useState } from "react";
import { useVerifyOtpMutation } from "../redux/dashboardApi";
import SmallSpinner from "./components/loaders/SmallSpinner";

const Otpverification = () => {
  // ** Hooks
  const navigate = useNavigate();
  const { skin } = useSkin();

  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [error, setError] = useState();

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [otpValue, setOtpValue] = useState("");

  // ** Validation Schema
  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .length(4, "OTP must be exactly 4 digits")
      .required("OTP is required"),
  });

  // ** Function to handle OTP change
  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const [UserEnteredotpValue, setUserEnteredOtpValue] = useState("");

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col
          className="d-none d-lg-flex align-items-center p-5"
          lg="3"
          sm="12"
        ></Col>

        <Col className="d-flex align-items-center px-2 p-lg-5" lg="6" sm="12">
          <Col className="p-4 auth-bg mx-auto" sm="8" md="6" lg="12">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                className="mb-2"
                src={logo}
                alt="Login Cover"
                style={{
                  alignSelf: "center",
                  width: "100px",
                  height: "auto",
                }}
              />
            </div>
            <CardTitle tag="h2" className="fw-bold mb-1">
              OTP Verification
            </CardTitle>
            <CardText className="mb-2">
              Enter your OTP to reset your password
            </CardText>
            {error && <Alert color="danger">{error}</Alert>}
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={OtpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // Handle OTP verification here
                try {
                  await verifyOtp({
                    email: email,
                    otp: values.otp,
                      role: "admin",
                    type: 'forgot_password'
                  }).unwrap();
                  navigate("/setnewpassword?email" + email);
                } catch (error) {
                  console.error("Failed to reset password:", error);
                  setError(error.data.message);
                  setSubmitting(false);
                }
                // navigate("/setnewpassword");
              }}
            >
              {({ errors, touched, handleSubmit, setFieldValue }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <Field name="otp">
                    {({ field }) => (
                      <div className="mb-1">
                        <ReactInputVerificationCode
                          {...field}
                          length={4}
                          onChange={(value) => {
                            setFieldValue("otp", value); // Synchronize with Formik's state
                          }}
                          autoFocus
                          style={{
                            width: "30px", // Adjust the width as needed
                            // height: '30px', // Adjust the height as needed
                            fontSize: "16px", // Adjust the font size as needed
                            margin: "5px", // Adjust the margin as needed
                            borderRadius: "5px", // Adjust the border radius as needed
                            border: "1px solid red", // Adjust the border style and color as needed
                            textAlign: "center", // Center text horizontally
                          }}
                        />
                        {errors.otp && touched.otp && (
                          <div className="invalid-feedback d-block">
                            {errors.otp}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Button color="primary" block type="submit">
                    {isLoading ? <SmallSpinner /> : "Verify"}
                  </Button>
                  <p className="text-center mt-2">
                    <Link to="/forgotpassword">
                      <ChevronLeft className="rotate-rtl me-25" size={14} />
                      <span className="align-middle">
                        Back to Forgot Password
                      </span>
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </Col>
        </Col>

        <Col
          className="d-none d-lg-flex align-items-center p-5"
          lg="3"
          sm="12"
        ></Col>
      </Row>
    </div>
  );
};

export default Otpverification;
