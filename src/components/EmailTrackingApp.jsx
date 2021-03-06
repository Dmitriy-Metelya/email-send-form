import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import EmailValidationMessage from './EmailInput/EmailValidationMessage.jsx';
import BodyValidationMessage from './EmailBody/BodyValidationMessage.jsx';
import TrackingEmailBody from './EmailBody/TrackingEmailBody.jsx';
import EmailInput from './EmailInput/EmailInput.jsx';
import SubjectInput from './EmailSubject/SubjectInput.jsx';
import * as yup from 'yup';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const props = {
    submissionState: state.submissionState,
    uiState: state.uiState,
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
    schema.validateSync(
      text.split('<p>').join('').split('</p>').join('').split('<br>').join('').trim(),
      { abortEarly: false },
    );
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
  uiState,
  convertedEmail,
  setSubmissionState,
  updateFromText,
  updateToText,
  updateSubjectText,
  updateBody,
  makeTrackingEmail,
}) => {
  const { fromText, toText, subjectText, emailBody } = uiState;

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
      makeTrackingEmail({
        from: fromText,
        to: toText,
        subject: subjectText,
        body: emailBody,
      });
    }
  };

  const formClass = cn({
    'mb-1': submissionState !== 'TRACKING_EMAIL_FILLING',
  });

  return (
    <>
      <h1>Create an email to track</h1>
      <form className={formClass} onSubmit={handleSubmit}>
        <EmailInput
          onChange={fromTextChangeHandle}
          value={fromText}
          labelText="From:"
          inputId="from"
          disabled={submissionState === 'TRACKING_EMAIL_REQUEST'}
        />
        <EmailValidationMessage
          submissionState={submissionState}
          validationError={validateEmail(fromText)}
          className="mb-1"
        />
        <EmailInput
          onChange={toTextChangeHandle}
          value={toText}
          labelText="To:"
          inputId="to"
          disabled={submissionState === 'TRACKING_EMAIL_REQUEST'}
        />
        <EmailValidationMessage
          submissionState={submissionState}
          validationError={validateEmail(toText)}
          className="mb-1"
        />
        <SubjectInput
          onChange={subjectTextChangeHandle}
          value={subjectText}
          disabled={submissionState === 'TRACKING_EMAIL_REQUEST'}
        />
        <ReactQuill
          theme="snow"
          onChange={bodyChangeHandle}
          value={emailBody}
          readOnly={submissionState === 'TRACKING_EMAIL_REQUEST'}
        />
        <BodyValidationMessage
          submissionState={submissionState}
          validationError={validateBody(emailBody)}
        />
        <input
          type="submit"
          className="submit-btn"
          value="Submit"
          disabled={submissionState === 'TRACKING_EMAIL_REQUEST'}
        />
      </form>
      <TrackingEmailBody
        hidden={submissionState !== 'TRACKING_EMAIL_SUCCESS'}
        rawHtml={convertedEmail.body || null}
      />
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Form);
