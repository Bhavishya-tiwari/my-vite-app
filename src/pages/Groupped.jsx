import React, { useContext, useEffect, useState } from "react";
import { EnvContext } from "../App";
import Pricify from '@chargebee/atomicpricing';

function Groupped() {
  const { env } = useContext(EnvContext);
  const [data, setData] = useState(null);
  const [globals, setGlobals] = useState(null);

  useEffect(() => {
    // Fetch globals and env data in parallel
    Promise.all([
      fetch("/my-vite-app/data/globals.json").then((res) => res.json()),
      fetch(`/my-vite-app/data/${env}.json`).then((res) => res.json()),
    ]).then(([globalsJson, envJson]) => {
      setGlobals(globalsJson);
      setData(envJson.groupped);
    });
  }, [env]);

  useEffect(() => {
    if (!data || !globals) return;
    function initPricify() {
      if (typeof Pricify !== "undefined") {
        Pricify.setVisitor(globals.visitor);
        Pricify.setBillingAddress(globals.billingAddress);
        Pricify.setShippingAddress(globals.shippingAddress);
        Pricify.setSubscriptionAttributes(globals.subscriptionAttributes);
        Pricify.init();
      } else {
        setTimeout(initPricify, 100);
      }
    }
    initPricify();
  }, [data, globals]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Groupped ({env})</h1>
      <div
        id="pricify-hosted-pricing-page"
        data-pricify-site={data?.siteid}
        {...(env === "preprod"
          ? { "data-pricify-host": "https://hosted.devpricify.com" }
          : env === "dev"
          ? { "data-pricify-host": "http://localhost:8764" }
          : {})}
        data-pricify-pricingpage={data?.pricingpageid}
        data-pricify-gtmid={data?.gtmid}
      ></div>
    </div>
  );
}

export default Groupped;
