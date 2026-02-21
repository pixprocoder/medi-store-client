import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminCategoriesTable } from "@/components/dashboard/admin/AdminCategoriesTable";

export default function AdminCategoriesPage() {
  return (
    <DashboardShell>
      <AdminCategoriesTable />
    </DashboardShell>
  );
}
