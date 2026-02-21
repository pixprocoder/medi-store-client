"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { DataTable } from "@/components/dashboard/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/constants/user";
import { api } from "@/lib/api";
import type { IUser } from "@/types/user.types";

const STATUS_STYLES: Record<UserStatus, string> = {
  ACTIVE: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  BANNED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  SUSPENDED: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
};

function StatusSelect({ user }: { user: IUser }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (status: UserStatus) => api.patch(`/admin/users/${user.id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return (
    <Select defaultValue={user.status} onValueChange={(v) => mutate(v as UserStatus)} disabled={isPending}>
      <SelectTrigger className="h-7 w-32 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(UserStatus).map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            <span className={`rounded-full px-2 py-0.5 ${STATUS_STYLES[s]}`}>{s}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function AdminUsersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => api.get<IUser[]>("/admin/users"),
  });

  const users = data?.data ?? [];

  if (isLoading) return <div className="h-48 w-full animate-pulse rounded-md bg-muted" />;
  if (isError) return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
      <Users className="h-10 w-10" />
      <p className="text-sm">Failed to load users.</p>
    </div>
  );

  return (
    <DataTable<IUser>
      title="All Users"
      description="Manage user accounts and status"
      emptyMessage="No users found."
      data={users}
      columns={[
        { key: "name", label: "Name", render: (u) => u.name ?? "—" },
        { key: "email", label: "Email" },
        {
          key: "role", label: "Role",
          render: (u) => (
            <span className="inline-flex rounded-full bg-secondary px-2 py-1 text-xs font-medium">{u.role}</span>
          ),
        },
        {
          key: "createdAt", label: "Joined",
          render: (u) => u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
        },
        { key: "status", label: "Status", render: (u) => <StatusSelect user={u} /> },
      ]}
    />
  );
}
