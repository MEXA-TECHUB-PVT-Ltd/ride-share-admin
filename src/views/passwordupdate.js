// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
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

import "@styles/base/pages/page-misc.scss";
import { useUpdatePasswordMutation } from "../redux/dashboardApi";
const PasswordUpdate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [updatePassword] = useUpdatePasswordMutation();

  const admin = JSON.parse(localStorage.getItem("admin")) || [];
  const email = admin ? admin?.updatedResult?.email : "";
  return (
    <>
      <Row>
        <Col xs="10" md="11">
          <h1>Update Password</h1>
        </Col>
      </Row>

      <Row className="auth-inner m-0">
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="12"
          sm="12"
        >
          <Col lg="3" sm="2">
            {" "}
          </Col>

          <Col className="px-xl-2 mx-auto mt-2" sm="8" md="8" lg="6">
            <Formik
              initialValues={{
                oldpassword: "",
                password: "",
                confirmpassword: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.oldpassword) {
                  errors.oldpassword = "Old Password is Required";
                }
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
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                console.log(values);

                //   if (oldpassword.length == 0) {
                //     setEmptyfieldalert(true);
                //     setTimeout(async () => {
                //       setEmptyfieldalert(false);
                //     }, 3000);
                //   } else {
                //     setTimeout(() => {
                //       toast.success("Password updated Successfully !", {
                //         position: toast.POSITION.BOTTOM_RIGHT,
                //       });
                //       resetForm();
                //       setOldpassword("");
                //     }, 1000);
                //   }
                const postData = {
                  email: email,
                  old_password: values.oldpassword,
                  new_password: values.password,
                  role: "admin",
                };

                try {
                  const response = await updatePassword(postData).unwrap();
                  localStorage.setItem(
                    "admin",
                    JSON.stringify(response?.result)
                  );
                  setTimeout(() => {
                    toast.success("Password updated Successfully !", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resetForm();
                  }, 1000);
                  navigate("/dashbaord/default");
                } catch (error) {
                  console.error("Failed :", error);
                  setError(error.data.message);
                  // handle error, show error message
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
                    {error && (
                      <div className="error" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                    <div className="mb-1">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" for="login-password">
                          Old Password
                        </Label>
                      </div>
                      <Field
                        name="oldpassword"
                        as={InputPasswordToggle}
                        className="input-group-merge"
                        id="login-password"
                      />
                      <ErrorMessage name="oldpassword">
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
                          New Password
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

                    <div className="mb-1">
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        block
                      >
                        Update Password
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </Col>

          <Col lg="3" sm="2">
            {" "}
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};
export default PasswordUpdate;
