import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminUsersTable } from "@/components/dashboard/admin/AdminUsersTable";

export default function AdminUsersPage() {
  return (
    <DashboardShell>
      <AdminUsersTable />
    </DashboardShell>
  );
}
