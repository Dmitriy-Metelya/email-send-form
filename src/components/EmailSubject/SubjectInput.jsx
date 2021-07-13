import React from 'react';

const SubjectInput = ({ value, onChange, disabled }) => (
  <div className="mb-1 input-wrapper">
    <label htmlFor="subject" className="mr-1">
      Subject:{' '}
    </label>
    <input type="text" id="subject" disabled={disabled} onChange={onChange} value={value} />
  </div>
);

export default SubjectInput;
