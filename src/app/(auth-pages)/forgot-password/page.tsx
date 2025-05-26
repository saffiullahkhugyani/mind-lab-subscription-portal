import { forgotPasswordAction } from "@/src/app/(auth-pages)/actions/actions";
import { FormMessage, Message } from "@/src/components/form-message";
import { SubmitButton } from "@/src/components/submit-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="w-[400px] mx-auto max-w-sm">
        <form className=" flex flex-col w-full text-foreground">
          <CardHeader>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-sm text-secondary-foreground">
              Already have an account?{" "}
              <Link className="text-primary underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 [&>input]:mb-3 ">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <SubmitButton formAction={forgotPasswordAction}>
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </CardContent>
        </form>
        {/* <SmtpMessage /> */}
      </Card>
    </section>
  );
}
