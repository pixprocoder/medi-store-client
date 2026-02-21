import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminOrdersTable } from "@/components/dashboard/admin/AdminOrdersTable";

export default function AdminOrdersPage() {
  return (
    <DashboardShell>
      <AdminOrdersTable />
    </DashboardShell>
  );
}
