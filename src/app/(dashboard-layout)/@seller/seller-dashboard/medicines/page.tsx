import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SellerMedicinesTable } from "@/components/dashboard/seller/SellerMedicinesTable";

export default function SellerMedicinesPage() {
  return (
    <DashboardShell>
      <SellerMedicinesTable />
    </DashboardShell>
  );
}
