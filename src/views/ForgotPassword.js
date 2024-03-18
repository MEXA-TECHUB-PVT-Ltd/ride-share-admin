// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";
import forgotpasswordmain from "@src/assets/images/pages/forgotpassword.png";
// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

import logo from "@src/assets/images/logo/logo.png";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useForgotPasswordMutation } from "../redux/dashboardApi";
import { useState } from "react";
import SmallSpinner from "./components/loaders/SmallSpinner";

import "./common.css"

const ForgotPassword = () => {
  // ** Hooks
  const navigate = useNavigate();
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

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
                style={{ alignSelf: "center", width: "100px", height: "auto" }}
              />
            </div>

            <CardTitle tag="h2" className="fw-bold mb-1">
              Forgot Password?
            </CardTitle>
            <CardText className="mb-2">
              Enter your email and we'll send you OTP to reset your password
            </CardText>
            {error && <Alert color="danger">{error}</Alert>}

            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await forgotPassword({
                    email: values.email,
                    role: "admin",
                  }).unwrap();
                  navigate("/otpverification?email=" + values.email);
                } catch (error) {
                  console.error("Failed to reset password:", error);
                  setError(error.data.message);
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <>
                  <Link
                    className="brand-logo"
                    to="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    {/* <h2 className='brand-text text-primary ms-1'>Require Sign</h2> */}
                  </Link>

                  {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
                  <Form className="auth-login-form mt-2">
                    <div className="mb-1">
                      <Label className="form-label" for="login-email">
                        Email
                      </Label>
                      <Field
                        name="email"
                        id="login-email"
                        placeholder="john@example.com"
                        autoFocus
                        as={Input}
                        type="email"
                      />

                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <Button
                      // color="primary"
                      className="button-color"
                      type="submit"
                      disabled={isSubmitting}
                      block
                    >
                      {isLoading ? <SmallSpinner /> : "SEND OTP"}
                    </Button>

                    <p className="text-center mt-2">
                      <Link to="/login">
                        <ChevronLeft className="rotate-rtl me-25" size={14} />
                        <span className="align-middle">Back to login</span>
                      </Link>
                    </p>
                  </Form>
                </>
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

export default ForgotPassword;
