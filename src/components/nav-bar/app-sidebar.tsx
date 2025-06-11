import type React from "react";
import {
  Home,
  RefreshCw,
  CloudUpload,
  Loader,
  File,
  ChevronRight,
  HomeIcon,
  FolderCog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
import { NavMain } from "./nav-main";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
    isActive: true,
  },
  {
    title: "Programs",
    url: "#",
    icon: File,
    subItems: [
      {
        title: "Add Program",
        url: "/add-program",
      },
      {
        title: "Modify Program",
        url: "/modify-program",
      },
      {
        title: "Delete Program",
        url: "/delete-program",
      },
    ],
  },
  {
    title: "Status",
    url: "/status",
    icon: RefreshCw,
  },
  {
    title: "Program Subscription",
    url: "/program-subscription",
    icon: Loader,
    items: [],
  },
  {
    title: "Subscription Enrollment",
    url: "/subscription-enrollment",
    icon: FolderCog,
    items: [],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <div>show header</div>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
