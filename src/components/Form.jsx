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
    letterBody: state.letterBody,
    initialLetter: state.initialLetter,
  };

  return props;
};

const actionCreators = {
  setSubmissionState: actions.setSubmissionState,
  updateFromText: actions.updateFromText,
  updateToText: actions.updateToText,
  updateSubjectText: actions.updateSubjectText,
  updateBody: actions.updateBody,
  submitLetter: actions.submitLetter,
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
  letterBody,
  initialLetter,
  setSubmissionState,
  updateFromText,
  updateToText,
  updateSubjectText,
  updateBody,
  submitLetter,
}) => {
  const fromTextChangeHandle = (e) => updateFromText(e.target.value);
  const toTextChangeHandle = (e) => updateToText(e.target.value);
  const subjectTextChangeHandle = (e) => updateSubjectText(e.target.value);
  const letterBodyChangeHandle = (body) => updateBody(body);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValidationError = validateEmail(fromText);
    const toValidationError = validateEmail(toText);
    const bodyValidationError = validateBody(letterBody);
    if (formValidationError || toValidationError || bodyValidationError) {
      setSubmissionState('failed');
    } else {
      submitLetter({ from: fromText, to: toText, subject: subjectText, body: letterBody });
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
        <EmailValidationMessage submissionState={submissionState} error={validateEmail(fromText)} />
      </div>
      <div className="mb-1">
        <div className="input-wrapper">
          <label htmlFor="to" className="mr-1">
            To:{' '}
          </label>
          <input type="text" id="to" onChange={toTextChangeHandle} value={toText} />
        </div>
        <EmailValidationMessage submissionState={submissionState} error={validateEmail(toText)} />
      </div>
      <div className="mb-1 input-wrapper">
        <label htmlFor="subject" className="mr-1">
          Subject:{' '}
        </label>
        <input type="text" id="subject" onChange={subjectTextChangeHandle} value={subjectText} />
      </div>
      <ReactQuill theme="snow" onChange={letterBodyChangeHandle} value={letterBody} />
      <BodyValidationMessage submissionState={submissionState} error={validateBody(letterBody)} />
      <div className="mb-1"></div>
      <input type="submit" className="submit-btn" value="Submit" />
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(Form);
