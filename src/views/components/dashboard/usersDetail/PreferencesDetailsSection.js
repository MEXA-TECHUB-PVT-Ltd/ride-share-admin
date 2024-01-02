import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { imgUrl } from '../../../../baseUrl';

const PreferencesDetailsSection = ({ userPreferences }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPreferenceType, setSelectedPreferenceType] = useState(null);
  
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handlePreferenceTypeSelect = (type) => {
    setSelectedPreferenceType(type);
  };

  const getPreferencesToShow = () => {
    return selectedPreferenceType ? userPreferences[selectedPreferenceType] : [];
  };

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Preferences</CardTitle>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {selectedPreferenceType ? selectedPreferenceType : 'Select Preference Type'}
          </DropdownToggle>
          <DropdownMenu>
            {Object.keys(userPreferences).map((type, index) => (
              <DropdownItem key={index} onClick={() => handlePreferenceTypeSelect(type)}>
                {type}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Row>
          {getPreferencesToShow().map((preference, index) => (
            <Col key={index} xs="12" md="6" lg="4" className="mb-3">
              <PreferenceDetail detail={preference} />
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

const PreferenceDetail = ({ detail }) => (
  <div className="d-flex align-items-center mt-2">
    {/* Assuming icons are named based on preference_type */}
    <img
      src={`${imgUrl}${detail?.icon?.file_name}`} // Adjust the path as necessary
      alt={detail?.preference_type}
      style={{ width: "40px", height: "40px", marginRight: "10px" }}
    />
    <div>
      <strong>{detail?.preference_type}:</strong> {detail?.preference_prompt}
    </div>
  </div>
);

export default PreferencesDetailsSection;
