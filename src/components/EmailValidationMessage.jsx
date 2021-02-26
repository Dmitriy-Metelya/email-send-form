import React from 'react';

const EmailValidationMessage = ({ submissionState, validationError }) => (
    <div className="mb-1">
      {submissionState === 'TRACKING_EMAIL_FAILURE' && validationError ? (<p className="error">{validationError}</p>) : null}
    </div>
  );

export default EmailValidationMessage;
