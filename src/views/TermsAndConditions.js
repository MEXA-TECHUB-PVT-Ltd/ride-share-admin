import React from "react";
import { Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import "@styles/base/pages/page-misc.scss";

const TermsAndConditions = () => {
  return (
    <>
      <Row>
        <Col xs="12" md="12">
          <h1>Terms & Conditions</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CardTitle tag="h2">
                Terms and Conditions for Ride Share App
              </CardTitle>
              <CardText>
                <strong>Effective Date: 28/12/2023</strong>
              </CardText>

              <CardTitle tag="h3">Acceptance of Terms</CardTitle>
              <CardText>
                By accessing or using Ride Share App (the "App"), you agree to
                comply with and be bound by these Terms and Conditions. If you
                do not agree with any part of these terms, please do not use the
                App.
              </CardText>

              <CardTitle tag="h3">User Eligibility</CardTitle>
              <CardText>
                You must be at least 18 years old to use the App. By using the
                App, you confirm that you are 18 years of age or older.
              </CardText>

              <CardTitle tag="h3">User Account</CardTitle>
              <CardText>
                <strong>3.1 Registration:</strong> To use certain features of
                the App, you may need to create an account. You agree to provide
                accurate, current, and complete information during the
                registration process.
              </CardText>
              <CardText>
                <strong>3.2 Account Security:</strong> You are responsible for
                maintaining the confidentiality of your account login
                information and are fully responsible for all activities that
                occur under your account.
              </CardText>

              <CardTitle tag="h3">User Conduct</CardTitle>
              <CardText>
                By using the App, you agree:
                <ul>
                  <li>
                    <strong>4.1 Lawful Use:</strong> To use the App in
                    compliance with all applicable laws, regulations, and these
                    Terms and Conditions.
                  </li>
                  <li>
                    <strong>4.2 Respect for Others:</strong> Not to engage in
                    any conduct that is harmful, offensive, or violates the
                    rights of others.
                  </li>
                  <li>
                    <strong>4.3 No Interference:</strong> Not to interfere with
                    the functionality of the App or the experience of other
                    users.
                  </li>
                </ul>
              </CardText>

              <CardTitle tag="h3">
                Ride Sharing and Community Guidelines
              </CardTitle>
              <CardText>
                <strong>5.1 Safety First:</strong> Users must prioritize safety
                and adhere to traffic laws and regulations during rides.
                <strong>5.2 Community Respect:</strong> Users are expected to
                treat each other with respect and courtesy, both in
                communication and during ride-sharing.
                <strong>5.3 Trust System:</strong> The App incorporates a rating
                and review system to foster a community-driven trust
                environment. Users are encouraged to provide honest feedback.
              </CardText>

              <CardTitle tag="h3">Intellectual Property</CardTitle>
              <CardText>
                The App and its content, including but not limited to text,
                graphics, logos, and software, are the property of MTechub and
                are protected by copyright and other intellectual property laws.
              </CardText>

              <CardTitle tag="h3">Limitation of Liability</CardTitle>
              <CardText>
                To the fullest extent permitted by applicable law, Mtechub shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues.
              </CardText>

              <CardTitle tag="h3">Termination</CardTitle>
              <CardText>
                M Techub reserves the right to terminate or suspend your access
                to the App, without notice, for any reason, including a breach
                of these Terms and Conditions.
              </CardText>

              <CardTitle tag="h3">Changes to Terms and Conditions</CardTitle>
              <CardText>
                MTechub may update these Terms and Conditions from time to time.
                The most current version will be available on the App, and your
                continued use constitutes acceptance of the updated terms.
              </CardText>

              <CardTitle tag="h3">Governing Law</CardTitle>
              <CardText>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of [Your Jurisdiction], without regard
                to its conflict of law principles.
              </CardText>

              <CardTitle tag="h3">Contact Us</CardTitle>
              <CardText>
                If you have any questions or concerns about these Terms and
                Conditions, please contact us at
              </CardText>

              <CardText>
                By using the App, you agree to the terms outlined in these Terms
                and Conditions. Thank you for choosing Ride Share.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TermsAndConditions;
