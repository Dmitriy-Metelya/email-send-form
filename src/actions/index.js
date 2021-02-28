// eslint-disable-next-line import/extensions
import getTrackingData from './getTrackingData.js';

export const setSubmissionState = (submissionState) => ({
  type: 'SUBMISSION_STATE_SET',
  payload: {
    submissionState,
  },
});

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

export const updateBody = (emailHtml) => ({
  type: 'BODY_UPDATE',
  payload: {
    emailHtml,
  },
});

export const submitEmail = (email) => ({
  type: 'EMAIL_SUBMIT',
  payload: {
    email,
  },
});

export const createTrackingEmail = (email) => ({
  type: 'TRACKING_ EMAIL_CREATE',
  payload: {
    email,
  },
});

export const makeTrackingEmail = (initEmail) => async (dispatch) => {
  dispatch(setSubmissionState('TRACKING_EMAIL_REQUEST'));

  try {
    const htmlContent = document.createElement('div');
    htmlContent.innerHTML = initEmail.body;
    const anchors = htmlContent.getElementsByTagName('a');
    const links = Array.from(anchors).map((anchor) => anchor.href);

    const trackingData = await getTrackingData(links);
    const pixelHtml = `<img src="${trackingData.pixelUrl}">`;
    htmlContent.innerHTML = `${htmlContent.innerHTML}${pixelHtml}`;
    Array.from(anchors).forEach((anchor, index) => {
      // eslint-disable-next-line no-param-reassign
      anchor.href = trackingData.trackableUrls[index];
    });

    dispatch(submitEmail(initEmail));
    dispatch(createTrackingEmail({ ...initEmail, body: htmlContent.innerHTML }));
    dispatch(setSubmissionState('TRACKING_EMAIL_SUCCESS'));
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
    dispatch(setSubmissionState('TRACKING_EMAIL_FAILURE'));
  }
};
