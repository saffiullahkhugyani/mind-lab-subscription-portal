"use client";
import { signInAction } from "@/app/(auth-pages)/actions/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Default empty message
const emptyMessage: Message = { message: "" };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const searchParam = useSearchParams();

  const success = searchParam.get("success");
  const error = searchParam.get("error");
  const messageParam = searchParam.get("message");

  const message: Message =
    success !== null
      ? { success }
      : error !== null
        ? { error }
        : messageParam !== null
          ? { message: messageParam }
          : emptyMessage;

  console.log(message);

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="w-[400px] mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="flex text-2xl justify-center">
            Admin Sign in
          </CardTitle>
          <CardDescription className="flex justify-center">
            Enter your details to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                {" "}
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </span>
              </div>
              <Link
                className=" flex text-xs text-foreground underline justify-end"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
              <FormMessage message={message} />
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
