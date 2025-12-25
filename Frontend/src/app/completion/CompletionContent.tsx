"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useAuthStore } from "@/components/AuthProvider";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CompletionContent() {
  const [status, setStatus] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const searchParams = useSearchParams();
  const updateSession = useAuthStore((state) => state.updateSession);

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const paymentStatus = searchParams.get("redirect_status");

    if (paymentStatus) {
      setStatus(paymentStatus);
    }

    if (clientSecret) {
      stripePromise.then((stripe) => {
        if (stripe) {
          stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
              if (paymentIntent) {
                setPaymentIntent(paymentIntent);
              }
            });
        }
      });
    }
  }, [searchParams]);

  if (!status || !paymentIntent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        Loading...
      </div>
    );
  }

  if (status === "succeeded") {
    updateSession();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        {status === "succeeded" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Thank you for your payment. Your transaction has been completed
              successfully.
            </p>
            {paymentIntent.receipt_email && (
              <p className="text-gray-600 dark:text-gray-400">
                A receipt has been sent to:{" "}
                <strong>{paymentIntent.receipt_email}</strong>
              </p>
            )}
            <div className="mt-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Amount paid:{" "}
                <strong>
                  {(paymentIntent.amount / 100).toFixed(2)}{" "}
                  {paymentIntent.currency.toUpperCase()}
                </strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Payment ID: <strong>{paymentIntent.id}</strong>
              </p>
            </div>
          </>
        )}
        {status === "processing" && (
          <p className="text-yellow-600 dark:text-yellow-400">
            Your payment is processing.
          </p>
        )}
        {status === "requires_payment_method" && (
          <p className="text-red-600 dark:text-red-400">
            Your payment was not successful, please try again.
          </p>
        )}
        <button
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
