"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardRoute } from "@/constants/dashboard-routes";
import { UserRole } from "@/constants/user";

interface MobileSidebarProps {
  routes: DashboardRoute[];
  userRole: UserRole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({
  routes,
  userRole,
  open,
  onOpenChange,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 border-none">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <DashboardSidebar
          routes={routes}
          userRole={userRole}
          onClose={() => onOpenChange(false)}
          isMobile
        />
      </SheetContent>
    </Sheet>
  );
}
