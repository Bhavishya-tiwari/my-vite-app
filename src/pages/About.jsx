import React from 'react';
import Frame from 'react-frame-component';
import IframeContent from '../componnets/IframeContent';

function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Learn more about us.</p>

      <Frame head={
        <>
          {/* GTM Script */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXX');
            `
          }} />

          {/* GTM NoScript for Fallback */}
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-PTD28SW2" 
              height="0" width="0" style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
          </noscript>
        </>
      }>
        <IframeContent />
      </Frame>
    </div>
  );
}

export default About;
