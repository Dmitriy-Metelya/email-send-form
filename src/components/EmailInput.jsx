import React from 'react';

const EmailInput = ({ value, onChange, inputId, disabled }) => (
  <div>
    <div className="input-wrapper">
      <label htmlFor={inputId} className="mr-1">
        From:{' '}
      </label>
      <input disabled={disabled} type="text" id={inputId} onChange={onChange} value={value} />
    </div>
  </div>
);

export default EmailInput;
