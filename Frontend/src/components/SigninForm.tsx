"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

const signinSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type SigninFormData = z.infer<typeof signinSchema>;

type SignupFormProps = {
  onSubmit: (data: SigninFormData) => void;
  loading: boolean;
};

export function SigninForm({ onSubmit, loading }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="text-xs">⚠</span> {String(errors.email.message)}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Link href="#" className="text-xs text-purple-600 hover:text-purple-700 underline underline-offset-2">
            Forgot password?
          </Link>
        </div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="h-11 pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          )}
        />

        {errors.password && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="text-xs">⚠</span> {String(errors.password.message)}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full h-11 font-semibold text-base bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
