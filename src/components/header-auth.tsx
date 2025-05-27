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
        className="flex items-center w-full  gap-3"
      >
        <LogOut className="w-5 h-5" />
        {isPending ? "logging out..." : "Log out"}
      </Button>
    </form>
  );
}
