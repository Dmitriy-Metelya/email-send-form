import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import EmailValidationMessage from './EmailValidationMessage.jsx';
import BodyValidationMessage from './BodyValidationMessage.jsx';

const mapStateToProps = (state) => {
  const props = {
    fromText: state.fromText,
    toText: state.toText,
    subjectText: state.subjectText,
    letterBody: state.letterBody,
    initialLetter: state.initialLetter,
  };

  return props;
};

const actionCreators = {
  updateFromText: actions.updateFromText,
  updateToText: actions.updateToText,
  updateSubjectText: actions.updateSubjectText,
  updateBody: actions.updateBody,
  submitLetter: actions.submitLetter,
};

const Form = ({
  updateFromText,
  updateToText,
  updateSubjectText,
  updateBody,
  submitLetter,
  fromText,
  toText,
  subjectText,
  letterBody,
  initialLetter,
}) => {
  const fromTextChangeHandle = (e) => updateFromText(e.target.value);
  const toTextChangeHandle = (e) => updateToText(e.target.value);
  const subjectTextChangeHandle = (e) => updateSubjectText(e.target.value);
  const letterBodyChangeHandle = (body) => updateBody(body);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLetter({ from: fromText, to: toText, subject: subjectText, body: letterBody });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Send your email</h1>
      <div className="mb-1">
        <div className="input-wrapper">
          <label htmlFor="from" className="mr-1">
            From:{' '}
          </label>
          <input type="text" id="from" onChange={fromTextChangeHandle} value={fromText} />
        </div>
        <EmailValidationMessage email={fromText} />
      </div>
      <div className="mb-1">
        <div className="input-wrapper">
          <label htmlFor="to" className="mr-1">
            To:{' '}
          </label>
          <input type="text" id="to" onChange={toTextChangeHandle} value={toText} />
        </div>
        <EmailValidationMessage email={toText} />
      </div>
      <div className="mb-1 input-wrapper">
        <label htmlFor="subject" className="mr-1">
          Subject:{' '}
        </label>
        <input type="text" id="subject" onChange={subjectTextChangeHandle} value={subjectText} />
      </div>
      <ReactQuill
        theme="snow"
        onChange={letterBodyChangeHandle}
        value={letterBody}
      />
      <BodyValidationMessage text={letterBody} />
      <div className="mb-1"></div>
      <input type="submit" className="submit-btn" value="Submit" />
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(Form);
