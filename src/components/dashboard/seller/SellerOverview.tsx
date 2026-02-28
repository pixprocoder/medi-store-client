"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, DollarSign, Package, ShoppingCart } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { api } from "@/lib/api";
import type { IMedicine } from "@/types/medicine.types";
import type { IOrder, TOrderStatus } from "@/types/order.types";

const PENDING_STATUSES: TOrderStatus[] = ["PLACED", "PROCESSING"];

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  PROCESSING: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  SHIPPED: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export function SellerOverview() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["seller-orders"],
    queryFn: () => api.get<IOrder[]>("/seller/orders"),
  });

  const { data: medicinesData, isLoading: medicinesLoading } = useQuery({
    queryKey: ["seller-medicines"],
    queryFn: () => api.get<IMedicine[]>("/seller/medicines"),
  });

  const orders = ordersData?.data ?? [];
  const medicines = medicinesData?.data ?? [];

  const revenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);

  const stats = [
    { title: "Total Revenue", value: ordersLoading ? "—" : `$${revenue.toFixed(2)}`, icon: DollarSign, description: "from delivered orders" },
    { title: "Total Orders", value: ordersLoading ? "—" : orders.length, icon: ShoppingCart, description: "all time" },
    { title: "Medicines", value: medicinesLoading ? "—" : medicines.length, icon: Package, description: "in your catalog" },
    {
      title: "Pending Orders",
      value: ordersLoading ? "—" : orders.filter((o) => PENDING_STATUSES.includes(o.status)).length,
      icon: AlertCircle,
      description: "need attention",
    },
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
        description="Latest orders from your store"
        emptyMessage="No orders yet."
        data={orders.slice(0, 5)}
        columns={[
          {
            key: "orderNumber",
            label: "Order ID",
            render: (o) => <span className="font-medium text-primary">{o.orderNumber}</span>,
          },
          { key: "totalAmount", label: "Total", render: (o) => `$${o.totalAmount}` },
          {
            key: "status",
            label: "Status",
            render: (o) => (
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                {o.status}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Date",
            render: (o) => new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          },
        ]}
      />
    </>
  );
}
