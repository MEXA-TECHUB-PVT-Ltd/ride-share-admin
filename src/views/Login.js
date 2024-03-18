// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

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
import './common.css';

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import { Formik, Field, ErrorMessage, Form } from "formik";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useState } from "react";
import { post } from "../urls/api";
import { useSignInMutation } from "../redux/dashboardApi";
import SmallSpinner from "./components/loaders/SmallSpinner";

const Login = () => {
  const { skin } = useSkin();
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [signIn, { isLoading }] = useSignInMutation();

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
              Welcome to Ride Share!
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account .
            </CardText>
            {error && <Alert color="danger">{error}</Alert>}
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                } else if (!values.password) {
                  errors.password = "Password is Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const postData = {
                  email: values.email,
                  password: values.password,
                  device_id: "123456",
                  type: "email",
                  role: "admin",
                };

                try {
                  const response = await signIn(postData).unwrap();
                  localStorage.setItem(
                    "admin",
                    JSON.stringify(response?.result)
                  );
                  navigate("/dashbaord/default");
                } catch (error) {
                  console.error("Failed :", error);
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
                    <div className="mb-1">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" for="login-password">
                          Password
                        </Label>
                      </div>
                      <Field
                        name="password"
                        as={InputPasswordToggle}
                        // value={password}
                        // onChange={e => setPassword(e.target.value)}
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
                      {/* <ErrorMessage name="password" component={Error} /> */}
                    </div>
                    <div className="form-check mb-1 d-flex justify-content-between">
                      <div>
                        {/* <Input
                          value={remember}
                          onChange={e => setRemember(e.target.value)}
                          type='checkbox' id='remember-me' />
                        <Label className='form-check-label' for='remember-me'>
                          Remember Me
                        </Label> */}
                      </div>
                      <Link to="/forgotpassword">
                        <small>Forget Password?</small>
                      </Link>
                    </div>
                    <Button
                      // color="primary"
                      className="button-color"
                      type="submit"
                      disabled={isSubmitting}
                      block
                      style={{ backgroundColor: "#ffd300 !important" }}
                    >
                      {isLoading ? <SmallSpinner /> : "Sign in"}
                    </Button>
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

export default Login;
