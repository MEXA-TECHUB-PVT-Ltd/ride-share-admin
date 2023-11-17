
import { } from "@utils";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";
// ** Styles
import "@styles/base/pages/page-misc.scss";

const PrivacyPolicy = () => {


  return (
    <>
      <Row>
        <Col xs="12" md="12">
          <h1 >Privacy Policy</h1>
        </Col>

        <Col xs={12}>
          <div sx={{ height: "auto", display: "flex", justifyContent: "start", alignContent: "start" }} >
            <p className="mt-2 mb-2" style={{ letterSpacing: "1px", fontWeight: "" }} align="left" lineHeight="25px" >
              <span style={{ fontWeight: "normal" }}>
                At mtechub llc, accessible from https://mtechub.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by mtechub llc and how we use it.
                <br />
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                <br />
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in mtechub llc. This policy is not applicable to any information collected offline or via channels other than this website.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Consent</span>
                <br />
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Information we collect</span>
                <br />
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                <br />
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                <br />
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>How we use your information</span>
                <br />
                We use the information we collect in various ways, including to:
                <br />
                <ul>
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Log Files</span>
                <br />
                mtechub llc follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Cookies and Web Beacons</span>
                <br />
                Like any other website, mtechub llc uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Advertising Partners Privacy Policies</span>
                <br />
                You may consult this list to find the Privacy Policy for each of the advertising partners of mtechub llc.
                <br />
                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on mtechub llc, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                <br />
                Note that mtechub llc has no access to or control over these cookies that are used by third-party advertisers.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>Third Party Privacy Policies</span>
                <br />
                mtechub llc's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                <br />
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                <br />
                <br/><span style={{ fontWeight: 600, fontSize: "18px" ,marginTop:"10px"}}>CCPA Privacy Rights (Do Not Sell My Personal Information)</span>
                <br />
                Under the CCPA, among other rights, California consumers have the right to:
                <br />
                Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                <br />
                Request that a business delete any personal data about the consumer that a business has collected.
                <br />
                Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
                <br />
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default PrivacyPolicy;
