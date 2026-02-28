import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SellerOverview } from "@/components/dashboard/seller/SellerOverview";

export default function SellerDashboardPage() {
  return (
    <DashboardShell>
      <SellerOverview />
    </DashboardShell>
  );
}
