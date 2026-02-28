import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CustomerOrdersTable } from "@/components/dashboard/customer/CustomerOrdersTable";

export default function CustomerOrdersPage() {
  return (
    <DashboardShell>
      <CustomerOrdersTable />
    </DashboardShell>
  );
}
