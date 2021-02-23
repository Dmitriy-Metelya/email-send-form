import React from 'react';
import * as yup from 'yup';

const schema = yup.string().required();

const BodyValidationMessage = ({ text }) => {
  try {
    schema.validateSync(text, { abortEarly: false });
  } catch (e) {
    const errMessage = `${e.message[0].toUpperCase()}${e.message.slice(1)}`;
    return <p className="error">{errMessage}</p>;
  }

  return null;
};

export default BodyValidationMessage;
