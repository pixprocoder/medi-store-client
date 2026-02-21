"use client";

import { useQuery } from "@tanstack/react-query";
import { Package, Plus } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { IMedicine } from "@/types/medicine.types";

export function SellerMedicinesTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["seller-medicines"],
    queryFn: () => api.get<IMedicine[]>("/medicines"),
  });

  const medicines = data?.data ?? [];

  if (isLoading)
    return <div className="h-48 w-full animate-pulse rounded-md bg-muted" />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <Package className="h-10 w-10" />
        <p className="text-sm">Failed to load medicines.</p>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Medicines</h2>
          <p className="text-sm text-muted-foreground">Your medicine inventory</p>
        </div>
        <Button asChild size="sm">
          <Link href="/seller-dashboard/medicines/create">
            <Plus className="mr-1 h-4 w-4" /> New Medicine
          </Link>
        </Button>
      </div>

    <DataTable<IMedicine>
      title=""
      description=""
      emptyMessage="No medicines listed yet."
      data={medicines}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category", render: (m) => m.category?.name ?? "—" },
        { key: "price", label: "Price", render: (m) => `$${m.price}` },
        {
          key: "stock",
          label: "Stock",
          render: (m) => (
            <span className={
              (m.stock ?? 0) < 20
                ? "font-medium text-red-600"
                : (m.stock ?? 0) < 50
                  ? "font-medium text-yellow-600"
                  : "text-foreground"
            }>
              {m.stock ?? 0}
            </span>
          ),
        },
        { key: "manufacturer", label: "Manufacturer", render: (m) => m.manufacturer ?? "—" },
        {
          key: "status",
          label: "Status",
          render: (m) => {
            const styles = {
              APPROVED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
              PENDING: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
              REJECTED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
            };
            const status = m.status ?? "PENDING";
            return (
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
                {status}
              </span>
            );
          },
        },
      ]}
    />
    </>
  );
}
