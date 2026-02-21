"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, Package, X } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import type { IOrder, TOrderStatus } from "@/types/order.types";

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  PROCESSING: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  SHIPPED: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const CANCELLABLE: TOrderStatus[] = ["PLACED", "PROCESSING"];

function OrderDetailsDialog({ order, open, onClose }: { order: IOrder; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* Status row */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}>
              {order.status}
            </span>
          </div>

          {/* Payment */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span>{order.paymentMethod} · {order.paymentStatus}</span>
          </div>
          {/* Seller */}
          {order.seller && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Seller</span>
              <span>{order.seller.name}</span>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">${order.totalAmount}</span>
          </div>

          {/* Shipping */}
          <div>
            <p className="mb-1 text-muted-foreground">Shipping Address</p>
            <p className="leading-relaxed">
              {order.shippingAddress.name}<br />
              {order.shippingAddress.address}, {order.shippingAddress.city}<br />
              {order.shippingAddress.country} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.phone}
            </p>
          </div>


          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <p className="mb-2 text-muted-foreground">Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="font-medium">{item.medicine.name}</p>
                      <p className="text-xs text-muted-foreground">{item.medicine.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      <p>x{item.quantity}</p>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </DialogContent>
    </Dialog>
  );
}

function OrderActions({ order }: { order: IOrder }) {
  const [open, setOpen] = React.useState(false);

  const { data: detailData } = useQuery({
    queryKey: ["order-detail", order.id],
    queryFn: () => api.get<IOrder>(`/orders/${order.id}`),
    enabled: open,
  });

  const detail = detailData?.data ?? order;

  return (
    <>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <Eye className="mr-1 h-3 w-3" />
          View
        </Button>

        {CANCELLABLE.includes(order.status) && (
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
            <X className="mr-1 h-3 w-3" />
            Cancel
          </Button>
        )}
      </div>

      <OrderDetailsDialog order={detail} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function CustomerOrdersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => api.get<IOrder[]>("/orders"),
  });

  const orders = data?.data ?? [];

  if (isLoading)
    return <div className="h-48 w-full animate-pulse rounded-md bg-muted" />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <Package className="h-10 w-10" />
        <p className="text-sm">Failed to load orders. Please try again.</p>
      </div>
    );

  return (
    <DataTable<IOrder>
      title="My Orders"
      description="All orders you have placed"
      emptyMessage="You haven't placed any orders yet."
      data={orders}
      columns={[
        {
          key: "orderNumber",
          label: "Order ID",
          render: (order) => <span className="font-medium text-primary">{order.orderNumber}</span>,
        },
        {
          key: "totalAmount",
          label: "Total",
          render: (order) => `$${order.totalAmount}`,
        },
        {
          key: "paymentMethod",
          label: "Payment",
          render: (order) => order.paymentMethod,
        },
        {
          key: "status",
          label: "Status",
          render: (order) => (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}>
              {order.status}
            </span>
          ),
        },
        {
          key: "createdAt",
          label: "Date",
          render: (order) =>
            new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
        },
        {
          key: "actions",
          label: "Actions",
          render: (order) => <OrderActions order={order} />,
        },
      ]}
    />
  );
}
