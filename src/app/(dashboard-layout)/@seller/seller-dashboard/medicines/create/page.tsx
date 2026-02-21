import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CreateMedicineForm } from "@/components/dashboard/seller/CreateMedicineForm";

export default function CreateMedicinePage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-xl font-semibold mb-1">Add New Medicine</h1>
        <p className="text-sm text-muted-foreground mb-6">Fill in the details to list a new medicine.</p>
        <CreateMedicineForm />
      </div>
    </DashboardShell>
  );
}
