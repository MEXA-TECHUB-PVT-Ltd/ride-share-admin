// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  // Form,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import logo from "@src/assets/images/logo/logo.png";
import loginmain from "@src/assets/images/pages/login.png";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import { Formik, Field, ErrorMessage, Form } from "formik";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useState } from "react";
import { post } from "../urls/api";
import { useResetPasswordMutation } from "../redux/dashboardApi";
import SmallSpinner from "./components/loaders/SmallSpinner";

const SetNewPassword = () => {
  const { skin } = useSkin();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
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
            </div>{" "}
            <CardTitle tag="h2" className="fw-bold mb-1">
              Reset Password!
            </CardTitle>
            <CardText className="mb-2">
              Please enter your new password .
            </CardText>
            {error && <Alert color="danger">{error}</Alert>}
            <Formik
              initialValues={{ password: "", confirmpassword: "" }}
              validate={(values) => {
                const errors = {};

                if (!values.password) {
                  errors.password = "Password is Required";
                }

                if (!values.confirmpassword) {
                  errors.confirmpassword = "Confirm Password is Required";
                } else if (values.confirmpassword !== values.password) {
                  errors.confirmpassword = "Passwords do not match";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await resetPassword({
                    email: email,
                    new_password: values.confirmpassword,
                    role: "admin",
                  }).unwrap();
                  navigate("/login");
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
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" for="login-password">
                          Password
                        </Label>
                      </div>
                      <Field
                        name="password"
                        as={InputPasswordToggle}
                        className="input-group-merge"
                        id="login-password"
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="mb-1">
                      <Label className="form-label" for="login-confirmpassword">
                        Confirm Password
                      </Label>
                      <Field
                        name="confirmpassword"
                        type="password"
                        as={InputPasswordToggle}
                        className="input-group-merge"
                        id="login-confirmpassword"
                      />
                      <ErrorMessage name="confirmpassword">
                        {(msg) => (
                          <div className="error" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <Button
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      block
                    >
                      {isLoading ? <SmallSpinner /> : "Reset Password"}
                    </Button>

                    {/* <p className="text-center mt-2">
                      <Link to="/login">
                        <ChevronLeft className="rotate-rtl me-25" size={14} />
                        <span className="align-middle">Back to login</span>
                      </Link>
                    </p> */}
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

export default SetNewPassword;
