"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardRoute } from "@/constants/dashboard-routes";
import { UserRole } from "@/constants/user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

interface DashboardSidebarProps {
  routes: DashboardRoute[];
  userRole: UserRole;
  onClose?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({
  routes,
  onClose,
  isMobile = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();


  const router = useRouter()


  async function handleSignOut() {
    await authClient.signOut();
    router.push("/")
  }

  return (
    <div className="flex h-full flex-col  bg-background">
      {/* Header */}
      <div className="flex h-16 items-center justify-between  px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="/assets/logo/logo.svg"
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive =
              pathname === route.href || pathname.startsWith(route.href + "/");

            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>


      <div className="w-full  px-3  mb-2">
        <Button
          className="text-destructive bg-none w-full"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </Button>

      </div>
    </div>
  );
}
