import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const verifyUserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  otp: z.string().length(6, {
    message: "Please enter a valid otp",
  }),
});

export type verifyUserFormData = FieldValues & z.infer<typeof verifyUserSchema>;

type VerifyUserFormProps = {
  onSubmit: (data: verifyUserFormData) => void;
};

export function VerifyUserForm({ onSubmit }: VerifyUserFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<verifyUserFormData>({
    resolver: zodResolver(verifyUserSchema),
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
          <Label htmlFor="OTP">OTP</Label>
        </div>
        <Controller
          name="otp"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative">
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm">{String(errors.otp.message)}</p>
        )}
      </div>

      <Button type="submit" className="w-full font-semibold text-md">
        Verify
      </Button>
    </form>
  );
}
