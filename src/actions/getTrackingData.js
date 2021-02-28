import axios from 'axios';

const getTrackingData = async (links) => {
  const trackingData = {};
  const baseUrl = 'http://example.com';
  const webhookUrl = 'http://example.com/webhook/url';
  const mainRequestUrl = 'http://localhost:3000/api/v1/tracking_emails';
  const emailRequestBody = {
    data: {
      type: 'tracking_email',
      attributes: {
        base_url: baseUrl,
      },
    },
  };
  const jsonEmailRequestBody = JSON.stringify(emailRequestBody);
  const emailResponse = await axios.post(mainRequestUrl, jsonEmailRequestBody);
  const trackingEmailId = emailResponse.data.data.id;

  const pixelRequestUrl = [mainRequestUrl, trackingEmailId.toString(), 'tracking_pixels'].join('/');
  const pixelRequestBody = {
    data: {
      type: 'tracking_pixel',
      attributes: {
        webhook_url: webhookUrl,
      },
    },
  };
  const jsonPixelRequestBody = JSON.stringify(pixelRequestBody);
  const pixelResponse = await axios.post(pixelRequestUrl, jsonPixelRequestBody);
  trackingData.pixelUrl = pixelResponse.data.data.attributes.url;

  if (links.length > 0) {
    const urlsRequestUrl = [
      mainRequestUrl,
      trackingEmailId.toString(),
      'trackable_urls/bulk_create',
    ].join('/');
    const urlsRequestArray = links.map((link) => ({
      type: 'trackable_url',
      attributes: {
        original_url: link,
        webhook_url: webhookUrl,
      },
    }));
    const urlsRequestBody = { data: urlsRequestArray };
    const urlsResponse = await axios.post(urlsRequestUrl, urlsRequestBody);
    trackingData.trackableUrls = urlsResponse.data.data.map(
      (urlData) => urlData.attributes.trackable_url,
    );
  } else {
    trackingData.trackableUrls = [];
  }

  return trackingData;
};

export default getTrackingData;
