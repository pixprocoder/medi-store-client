"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import type { ICategory } from "@/types/category.types";

function CategoryForm({ category, onClose }: { category?: ICategory; onClose: () => void }) {
  const queryClient = useQueryClient();
  const isEdit = !!category;

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { name: string; slug: string }) =>
      isEdit
        ? api.patch(`/admin/categories/${category.id}`, values)
        : api.post("/admin/categories", values),
    onSuccess: () => {
      toast.success(isEdit ? "Category updated" : "Category created");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
    onError: () => toast.error("Failed to save category"),
  });

  const form = useForm({
    defaultValues: { name: category?.name ?? "", slug: category?.slug ?? "" },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <Label>Name</Label>
        <form.Field name="name">
          {(field) => (
            <Input placeholder="Pain Relief" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
          )}
        </form.Field>
      </div>
      <div className="space-y-1.5">
        <Label>Slug</Label>
        <form.Field name="slug">
          {(field) => (
            <Input placeholder="pain-relief" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
          )}
        </form.Field>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

export function AdminCategoriesTable() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editCategory, setEditCategory] = React.useState<ICategory | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => api.get<ICategory[]>("/categories"),
  });

  const categories = data?.data ?? [];

  function openCreate() { setEditCategory(undefined); setDialogOpen(true); }
  function openEdit(cat: ICategory) { setEditCategory(cat); setDialogOpen(true); }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">Manage medicine categories</p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-1 h-4 w-4" /> New Category
        </Button>
      </div>

      {isLoading ? (
        <div className="h-48 w-full animate-pulse rounded-md bg-muted" />
      ) : (
        <DataTable<ICategory>
          title=""
          description=""
          emptyMessage="No categories yet."
          data={categories}
          columns={[
            { key: "name", label: "Name" },
            { key: "slug", label: "Slug", render: (c) => <span className="text-muted-foreground">{c.slug}</span> },
            {
              key: "actions", label: "Actions",
              render: (c) => (
                <Button variant="ghost" size="sm" onClick={() => openEdit(c)}>
                  <Pencil className="mr-1 h-3 w-3" /> Edit
                </Button>
              ),
            },
          ]}
        />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editCategory ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <CategoryForm category={editCategory} onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
