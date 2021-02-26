import { combineReducers } from 'redux';

const submissionState = (state = 'TRACKING_EMAIL_FILLING', action) => {
  switch (action.type) {
    case 'SUBMISSION_STATE_SET': {
      return action.payload.submissionState;
    }
    default:
      return state;
  }
};

const fromText = (state = '', action) => {
  switch (action.type) {
    case 'FROM_TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'EMAIL_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const toText = (state = '', action) => {
  switch (action.type) {
    case 'TO_TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'EMAIL_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const subjectText = (state = '', action) => {
  switch (action.type) {
    case 'SUBJECT_TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'EMAIL_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const emailBody = (state = '', action) => {
  switch (action.type) {
    case 'BODY_UPDATE': {
      return action.payload.emailHtml;
    }
    case 'EMAIL_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const initialEmail = (state = {}, action) => {
  switch (action.type) {
    case 'EMAIL_SUBMIT': {
      return action.payload.email;
    }
    default:
      return state;
  }
};

const convertedEmail = (state = {}, action) => {
  switch (action.type) {
    case 'TRACKING_ EMAIL_CREATE': {
      return action.payload.email;
    }
    default:
      return state;
  }
};

export default combineReducers({
  submissionState,
  fromText,
  toText,
  subjectText,
  emailBody,
  initialEmail,
  convertedEmail,
});
