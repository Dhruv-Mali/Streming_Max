"use client";

import { CardComponent } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { SignupForm, SignupFormData } from "@/components/SignupForm";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utils/api";
import Link from "next/link";

export default function Page() {
  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await api.post("/auth/signup", data);
      if (response.status === 201) {
        Toast({
          variant: "default",
          title: "Success",
          description: "Account created successfully.",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      Toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-auto  px-3">
        <Toaster />
        <CardComponent
          title="Signup"
          description="Enter your name and email and password below to create to your account"
        >
          <SignupForm onSubmit={onSubmit} />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="signin" className="underline">
              Log in
            </Link>
          </div>
        </CardComponent>
      </div>
    </>
  );
}
