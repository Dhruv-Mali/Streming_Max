"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import api from "@/utils/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<StripeError | string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        <AddressElement options={{ mode: "billing" }} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition duration-300"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center justify-center ">
              processing
              <div
                className="mx-5 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>

      {message && (
        <div id="payment-message" className="text-red-500 mt-4 text-center">
          {message.toString()}
        </div>
      )}
    </form>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await api.post("/create-sub", {
          planId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        });
        setClientSecret(response.data.clientSecret.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClientSecret();
  }, []);

  if (isLoading || !clientSecret) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-6">
        <LoadingSpinner />
        <p className="mt-4 text-xl">Loading payment form...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold mb-8">Subscribe Now</h2>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: "night" },
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
