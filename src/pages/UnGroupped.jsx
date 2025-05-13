import React, { useContext, useEffect, useState } from "react";
import { EnvContext } from "../App";
import Pricify from "@chargebee/atomicpricing";

function UnGroupped() {
  const { env } = useContext(EnvContext);
  const [data, setData] = useState(null);
  const [globals, setGlobals] = useState(null);

  useEffect(() => {
    fetch("/my-vite-app/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json[env]?.ungroupped);
        setGlobals(json.globals);
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
      <h1 className="text-3xl font-bold">UnGroupped ({env})</h1>
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

export default UnGroupped;
