import React, { useContext, useEffect, useState } from "react";
import { EnvContext } from "../App";

function SessionGroupped({ subsId }) {
  const { env } = useContext(EnvContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/my-vite-app/data.json")
      .then((res) => res.json())
      .then((json) => setData(json[env]?.sessionGroupped));
  }, [env]);

  // Extract siteId from sessionData.url
  let siteId = null;
  if (data && data.sessionData && data.sessionData.url) {
    const match = data.sessionData.url.match(/sites\/([^/]+)\//);
    if (match) {
      siteId = match[1];
    }
  }

  useEffect(() => {
    if (!data || !data.sessionData) return;
    // Always set expires_at before using sessionData
    data.sessionData.expires_at = 9796789093;
    function openPricing() {
      if (window.Pricify) {
        window.Pricify.openPricingPage({
          pricingPage: data.sessionData,
        });
      } else {
        setTimeout(openPricing, 100);
      }
    }
    openPricing();
    // eslint-disable-next-line
  }, [data]);

  // Logic for data-pricify-host (same as Groupped.jsx)
  let pricifyHostProps = {};
  if (env === "preprod") {
    pricifyHostProps["data-pricify-host"] = "https://hosted.devpricify.com";
  } else if (env === "dev") {
    pricifyHostProps["data-pricify-host"] = "http://localhost:8764";
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Session-Groupped ({env})</h1>
      {/* Show extracted siteId for debug/demo */}
      {siteId && (
        <div className="mb-2 text-green-700 font-semibold">
          Site ID: <span className="font-mono">{siteId}</span>
        </div>
      )}
      {subsId && (
        <div className="mb-4 text-blue-700 font-semibold">
          Subscription ID: <span className="font-mono">{subsId}</span>
        </div>
      )}
      <div
        id="pricify-hosted-pricing-page"
        {...pricifyHostProps}
        data-pricify-gtmid={data?.gtmid}
        data-pricify-integrationtype="api"
        style={{ minHeight: 400 }}
      ></div>
    </div>
  );
}

export default SessionGroupped;
