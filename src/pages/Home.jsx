import React from 'react';

function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Learn more about us.</p>

      {/* Iframe embedding the external zPricing Page */}
      <iframe
        src="https://hosted.atomicpricing.com/sites/01JN5WKGC6GSN9542J6KS3TS7G/pricing/01JN5WKHRJPY5EC0EY7GYPVK01?gtmId=GTM-THKXWQPN"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default About;
