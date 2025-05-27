import { AppSidebar } from "@/app/dashboard/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { readUserSession } from "@/lib/actions/actions";
import { useUserStore } from "@/lib/store/user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect("/sign-in");
  }

  useUserStore.setState({ user: userSession.session.user });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main>{children}</main>
    </SidebarProvider>
    // <div className="flex-1 w-full flex flex-col gap-12">
    //   <div className="w-full">{children}</div>
    // </div>
  );
}
