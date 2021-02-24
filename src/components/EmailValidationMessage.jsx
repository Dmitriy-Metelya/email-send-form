import React from 'react';

const EmailValidationMessage = ({ submissionState, error }) => {
  return submissionState === 'failed' && error ? (<p className="error">{error}</p>) : null;
};

export default EmailValidationMessage;
