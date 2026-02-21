"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import { api } from "@/lib/api";
import type { IOrder, TOrderStatus } from "@/types/order.types";

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  PROCESSING: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  SHIPPED: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export function AdminOrdersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => api.get<IOrder[]>("/admin/orders"),
  });

  const orders = data?.data ?? [];

  if (isLoading) return <div className="h-48 w-full animate-pulse rounded-md bg-muted" />;
  if (isError) return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
      <ShoppingCart className="h-10 w-10" />
      <p className="text-sm">Failed to load orders.</p>
    </div>
  );

  return (
    <DataTable<IOrder>
      title="All Orders"
      description="Platform-wide order overview"
      emptyMessage="No orders found."
      data={orders}
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
  );
}
