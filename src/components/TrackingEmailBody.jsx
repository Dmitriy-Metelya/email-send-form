import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

const TrackingEmailBody = ({ rawHtml }) => {
  const html = useRef();
  useEffect(() => {
    if (html.current) {
      Prism.highlightElement(html.current)
    }
  });

  return rawHtml && (
    <pre>
    <code ref={html} className={`language-markup`}>
      {rawHtml}
    </code>
  </pre>
  );
};

export default TrackingEmailBody;
