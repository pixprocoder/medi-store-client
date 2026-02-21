"use client";

import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { Button } from "@/components/ui/button";
import {
    getDashboardPath,
    getRoutesByRole,
} from "@/constants/dashboard-routes";
import { UserRole } from "@/constants/user";
import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect, useState } from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
    admin: React.ReactNode;
    seller: React.ReactNode;
    customer: React.ReactNode;
}

export default function DashboardLayout({
    children,
    admin,
    seller,
    customer,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { user, isPending } = useAuth();

    const userRole = user?.role ?? UserRole.CUSTOMER;
    const routes = getRoutesByRole(userRole);


    // Redirect to appropriate dashboard based on user role
    useEffect(() => {
        if (!isPending && user) {
            const dashboardPath = getDashboardPath(user.role);
            if (
                pathname === "/dashboard-layout" ||
                (user.role === UserRole.ADMIN &&
                    !pathname.startsWith("/admin-dashboard")) ||
                (user.role === UserRole.SELLER &&
                    !pathname.startsWith("/seller-dashboard")) ||
                (user.role === UserRole.CUSTOMER &&
                    pathname.startsWith("/admin-dashboard")) ||
                (user.role === UserRole.CUSTOMER &&
                    pathname.startsWith("/seller-dashboard"))
            ) {
                router.replace(dashboardPath);
            }
        }
    }, [isPending, user, pathname, router]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        router.replace("/auth/login");
        return null;
    }

    // Render the appropriate parallel route based on user role
    const renderContent = () => {
        switch (userRole) {
            case UserRole.ADMIN:
                return admin;
            case UserRole.SELLER:
                return seller;
            case UserRole.CUSTOMER:
                return customer;
            default:
                return children;
        }
    };

    return (
        <div className="flex  h-screen overflow-hidden">

            {/* Desktop Sidebar */}
            <aside className="hidden w-64 lg:block">
                <DashboardSidebar routes={routes} userRole={userRole} />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar
                routes={routes}
                userRole={userRole}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            {/* Main Content Area */}
            <div className="flex  flex-1 flex-col overflow-hidden">
                {/* Mobile top bar */}
                <header className="flex h-14 items-center gap-3 border-b bg-background px-4 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-semibold">Dashboard</span>
                </header>

                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-6">
                    <div className="mx-auto max-w-7xl">{renderContent()}</div>
                </main>
            </div>
        </div>
    );
}
