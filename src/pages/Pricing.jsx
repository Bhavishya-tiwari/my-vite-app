import Pricify from "@chargebee/atomicpricing";
import { useEffect } from "react";

function Pricing() {
  useEffect(() => {
    Pricify.setVisitor({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-123-456-7890",
      company: "Example Inc.",
    });

    // Set billing address with dummy data
    Pricify.setBillingAddress({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-123-456-7890",
      company: "Example Inc.",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      stateCode: "NY",
      zip: "10001",
      country: "US",
    });

    // Set shipping address with dummy data
    Pricify.setShippingAddress({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-123-456-7890",
      company: "Example Inc.",
      line1: "456 Elm St",
      line2: "Suite 200",
      city: "Los Angeles",
      stateCode: "CA",
      zip: "90002",
      country: "US",
    });

    // Optionally, set subscription attributes with custom fields
    Pricify.setSubscriptionAttributes({
      customFields: {
        cf_CustomField_subs: "My custom Value",
      },
    });

    // Initialize the pricing page
    Pricify.init();
  }, []);

  return (
    <div
      id="pricify-hosted-pricing-page"
      data-pricify-site="01JN5WKGC6GSN9542J6KS3TS7G"
      data-pricify-pricingpage="01JN5WKHRJPY5EC0EY7GYPVK01"
    ></div>
  );
}

export default Pricing;
