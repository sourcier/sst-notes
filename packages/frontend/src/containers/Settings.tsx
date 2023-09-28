import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import config from "../config";
import { onError } from "../lib/errorLib";
import { BillingType } from "../types/billing";

const stripePromise = loadStripe(config.STRIPE_KEY);

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details: BillingType) {
    return API.post("notes", "/billing", {
      body: details,
    });
  }

  return <div className="Settings"></div>;
}
