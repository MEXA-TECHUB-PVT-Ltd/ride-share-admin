import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const PrivacyPolicy = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col md="12">
          <Card>
            <CardBody>
              <CardTitle tag="h1">Privacy Policy for Ride Share App</CardTitle>
              <CardText>
                <strong>Effective Date: 28/12/2023</strong>
              </CardText>

              <CardTitle tag="h2">Introduction</CardTitle>
              <CardText>
                Welcome to the Ride Share App (the "App"). This Privacy Policy
                is designed to help you understand how we collect, use, share,
                and safeguard your personal information. By using the App, you
                agree to the terms outlined in this Privacy Policy.
              </CardText>

              <CardTitle tag="h2">Information We Collect</CardTitle>
              <CardText>
                <strong>User-Provided Information:</strong> We collect
                information that you provide when using the App, including but
                not limited to:
                <ul>
                  <li>
                    Personal information: Name, email address, phone number, and
                    profile picture.
                  </li>
                  <li>
                    Ride details: Starting location, destination, date, time,
                    and route preferences.
                  </li>
                  <li>
                    Payment information: Credit card details, billing address.
                  </li>
                </ul>
                <strong>Automatically Collected Information:</strong> We may
                collect information automatically as you use the App, such as:
                <ul>
                  <li>
                    Device information: Device type, operating system, and
                    unique device identifiers.
                  </li>
                  <li>
                    Usage data: App features used, interactions, and performance
                    data.
                  </li>
                </ul>
              </CardText>

              <CardTitle tag="h2">How We Use Your Information</CardTitle>
              <CardText>
                We use the collected information for the following purposes:
                <ul>
                  <li>Facilitating ride matches based on user preferences.</li>
                  <li>Enabling secure payment processing.</li>
                  <li>Providing customer support and resolving issues.</li>
                  <li>Improving and optimizing the App's performance.</li>
                  <li>
                    Ensuring compliance with legal and regulatory requirements.
                  </li>
                </ul>
              </CardText>

              <CardTitle tag="h2">Sharing Your Information</CardTitle>
              <CardText>
                We may share your information with the following parties:
                <ul>
                  <li>
                    Other Users: To facilitate ride-sharing, your name, profile
                    picture, and ride details may be shared with other users
                    participating in the same ride.
                  </li>
                  <li>
                    Service Providers: Third-party service providers may have
                    access to your information to perform services on our
                    behalf, such as payment processing and data analytics.
                  </li>
                  <li>
                    Legal Compliance: We may share information when required by
                    law or to protect our rights, users, and the public.
                  </li>
                </ul>
              </CardText>

              <CardTitle tag="h2">Community-Driven Trust System</CardTitle>
              <CardText>
                The App incorporates a rating and review system to foster a
                community-driven trust environment. Users can rate and review
                each other based on their ride experiences.
              </CardText>

              <CardTitle tag="h2">Security Measures</CardTitle>
              <CardText>
                We implement industry-standard security measures to protect your
                information from unauthorized access, disclosure, alteration,
                and destruction. However, no method of transmission over the
                Internet or electronic storage is entirely secure; therefore, we
                cannot guarantee absolute security.
              </CardText>

              <CardTitle tag="h2">Communication and Marketing</CardTitle>
              <CardText>
                By using the App, you agree to receive communication-related to
                your rides, account updates, and marketing materials. You can
                opt out of marketing communications at any time.
              </CardText>

              <CardTitle tag="h2">Children's Privacy</CardTitle>
              <CardText>
                The App is not intended for users under the age of 18. We do not
                knowingly collect personal information from children. If you
                believe that a child has provided us with their information,
                please contact us.
              </CardText>

              <CardTitle tag="h2">Changes to This Privacy Policy</CardTitle>
              <CardText>
                We may update this Privacy Policy to reflect changes in our
                practices. We will notify you of any material changes through
                the App or other means. Your continued use of the App after such
                modifications constitutes acceptance of the updated Privacy
                Policy.
              </CardText>

              <CardTitle tag="h2">Contact Us</CardTitle>
              <CardText>
                If you have questions or concerns about this Privacy Policy,
                please contact us.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Row className="justify-content-center mt-4">
        <Col md="8">
          <Card>
            <CardBody>
              <CardTitle tag="h1">Insurance Content</CardTitle>

              <CardTitle tag="h2">Your Well-being Matters Most</CardTitle>
              <CardText>
                At the Rideshare App, your safety is paramount. We recognize the
                significance of ensuring a worry-free ride-sharing experience.
                To add an extra layer of security and bolster your confidence,
                we provide the option for additional insurance coverage. Your
                peace of mind is our commitment.
              </CardText>

              <CardTitle tag="h2">Empowering Your Choices</CardTitle>
              <CardText>
                We believe in empowering you with choices. The decision to opt
                for insurance is yours, giving you control over the level of
                protection you desire during your ride-sharing experiences.
              </CardText>

              <CardTitle tag="h2">Ready to Enhance Your Safety?</CardTitle>
              <CardText>
                If you are interested, click the button below to send us an
                email with your insurance request. Our team will assist you
                promptly.
              </CardText>
              <Button color="primary">
                Request Insurance
              </Button>
            </CardBody>
          </Card>
        </Col> */}
      {/* </Row> */}
    </>
  );
};

export default PrivacyPolicy;
