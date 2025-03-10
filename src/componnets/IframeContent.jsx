import React, { useEffect } from 'react';

function IframeContent() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'iframeLoaded',
      iframe: 'IframeContent',
    });
    console.log('GTM event pushed from IframeContent');
  }, []);

  const handleButtonClick = () => {
    window.dataLayer.push({ event: 'iframeButtonClick', buttonText: 'Get Started' });
    console.log('Button clicked inside iframe, event pushed to dataLayer');
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-6 bg-yellow-100 text-gray-800"
      style={{ backgroundColor: "#FFF9C4" }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border border-yellow-300">
        <h2 className="text-2xl font-bold text-yellow-700">Welcome to Our Service</h2>
        <p className="text-gray-600 my-4">Discover amazing features and boost your productivity.</p>
        <button 
          onClick={handleButtonClick} 
          className="bg-yellow-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Get Started 🚀
        </button>
      </div>
    </div>
  );
}

export default IframeContent;
