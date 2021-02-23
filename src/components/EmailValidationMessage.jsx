import React from 'react';
import * as yup from 'yup';

const schema = yup.string().required().email();

const EmailValidationMessage = ({ email }) => {
  try {
    schema.validateSync(email, { abortEarly: false });
  } catch (e) {
    const errMessage = `${e.message[0].toUpperCase()}${e.message.slice(1)}`;
    return <p className="error">{errMessage}</p>;
  }

  return null;
};

export default EmailValidationMessage;
