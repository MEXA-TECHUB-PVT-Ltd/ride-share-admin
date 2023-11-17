// ** React Imports
import { Link, useNavigate } from "react-router-dom";

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
    Form,
    Input,
    Button,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import ReactInputVerificationCode from "react-input-verification-code";
import { useState } from "react";

const Otpverification = () => {
    // ** Hooks
    const navigate = useNavigate();
    const { skin } = useSkin();

    const [UserEnteredotpValue, setUserEnteredOtpValue] = useState('')

    return (
        <div className="auth-wrapper auth-cover">
            <Row className="auth-inner m-0">
                <Col className="d-none d-lg-flex align-items-center p-5" lg="3" sm="12">

                </Col>

                <Col
                    className="d-flex align-items-center px-2 p-lg-5"
                    lg="6"
                    sm="12"
                >
                    <Col className="p-4 auth-bg mx-auto" sm="8" md="6" lg="12">

                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <img className="mb-2" src={logo} alt="Login Cover" style={{ alignSelf: "center", width: '100px', height: 'auto' }} />
                        </div>

                        <CardTitle tag="h2" className="fw-bold mb-1">
                            OTP Verification?
                        </CardTitle>
                        <CardText className="mb-2">
                            Enter your otp to reset your
                            password
                        </CardText>

                        <>
                            <Form className='auth-login-form mt-2' >
                                <div className=' mb-1'>
                                    <Label className='form-label' for='login-email'>
                                        OTP
                                    </Label>
                                    <ReactInputVerificationCode
                                        placeholder=''
                                        value={UserEnteredotpValue}
                                        length={6}
                                        name='otp'
                                        onChange={(e) => setUserEnteredOtpValue(e)}
                                        autoFocus
                                        style={{
                                            width: '30px', // Adjust the width as needed
                                            // height: '30px', // Adjust the height as needed
                                            fontSize: '16px', // Adjust the font size as needed
                                            margin: '5px', // Adjust the margin as needed
                                            borderRadius: '5px', // Adjust the border radius as needed
                                            border: '1px solid red', // Adjust the border style and color as needed
                                            textAlign: 'center', // Center text horizontally
                                        }}
                                    />

                                </div>

                                <Button color='primary' block onClick={() => navigate("/setnewpassword")}>
                                    Verify
                                </Button>

                                <p className="text-center mt-2">
                                    <Link to="/forgotpassword">
                                        <ChevronLeft className="rotate-rtl me-25" size={14} />
                                        <span className="align-middle">Back to Forget Password </span>
                                    </Link>
                                </p>

                            </Form>

                        </>

                    </Col>
                </Col>

                <Col className="d-none d-lg-flex align-items-center p-5" lg="3" sm="12">

                </Col>

            </Row>
        </div>
    );
};

export default Otpverification;
