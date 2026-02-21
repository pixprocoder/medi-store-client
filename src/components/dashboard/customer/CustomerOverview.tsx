"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, Heart, ShoppingCart, TrendingUp } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { api } from "@/lib/api";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { IOrder, TOrderStatus } from "@/types/order.types";

const PENDING_STATUSES: TOrderStatus[] = ["PLACED", "PROCESSING"];

export function CustomerOverview() {
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const { data, isLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => api.get<IOrder[]>("/orders"),
  });

  const orders = data?.data ?? [];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => PENDING_STATUSES.includes(o.status)).length;
  const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);
  const recentOrders = [...orders].slice(0, 5);

  const stats = [
    { title: "Total Orders", value: isLoading ? "—" : totalOrders, icon: ShoppingCart, description: "all time" },
    { title: "Pending Orders", value: isLoading ? "—" : pendingOrders, icon: Clock, description: "in progress" },
    { title: "Wishlist Items", value: wishlistCount, icon: Heart, description: "saved products" },
    { title: "Total Spent", value: isLoading ? "—" : `$${totalSpent.toFixed(2)}`, icon: TrendingUp, description: "lifetime value" },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} className="border-none" {...stat} />
        ))}
      </div>

      <DataTable<IOrder>
        title="Recent Orders"
        description="Your latest purchases"
        emptyMessage="No orders yet."
        data={recentOrders}
        columns={[
          {
            key: "orderNumber",
            label: "Order ID",
            render: (o) => <span className="font-medium text-primary">{o.orderNumber}</span>,
          },
          {
            key: "totalAmount",
            label: "Total",
            render: (o) => `$${o.totalAmount}`,
          },
          {
            key: "paymentMethod",
            label: "Payment",
            render: (o) => o.paymentMethod,
          },
          {
            key: "status",
            label: "Status",
            render: (o) => (
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize
                ${o.status === "DELIVERED" ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : o.status === "SHIPPED" ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                  : o.status === "CANCELLED" ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"}`}
              >
                {o.status}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Date",
            render: (o) =>
              new Date(o.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          },
        ]}
      />
    </>
  );
}
