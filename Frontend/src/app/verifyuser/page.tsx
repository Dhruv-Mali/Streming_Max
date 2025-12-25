"use client";

import { CardComponent } from "@/components/Card";
import { Toast } from "@/components/Toast";
import {
  VerifyUserForm,
  verifyUserFormData,
} from "@/components/VerifyUserForm";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utils/api";

export default function Page() {
  const onSubmit = async (data: verifyUserFormData) => {
    try {
      const response = await api.post("/auth/verify", data);

      if (response.status === 200) {
        Toast({
          variant: "default",
          title: "Account verified",
          description:
            "You have successfully verified your account now you can login and enjoy the app",
        });
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
    <div className="flex justify-center items-center my-auto   px-3">
      <Toaster />
      <CardComponent
        title="Verify your account"
        description="Enter your email and otp to verify your account"
      >
        <VerifyUserForm onSubmit={onSubmit} />
      </CardComponent>
    </div>
  );
}
