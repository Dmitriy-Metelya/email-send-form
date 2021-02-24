import React from 'react';

const BodyValidationMessage = ({ submissionState, error }) => {
  return submissionState === 'failed' && error ? <p className="error">{error}</p> : null;
};

export default BodyValidationMessage;
