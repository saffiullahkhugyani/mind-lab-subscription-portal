import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { createClient } from "../utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/nav-bar/app-sidebar";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Subscription Portal",
  description: "developed by @mindlabs",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {user != null ? (
            <SidebarProvider>
              <AppSidebar />
              {/* <SidebarTrigger /> */}
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          ) : (
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
