"use client";

import {
  AlertCircle,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  TrendingUp
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";

export default function SellerDashboardPage() {
  // TODO: Replace with real data from API
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,234",
      icon: DollarSign,
      description: "from last month",
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Total Sales",
      value: "345",
      icon: ShoppingCart,
      description: "from last month",
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: "Active Products",
      value: "89",
      icon: Package,
      description: "in your catalog",
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: AlertCircle,
      description: "need attention",
      trend: { value: -15.3, isPositive: false },
    },
    {
      title: "Product Views",
      value: "2,345",
      icon: Eye,
      description: "this month",
      trend: { value: 23.1, isPositive: true },
    },
    {
      title: "Conversion Rate",
      value: "14.7%",
      icon: TrendingUp,
      description: "from last month",
      trend: { value: 3.2, isPositive: true },
    },
  ];



  const topProducts = [
    {
      name: "Aspirin 500mg",
      sales: 156,
      revenue: "$1,560",
      stock: 234,
      trend: "+12%",
    },
    {
      name: "Paracetamol 500mg",
      sales: 142,
      revenue: "$1,420",
      stock: 15,
      trend: "+8%",
    },
    {
      name: "Vitamin D3 1000IU",
      sales: 98,
      revenue: "$1,960",
      stock: 87,
      trend: "+15%",
    },
    {
      name: "Omega-3 Fish Oil",
      sales: 87,
      revenue: "$2,610",
      stock: 56,
      trend: "+5%",
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


      {/* Top Products Table */}
      <DataTable
        title="Top Selling Products"
        description="Your best performing products this month"
        columns={[
          { key: "name", label: "Product Name" },
          { key: "sales", label: "Sales" },
          { key: "revenue", label: "Revenue" },
          {
            key: "stock",
            label: "Stock",
            render: (item) => (
              <span
                className={
                  item.stock < 20
                    ? "text-red-600 font-medium"
                    : "text-foreground"
                }
              >
                {item.stock}
              </span>
            ),
          },
          {
            key: "trend",
            label: "Trend",
            render: (item) => (
              <span className="text-green-600 font-medium">{item.trend}</span>
            ),
          },
        ]}
        data={topProducts}
        onRowClick={(product) => console.log("Product clicked:", product)}
      />
    </DashboardShell>
  );
}