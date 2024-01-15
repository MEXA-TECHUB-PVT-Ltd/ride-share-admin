import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { imgUrl } from "../../../../baseUrl";
import user_image from "/dummy_user.png";
import photo from "/photo.png";

const PreferencesDetailsSection = ({ userPreferences }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Preferences</CardTitle>
        {Object.entries(userPreferences).map(
          ([preferenceType, preferences], index) => (
            <React.Fragment key={index}>
              <h4 style={{ fontWeight: "bold" }}>{preferenceType}</h4>
              {preferences && preferences.length > 0 ? (
                <Row>
                  {preferences.map((preference, idx) => (
                    <Col key={idx} xs="12" md="6" lg="4" className="mb-3">
                      <PreferenceDetail detail={preference} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No records found for {preferenceType}.</p> // Display message when no records are available
              )}
            </React.Fragment>
          )
        )}
      </CardBody>
    </Card>
  );
};

const PreferenceDetail = ({ detail }) => (
  <div className="d-flex align-items-center mt-2">
    <img
      src={detail?.icon ? `${imgUrl}${detail?.icon}` : photo}
      alt={photo}
      style={{ width: "40px", height: "40px", marginRight: "10px" }}
    />
    <div>
      <strong>{detail?.preference_type}:</strong> {detail?.preference_prompt}
    </div>
  </div>
);

export default PreferencesDetailsSection;
