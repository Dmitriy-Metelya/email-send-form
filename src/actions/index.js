export const updateFromText = (text) => ({
  type: 'FROM_TEXT_UPDATE',
  payload: {
    text,
  },
});

export const updateToText = (text) => ({
  type: 'TO_TEXT_UPDATE',
  payload: {
    text,
  },
});

export const updateSubjectText = (text) => ({
  type: 'SUBJECT_TEXT_UPDATE',
  payload: {
    text,
  },
});

export const updateBody = (letterHtml) => ({
  type: 'BODY_UPDATE',
  payload: {
    letterHtml,
  },
});

export const submitLetter = (letter) => ({
  type: 'LETTER_SUBMIT',
  payload: {
    letter,
  },
});
