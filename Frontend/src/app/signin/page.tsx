"use client";
import { CardComponent } from "@/components/Card";
import { SigninForm, SigninFormData } from "@/components/SigninForm";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/AuthProvider";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SigninFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      router.push("/profile");
    } catch (error) {
      // Error is already handled in the signIn function
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <Toaster />
      <div className="w-full max-w-md signin-fade-up">
        <CardComponent
          title="Welcome Back"
          description="Sign in to continue your streaming journey"
        >
          <SigninForm onSubmit={onSubmit} loading={loading} />
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
            <Link href="signup" className="font-semibold text-purple-600 hover:text-purple-700 underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardComponent>
      </div>
    </div>
  );
}
