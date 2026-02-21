"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

interface ICategory {
  id: string;
  name: string;
}

export function CreateMedicineForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get<ICategory[]>("/categories"),
  });
  const categories = categoriesData?.data ?? [];

  type FormValues = typeof form.state.values;

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) =>
      api.post("/seller/medicines/create", {
        ...values,
        price: parseFloat(String(values.price)),
        stock: parseInt(String(values.stock)),
        expiryDate: values.expiryDate ? new Date(values.expiryDate).toISOString() : undefined,
        activeIngredients: {
          ...values.activeIngredients,
          inactive: String(values.activeIngredients.inactive)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      }),
    onSuccess: () => {
      toast.success("Medicine created successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
      router.push("/seller-dashboard/medicines");
    },
    onError: () => toast.error("Failed to create medicine"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      manufacturer: "",
      image: "",
      expiryDate: "",
      batchNumber: "",
      prescriptionRequired: false,
      categoryId: "",
      activeIngredients: {
        main: "",
        strength: "",
        inactive: "",
      },
    },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 "
    >
      {/* Basic Info */}
      <Card className="border-none">
        <CardHeader><CardTitle className="text-base">Basic Info</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">

          <div className="space-y-1.5 sm:col-span-2">
            <Label>Name <span className="text-destructive">*</span></Label>
            <form.Field name="name">
              {(field) => (
                <Input
                  placeholder="Ibuprofen 400mg"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Price ($) <span className="text-destructive">*</span></Label>
            <form.Field name="price">
              {(field) => (
                <Input
                  type="number"
                  step="0.01"
                  placeholder="153.99"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Stock <span className="text-destructive">*</span></Label>
            <form.Field name="stock">
              {(field) => (
                <Input
                  type="number"
                  placeholder="180"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Manufacturer</Label>
            <form.Field name="manufacturer">
              {(field) => (
                <Input
                  placeholder="MediPharm Industries"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Category <span className="text-destructive">*</span></Label>
            <form.Field name="categoryId">
              {(field) => (
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>Description</Label>
            <form.Field name="description">
              {(field) => (
                <Textarea
                  placeholder="Medicine description..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

        </CardContent>
      </Card>

      {/* Details */}
      <Card className="border-none">
        <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">

          <div className="space-y-1.5">
            <Label>Batch Number</Label>
            <form.Field name="batchNumber">
              {(field) => (
                <Input
                  placeholder="MP-IBU400-2024"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Expiry Date</Label>
            <form.Field name="expiryDate">
              {(field) => (
                <Input
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>Image URL</Label>
            <form.Field name="image">
              {(field) => (
                <Input
                  placeholder="https://..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <form.Field name="prescriptionRequired">
              {(field) => (
                <Checkbox
                  id="prescription"
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(!!v)}
                />
              )}
            </form.Field>
            <Label htmlFor="prescription">Prescription Required</Label>
          </div>

        </CardContent>
      </Card>

      {/* Active Ingredients */}
      <Card className="border-none">
        <CardHeader><CardTitle className="text-base">Active Ingredients</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">

          <div className="space-y-1.5">
            <Label>Main Ingredient</Label>
            <form.Field name="activeIngredients.main">
              {(field) => (
                <Input
                  placeholder="Ibuprofen"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5">
            <Label>Strength</Label>
            <form.Field name="activeIngredients.strength">
              {(field) => (
                <Input
                  placeholder="400mg"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>
              Inactive Ingredients{" "}
              <span className="text-xs text-muted-foreground">(comma separated)</span>
            </Label>
            <form.Field name="activeIngredients.inactive">
              {(field) => (
                <Input
                  placeholder="Sodium, Silicon Dioxide, Stearic Acid"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Medicine"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
