"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Package } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import type { IOrder, TOrderStatus } from "@/types/order.types";

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  PROCESSING: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  SHIPPED: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const UPDATABLE_STATUSES: TOrderStatus[] = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"];

function StatusSelect({ order }: { order: IOrder }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (status: TOrderStatus) =>
      api.patch(`/seller/orders/${order.id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seller-orders"] }),
  });

  return (
    <Select
      defaultValue={order.status}
      onValueChange={(val) => mutate(val as TOrderStatus)}
      disabled={isPending || order.status === "CANCELLED" || order.status === "DELIVERED"}
    >
      <SelectTrigger className="h-7 w-36 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {UPDATABLE_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            <span className={`rounded-full px-2 py-0.5 ${STATUS_STYLES[s]}`}>{s}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function SellerOrdersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["seller-orders"],
    queryFn: () => api.get<IOrder[]>("/seller/orders"),
  });

  const orders = data?.data ?? [];

  if (isLoading)
    return <div className="h-48 w-full animate-pulse rounded-md bg-muted" />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <Package className="h-10 w-10" />
        <p className="text-sm">Failed to load orders.</p>
      </div>
    );

  return (
    <DataTable<IOrder>
      title="Manage Orders"
      description="Update order status for your customers"
      emptyMessage="No orders yet."
      data={orders}
      columns={[
        {
          key: "orderNumber",
          label: "Order ID",
          render: (o) => <span className="font-medium text-primary">{o.orderNumber}</span>,
        },
        { key: "totalAmount", label: "Total", render: (o) => `$${o.totalAmount}` },
        { key: "paymentMethod", label: "Payment", render: (o) => o.paymentMethod },
        {
          key: "createdAt",
          label: "Date",
          render: (o) => new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
        {
          key: "status",
          label: "Update Status",
          render: (o) => <StatusSelect order={o} />,
        },
      ]}
    />
  );
}
