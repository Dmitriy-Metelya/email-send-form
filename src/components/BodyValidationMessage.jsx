import React from 'react';

const BodyValidationMessage = ({ submissionState, validationError }) => {
  return submissionState === 'TRACKING_EMAIL_FAILURE' && validationError ? <p className="error">{validationError}</p> : null;
};

export default BodyValidationMessage;
