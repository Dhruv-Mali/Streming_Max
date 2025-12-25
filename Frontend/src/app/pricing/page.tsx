"use client";
import React from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const benefits = [
    "Unlimited HD streaming",
    "Ad-free experience",
    "Watch on all devices",
    "Cancel anytime",
    "Exclusive content access",
    "24/7 customer support",
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            All Access
          </CardTitle>
          <CardDescription className="text-center text-indigo-200">
            Unlimited entertainment, unparalleled experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <span className="text-5xl font-bold">$9.00</span>
            <span className="text-xl text-indigo-200">/month</span>
          </div>
          <Button
            className="w-full bg-white text-indigo-700 hover:bg-indigo-100"
            size="lg"
            onClick={() => {
              router.push("/pay");
            }}
          >
            Unlock Premiere Access
          </Button>
          <div className="mt-6 space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-indigo-300 mr-2" />
                <span className="text-indigo-100">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Badge variant="secondary" className="bg-indigo-300 text-indigo-800">
            Best Value
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
