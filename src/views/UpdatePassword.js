// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports 
import { ChevronLeft } from "react-feather";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { Formik, Field, ErrorMessage, Form } from 'formik';
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useState } from "react";
import { post } from "../urls/api";

import "@styles/base/pages/page-misc.scss";

const UpdatePassword = () => {

  const { skin } = useSkin();
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate()

  const [emptyfieldalert, setEmptyfieldalert] = useState(false);
  const [oldpassword, setOldpassword] = useState('');

  return (
    <>
      <Row>
        <Col xs="10" md="11">
          <h1 >Update Password</h1>
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

              initialValues={{ password: '', confirmpassword: '' }}
              validate={(values) => {
                const errors = {};

                if (!values.password) {
                  errors.password = 'Password is Required';
                }

                if (!values.confirmpassword) {
                  errors.confirmpassword = 'Confirm Password is Required';
                } else if (values.confirmpassword !== values.password) {
                  errors.confirmpassword = 'Passwords do not match';
                }

                return errors;
              }}

              onSubmit={async (values, { resetForm,setSubmitting }) => {
                console.log(values)

                if (oldpassword.length == 0) {
                  setEmptyfieldalert(true);
                  setTimeout(async () => {
                    setEmptyfieldalert(false);
                  }, 3000)
                } else {
                  setTimeout(() => {
                    toast.success('Password updated Successfully !', {
                        position: toast.POSITION.BOTTOM_RIGHT  
                    }); 
                    resetForm();
                    setOldpassword("");
                }, 1000);
                }

              }}
            >
              {({ isSubmitting }) => (
                <>
                  <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    {/* <h2 className='brand-text text-primary ms-1'>Require Sign</h2> */}
                  </Link>
                  {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
                  <Form className='auth-login-form mt-2' >

                    <div className='mb-1'>
                      <div className='d-flex justify-content-between'>
                        <Label className='form-label' for='login-password'>
                          Old Password
                        </Label>

                      </div>
                      <Field
                        name='oldpassword'
                        as={InputPasswordToggle}
                        className='input-group-merge'
                        value={oldpassword}
                        onChange={(e) => setOldpassword(e.target.value)}
                        id='login-oldpassword' />
                          <div align="left" sx={{ pt: 1, height: "20px" }}>
                                                    {emptyfieldalert ?
                                                        <span style={{ marginTop: "2px", fontSize: "13px", color: "red" }}>
                                                            Old password is required
                                                        </span>
                                                        :
                                                        <></>} 
                                                </div>
                    </div>

                    <div className='mb-1'>
                      <div className='d-flex justify-content-between'>
                        <Label className='form-label' for='login-password'>
                          New Password
                        </Label>

                      </div>
                      <Field
                        name='password'
                        as={InputPasswordToggle}
                        className='input-group-merge'
                        id='login-password' />
                      <ErrorMessage name="password">
                        {msg => <div className="error" style={{ color: 'red' }}>{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <div className='mb-1'>
                      <Label className='form-label' for='login-confirmpassword'>
                        Confirm Password
                      </Label>
                      <Field
                        name='confirmpassword'
                        type='password'
                        as={InputPasswordToggle}
                        className='input-group-merge'
                        id='login-confirmpassword'
                      />
                      <ErrorMessage name='confirmpassword'>
                        {(msg) => <div className='error' style={{ color: 'red' }}>{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <div className='mb-1'>
                      <Button color='primary'
                        type='submit'
                        disabled={isSubmitting}
                        block>
                        Update Password
                      </Button>
                    </div>

                  </Form>

                </>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
<ToastContainer/>
    </>
  );
};

export default UpdatePassword;
