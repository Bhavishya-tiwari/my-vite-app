import React from 'react';
import Frame from 'react-frame-component';
import IframeContent from '../componnets/IframeContent';

function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Learn more about us.</p>
      <Frame
        head={
          <>
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l;j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-PTD28SW2');
                `,
              }}
            />
            {/* End Google Tag Manager */}
          </>
        }
        style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
      >
        <IframeContent />
      </Frame>
    </div>
  );
}

export default About;
