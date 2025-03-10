import React from 'react';

function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Learn more about us.</p>

      {/* Iframe embedding the external zPricing Page */}
      <iframe
        src="https://bhavishya-tiwari.github.io/Pricing-PageHTML/"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default About;
