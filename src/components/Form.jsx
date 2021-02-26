import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import EmailValidationMessage from './EmailValidationMessage.jsx';
import BodyValidationMessage from './BodyValidationMessage.jsx';
import * as yup from 'yup';

const mapStateToProps = (state) => {
  const props = {
    submissionState: state.submissionState,
    fromText: state.fromText,
    toText: state.toText,
    subjectText: state.subjectText,
    emailBody: state.emailBody,
    initialEmail: state.initialEmail,
    convertedEmail: state.convertedEmail,
  };

  return props;
};

const actionCreators = {
  setSubmissionState: actions.setSubmissionState,
  updateFromText: actions.updateFromText,
  updateToText: actions.updateToText,
  updateSubjectText: actions.updateSubjectText,
  updateBody: actions.updateBody,
  makeTrackingEmail: actions.makeTrackingEmail,
};

const validateEmail = (email) => {
  const schema = yup.string().required().email();

  try {
    schema.validateSync(email.trim(), { abortEarly: false });
  } catch (e) {
    const errMessage = `${e.message[0].toUpperCase()}${e.message.slice(1)}`;
    return errMessage;
  }

  return null;
};

const validateBody = (text) => {
  const schema = yup.string().required();

  try {
    schema.validateSync(text.split('<p>').join('').split('</p>').join('').split('<br>').join('').trim(), { abortEarly: false });
    if (text === '<p><br></p>') {
      throw new Error('This is a required field');
    }
  } catch (e) {
    const errMessage = `${e.message[0].toUpperCase()}${e.message.slice(1)}`;
    return errMessage;
  }

  return null;
};

const Form = ({
  submissionState,
  fromText,
  toText,
  subjectText,
  emailBody,
  initialEmail,
  convertedEmail,
  setSubmissionState,
  updateFromText,
  updateToText,
  updateSubjectText,
  updateBody,
  makeTrackingEmail,
}) => {
  const fromTextChangeHandle = (e) => updateFromText(e.target.value);
  const toTextChangeHandle = (e) => updateToText(e.target.value);
  const subjectTextChangeHandle = (e) => updateSubjectText(e.target.value);
  const bodyChangeHandle = (body) => updateBody(body);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValidationError = validateEmail(fromText);
    const toValidationError = validateEmail(toText);
    const bodyValidationError = validateBody(emailBody);
    if (formValidationError || toValidationError || bodyValidationError) {
      setSubmissionState('TRACKING_EMAIL_FAILURE');
    } else {
      makeTrackingEmail({ from: fromText, to: toText, subject: subjectText, body: emailBody });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Send your email</h1>
      <div className="mb-1">
        <div className="input-wrapper">
          <label htmlFor="from" className="mr-1">
            From:{' '}
          </label>
          <input
            type="text"
            id="from"
            onChange={fromTextChangeHandle}
            value={fromText}
          />
        </div>
        <EmailValidationMessage submissionState={submissionState} validationError={validateEmail(fromText)} />
      </div>
      <div className="mb-1">
        <div className="input-wrapper">
          <label htmlFor="to" className="mr-1">
            To:{' '}
          </label>
          <input type="text" id="to" onChange={toTextChangeHandle} value={toText} />
        </div>
        <EmailValidationMessage submissionState={submissionState} validationError={validateEmail(toText)} />
      </div>
      <div className="mb-1 input-wrapper">
        <label htmlFor="subject" className="mr-1">
          Subject:{' '}
        </label>
        <input type="text" id="subject" onChange={subjectTextChangeHandle} value={subjectText} />
      </div>
      <ReactQuill theme="snow" onChange={bodyChangeHandle} value={emailBody} />
      <BodyValidationMessage submissionState={submissionState} validationError={validateBody(emailBody)} />
      <div className="mb-1"></div>
      <input type="submit" className="submit-btn" value="Submit" />
      <p>{convertedEmail.body}</p>
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(Form);
