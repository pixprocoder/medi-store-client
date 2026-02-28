import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CustomerOverview } from "@/components/dashboard/customer/CustomerOverview";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell>
      <CustomerOverview />
    </DashboardShell>
  );
}
