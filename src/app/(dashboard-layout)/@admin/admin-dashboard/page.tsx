"use client";

import {
  DollarSign,
  Package,
  ShoppingCart,
  Store,
  TrendingUp,
  Users
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";

export default function AdminDashboardPage() {
  // TODO: Replace with real data from API
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      icon: DollarSign,
      description: "from last month",
      trend: { value: 20.1, isPositive: true },
    },
    {
      title: "Total Users",
      value: "2,350",
      icon: Users,
      description: "from last month",
      trend: { value: 15.3, isPositive: true },
    },
    {
      title: "Active Sellers",
      value: "156",
      icon: Store,
      description: "from last month",
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      description: "from last month",
      trend: { value: -4.3, isPositive: false },
    },
    {
      title: "Total Medicines",
      value: "3,456",
      icon: Package,
      description: "in inventory",
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Monthly Growth",
      value: "+18.2%",
      icon: TrendingUp,
      description: "from last month",
      trend: { value: 5.4, isPositive: true },
    },
  ];

  const recentOrders = [
    {
      orderId: "#1234",
      customer: "Sarah Johnson",
      amount: "$350.00",
      status: "Completed",
      date: "2 hours ago",
    },
    {
      orderId: "#1233",
      customer: "Mike Wilson",
      amount: "$125.50",
      status: "Processing",
      date: "4 hours ago",
    },
    {
      orderId: "#1232",
      customer: "Emma Davis",
      amount: "$89.99",
      status: "Completed",
      date: "6 hours ago",
    },
    {
      orderId: "#1231",
      customer: "Alex Brown",
      amount: "$245.00",
      status: "Pending",
      date: "8 hours ago",
    },
  ];

  return (
    <DashboardShell>


      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard className="border-none" key={stat.title} {...stat} />
        ))}
      </div>


      {/* Recent Orders Table */}
      <DataTable
        title="Recent Orders"
        description="Latest orders from all users"
        columns={[
          { key: "orderId", label: "Order ID" },
          { key: "customer", label: "Customer" },
          { key: "amount", label: "Amount" },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.status === "Completed"
                  ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : item.status === "Processing"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                  }`}
              >
                {item.status}
              </span>
            ),
          },
          { key: "date", label: "Date" },
        ]}
        data={recentOrders}
        onRowClick={(order) => console.log("Order clicked:", order)}
      />
    </DashboardShell>
  );
}