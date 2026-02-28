import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminOverview } from "@/components/dashboard/admin/AdminOverview";

export default function AdminDashboardPage() {
  return (
    <DashboardShell>
      <AdminOverview />
    </DashboardShell>
  );
}
