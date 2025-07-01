"use client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./nav-bar/app-sidebar";

interface LayoutShellProps {
  user: User;
  children: React.ReactNode;
}

export default function LayoutShell({ user, children }: LayoutShellProps) {
  const pathName = usePathname();

  const noSideBarRoutes = ["/protected/reset-password"];

  const hideSideBar = noSideBarRoutes.includes(pathName);

  console.log(pathName);

  if (!user || hideSideBar) {
    return (
      <main className="min-h-screen flex flex-col items-center">
        {children}
      </main>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
