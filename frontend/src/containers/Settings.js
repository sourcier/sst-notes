import React, { useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { onError } from "../lib/errorLib";
import config from "../config";

export default function Settings() {
  const stripePromise = loadStripe(config.STRIPE_KEY);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details,
    });
  }

  return <div className="Settings"></div>;
}
