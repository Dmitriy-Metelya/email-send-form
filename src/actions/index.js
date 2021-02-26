import axios from 'axios';

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
    const emailRequestUrl = 'http://localhost:3000/api/v1/tracking_emails';
    const emailRequestBody = {
      data: {
        type: 'tracking_email',
        attributes: {
          base_url: 'http://example.com',
        },
      },
    };
    const jsonEmailRequestBody = JSON.stringify(emailRequestBody);
    const emailResponse = await axios.post(emailRequestUrl, jsonEmailRequestBody);
    const trackingEmailId = emailResponse.data.data.id;

    const pixelRequestUrl = `http://localhost:3000/api/v1/tracking_emails/${trackingEmailId}/tracking_pixels`;
    const pixelRequestBody = {
      data: {
        type: 'tracking_pixel',
        attributes: {
          webhook_url: 'http://example.com/webhook/url',
        },
      },
    };
    const jsonPixelRequestBody = JSON.stringify(pixelRequestBody);
    const pixelResponse = await axios.post(pixelRequestUrl, jsonPixelRequestBody);
    const pixelUrl = pixelResponse.data.data.attributes.url;
    const pixelHtml = `<img src="${pixelUrl}">`;

    const htmlContent = document.createElement('div');
    htmlContent.innerHTML = `${initEmail.body}${pixelHtml}`;

    const anchors = htmlContent.getElementsByTagName('a');
    if (anchors.length > 0) {
      const urlsRequestUrl = `http://localhost:3000/api/v1/tracking_emails/${trackingEmailId}/trackable_urls/bulk_create`;
      const links = Array.from(anchors).map((anchor) => anchor.href);
      const urlsRequestArray = links.map((link) => ({
        type: 'trackable_url',
        attributes: {
          original_url: link,
          webhook_url: 'http://example.com/webhook/url',
        },
      }));
      const urlsRequestBody = { data: urlsRequestArray };
      const urlsResponse = await axios.post(urlsRequestUrl, urlsRequestBody);
      const trackableUrls = urlsResponse.data.data.map(
        (urlData) => urlData.attributes.trackable_url,
      );
      Array.from(anchors).forEach((anchor, index) => {
        anchor.href = trackableUrls[index];
      });
    }

    dispatch(submitEmail(initEmail));
    dispatch(createTrackingEmail({ ...initEmail, body: htmlContent.innerHTML }));
    dispatch(setSubmissionState('TRACKING_EMAIL_SUCCESS'));
  } catch (e) {
    alert(e);
    dispatch(setSubmissionState('TRACKING_EMAIL_FAILURE'));
  }
};
