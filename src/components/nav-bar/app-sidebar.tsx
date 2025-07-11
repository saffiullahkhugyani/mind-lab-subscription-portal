import type React from "react";
import {
  RefreshCw,
  Loader,
  File,
  HomeIcon,
  FolderCog,
  User,
  Star,
  Ticket,
  PersonStanding,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import LogoutButton from "../header-auth";
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
    icon: Loader,
  },
  {
    title: "Program Subscription",
    url: "/program-subscription",
    icon: RefreshCw,
    items: [],
  },
  {
    title: "Subscription Enrollment",
    url: "/subscription-enrollment",
    icon: FolderCog,
    items: [],
  },
  {
    title: "Upgrade Management",
    url: "/upgrade-management",
    icon: User,
    items: [],
  },
  {
    title: "special deal",
    url: "/special-deal",
    icon: Star,
    items: [],
  },
  {
    title: "Coupon Management",
    url: "/coupon-management",
    icon: Ticket,
    items: [],
  },
  {
    title: "User Logs",
    url: "/user-logs",
    icon: User2,
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
