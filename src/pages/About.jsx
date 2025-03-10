import React from 'react';
import Frame from 'react-frame-component';
import IframeContent from '../componnets/IframeContent';

function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Learn more about us.</p>
      <Frame>
        <IframeContent />
      </Frame>
    </div>
  );
}

export default About;
