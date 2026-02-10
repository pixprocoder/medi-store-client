"use client";

import {
  Clock,
  Eye,
  Heart,
  ShoppingCart,
  TrendingUp
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";

export default function CustomerDashboardPage() {

  // TODO: Replace with real data from API
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      icon: ShoppingCart,
      description: "all time",
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: Clock,
      description: "in progress",
    },
    {
      title: "Wishlist Items",
      value: "12",
      icon: Heart,
      description: "saved products",
    },
    {
      title: "Total Spent",
      value: "$1,234",
      icon: TrendingUp,
      description: "lifetime value",
    },
  ];



  const recentOrders = [
    {
      orderId: "#1235",
      items: "3 items",
      amount: "$89.99",
      status: "Processing",
      date: "2 hours ago",
    },
    {
      orderId: "#1234",
      items: "2 items",
      amount: "$45.50",
      status: "Shipped",
      date: "1 day ago",
    },
    {
      orderId: "#1233",
      items: "5 items",
      amount: "$156.00",
      status: "Delivered",
      date: "3 days ago",
    },
    {
      orderId: "#1232",
      items: "1 item",
      amount: "$25.99",
      status: "Delivered",
      date: "1 week ago",
    },
  ];

  return (
    <DashboardShell>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard className="border-none" key={stat.title} {...stat} />
        ))}
      </div>
      {/* Recent Orders Table */}
      <DataTable
        title="Recent Orders"
        description="Your latest purchases and their status"
        columns={[
          { key: "orderId", label: "Order ID" },
          { key: "items", label: "Items" },
          { key: "amount", label: "Amount" },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.status === "Delivered"
                  ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : item.status === "Shipped"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                  }`}
              >
                {item.status}
              </span>
            ),
          },
          { key: "date", label: "Date" },
          {
            key: "actions",
            label: "Actions",
            render: (item) => (
              <Button variant="ghost" size="sm">
                <Eye className="mr-1 h-3 w-3" />
                View
              </Button>
            ),
          },
        ]}
        data={recentOrders}
        onRowClick={(order) => console.log("Order clicked:", order)}
      />
    </DashboardShell>
  );
}