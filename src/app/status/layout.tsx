import { readUserSession } from "@/lib/actions/actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect("/sign-in");
  }
  return <div>{children}</div>;
}
