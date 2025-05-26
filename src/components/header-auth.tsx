"use client";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/(auth-pages)/actions/actions";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <form action={onSubmit}>
      <Button
        type="submit"
        disabled={isPending}
        className="flex justify-start w-full font-bold"
      >
        <LogOut className="mr-5" />
        {isPending ? "logging out..." : "Log out"}
      </Button>
    </form>
  );
}
