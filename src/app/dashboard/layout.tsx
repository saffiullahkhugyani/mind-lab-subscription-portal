import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { readUserSession } from "@/lib/actions/actions";
import { useUserStore } from "@/lib/store/user";
import { redirect } from "next/navigation";
import { AppSidebar } from "../../components/nav-bar/app-sidebar";

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
    // <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarTrigger />
    <main>{children}</main>
    // </SidebarProvider>
  );
}
