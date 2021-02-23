import { combineReducers } from 'redux';

const fromText = (state = '', action) => {
  switch (action.type) {
    case 'FROM_TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'LETTER_SUBMIT': {
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
    case 'LETTER_SUBMIT': {
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
    case 'LETTER_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const letterBody = (state = '', action) => {
  switch (action.type) {
    case 'BODY_UPDATE': {
      return action.payload.letterHtml;
    }
    case 'LETTER_SUBMIT': {
      return '';
    }
    default:
      return state;
  }
};

const initialLetter = (state = {}, action) => {
  switch (action.type) {
    case 'LETTER_SUBMIT': {
      return action.payload.letter;
    }
    default:
      return state;
  }
};

export default combineReducers({
  fromText,
  toText,
  subjectText,
  letterBody,
  initialLetter,
});
