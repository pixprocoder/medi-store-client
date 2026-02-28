import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminUsersTable } from "@/components/dashboard/admin/AdminUsersTable";

export default function AdminSellersPage() {
  return (
    <DashboardShell>
      <AdminUsersTable />
    </DashboardShell>
  );
}
