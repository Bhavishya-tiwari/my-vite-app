import React, { useContext, useEffect, useState } from "react";
import { EnvContext, useJsonKeyEditor } from "../App";

function SessionUnGroupped({ subsId }) {
  const { env } = useContext(EnvContext);
  const [data, setData] = useState(null);
  const JsonKeyEditor = useJsonKeyEditor();

  useEffect(() => {
    fetch(`/my-vite-app/data/${env}.json`)
      .then((res) => res.json())
      .then((json) => setData(json.sessionUngroupped));
  }, [env]);

  // Extract siteId and pricingPageId from sessionData.url if possible
  let siteId = null;
  let pricingPageId = null;
  if (data && data.sessionData && data.sessionData.url) {
    const match = data.sessionData.url.match(/sites\/([^/]+)\//);
    if (match) {
      siteId = match[1];
    }
    // Try to extract pricingPageId from data if present
    if (data.pricingpageid) {
      pricingPageId = data.pricingpageid;
    }
  }

  useEffect(() => {
    if (!data || !data.sessionData) return;
    // Always set created_at and expires_at before using sessionData
    data.sessionData.created_at = 1;
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
      <h1 className="text-3xl font-bold">Session-Ungroupped ({env})</h1>
      {/* Show extracted siteId and pricingPageId for debug/demo */}
      {siteId && (
        <div className="mb-2 text-green-700 font-semibold">
          Site ID: <span className="font-mono">{siteId}</span>
        </div>
      )}
      {pricingPageId && (
        <div className="mb-2 text-purple-700 font-semibold">
          Pricing Page ID: <span className="font-mono">{pricingPageId}</span>
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
      {<JsonKeyEditor />}
    </div>
  );
}

// No changes needed: code does not use sessionData.id

export default SessionUnGroupped;
