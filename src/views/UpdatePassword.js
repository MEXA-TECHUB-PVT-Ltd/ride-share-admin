import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, Label, Button } from "reactstrap";
import InputPasswordToggle from "../@core/components/input-password-toggle"; // Assuming this is a custom component
import { ToastContainer } from "react-toastify";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [updatePassword] = useUpdatePasswordMutation();

  const admin = JSON.parse(localStorage.getItem("updatedResult"));
  const email = admin ? admin.email : "";

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
          <Col className="px-xl-2 mx-auto" sm="8" md="12" lg="12">
            <Formik
              initialValues={{
                oldpassword: "",
                password: "",
                confirmpassword: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.oldpassword) {
                  errors.oldpassword = "Old password is required";
                }
                if (!values.password) {
                  errors.password = "New password is required";
                }
                if (!values.confirmpassword) {
                  errors.confirmpassword = "Confirm password is required";
                } else if (values.confirmpassword !== values.password) {
                  errors.confirmpassword = "Passwords do not match";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
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
                  navigate("/dashboard/default");
                } catch (error) {
                  console.error("Failed :", error);
                  // handle error, show error message
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="auth-login-form mt-2">
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
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};

export default UpdatePassword;
