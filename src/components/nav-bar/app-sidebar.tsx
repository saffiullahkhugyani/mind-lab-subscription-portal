import {
  Home,
  RefreshCw,
  FileText,
  CloudUpload,
  Loader,
  File,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import LogoutButton from "../header-auth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Status",
    url: "#",
    icon: Loader,
  },
  {
    title: "Subscriptions Enrollment",
    url: "#",
    icon: RefreshCw,
  },
  {
    title: "Upload files",
    url: "#",
    icon: CloudUpload,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Subscription Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            {/*Sidebar menu item for progams*/}
            <SidebarMenu>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <File />
                      <span>Program</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/add-program">
                            <span>Add Program</span>
                          </a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <a href="/delete-program">
                            <span>Delete Program</span>
                          </a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <a href="modify-program">
                            <span>Modify Program</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="data-[slot=sidebar-menu-button]:!p-1.5"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
