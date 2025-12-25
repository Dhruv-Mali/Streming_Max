"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="me@exaple.com"
              required
              autoComplete="email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Forgot your password?
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
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 top-2"
              >
                {showPassword ? <EyeOff /> : <EyeIcon />}
              </button>
            </div>
          )}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">
            {String(errors.password.message)}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full font-semibold text-md"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign in"}
      </Button>
    </form>
  );
}
