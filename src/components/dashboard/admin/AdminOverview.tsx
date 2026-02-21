"use client";

import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { api } from "@/lib/api";
import type { IMedicine } from "@/types/medicine.types";
import type { IOrder, TOrderStatus } from "@/types/order.types";
import type { IUser } from "@/types/user.types";

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  PROCESSING: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  SHIPPED: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export function AdminOverview() {
  const { data: usersData } = useQuery({ queryKey: ["admin-users"], queryFn: () => api.get<IUser[]>("/admin/users") });
  const { data: ordersData } = useQuery({ queryKey: ["admin-orders"], queryFn: () => api.get<IOrder[]>("/admin/orders") });
  const { data: medicinesData } = useQuery({ queryKey: ["admin-medicines"], queryFn: () => api.get<IMedicine[]>("/admin/medicines") });

  const users = usersData?.data ?? [];
  const orders = ordersData?.data ?? [];
  const medicines = medicinesData?.data ?? [];

  const revenue = orders.filter((o) => o.status === "DELIVERED").reduce((s, o) => s + parseFloat(o.totalAmount), 0);

  const stats = [
    { title: "Total Users", value: users.length || "—", icon: Users, description: "registered" },
    { title: "Total Orders", value: orders.length || "—", icon: ShoppingCart, description: "all time" },
    { title: "Total Revenue", value: orders.length ? `$${revenue.toFixed(2)}` : "—", icon: TrendingUp, description: "from delivered" },
    { title: "Total Medicines", value: medicines.length || "—", icon: Package, description: "in catalog" },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <StatCard key={s.title} className="border-none" {...s} />)}
      </div>

      <DataTable<IOrder>
        title="Recent Orders"
        description="Latest orders across the platform"
        emptyMessage="No orders yet."
        data={orders.slice(0, 5)}
        columns={[
          { key: "orderNumber", label: "Order ID", render: (o) => <span className="font-medium text-primary">{o.orderNumber}</span> },
          { key: "totalAmount", label: "Total", render: (o) => `$${o.totalAmount}` },
          { key: "paymentMethod", label: "Payment", render: (o) => o.paymentMethod },
          {
            key: "status", label: "Status",
            render: (o) => (
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[o.status]}`}>{o.status}</span>
            ),
          },
          { key: "createdAt", label: "Date", render: (o) => new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
        ]}
      />
    </>
  );
}
