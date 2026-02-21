import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CustomerProfile } from "@/components/dashboard/customer/CustomerProfile";

export default function CustomerProfilePage() {
  return (
    <DashboardShell>
      <CustomerProfile />
    </DashboardShell>
  );
}
