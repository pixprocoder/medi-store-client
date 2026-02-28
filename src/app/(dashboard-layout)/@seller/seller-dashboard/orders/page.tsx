import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SellerOrdersTable } from "@/components/dashboard/seller/SellerOrdersTable";

export default function SellerOrdersPage() {
  return (
    <DashboardShell>
      <SellerOrdersTable />
    </DashboardShell>
  );
}
