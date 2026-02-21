"use client";

import { Mail, Phone, ShieldCheck, Store, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export function SellerProfile() {
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "S";

  return (
    <Card className="border-none ">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              <Store className="mr-1 h-3 w-3" />
              Seller
            </Badge>
          </div>
        </div>

        <div>
          <InfoRow icon={User} label="Full Name" value={user.name ?? ""} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow icon={ShieldCheck} label="Email Verified" value={user.emailVerified ? "Verified" : "Not verified"} />
          <InfoRow
            icon={Phone}
            label="Member Since"
            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
