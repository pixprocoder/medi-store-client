import {
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Package,
  ShoppingCart,
  Store,
  Tag,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { UserRole } from "./user";

export interface DashboardRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const dashboardRoutes: DashboardRoute[] = [
  // Admin Routes
  {
    href: "/admin-dashboard",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/users",
    label: "User Management",
    icon: Users,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/sellers",
    label: "Seller Management",
    icon: Store,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/medicines",
    label: "All Medicines",
    icon: Package,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/orders",
    label: "All Orders",
    icon: ShoppingCart,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/categories",
    label: "Categories",
    icon: Tag,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
    roles: [UserRole.ADMIN],
  },
  {
    href: "/admin-dashboard/reports",
    label: "Reports",
    icon: FileText,
    roles: [UserRole.ADMIN],
  },

  // Seller Routes
  {
    href: "/seller-dashboard",
    label: "Seller Dashboard",
    icon: LayoutDashboard,
    roles: [UserRole.SELLER],
  },
  {
    href: "/seller-dashboard/medicines",
    label: "My Medicines",
    icon: Package,
    roles: [UserRole.SELLER],
  },
  {
    href: "/seller-dashboard/orders",
    label: "My Orders",
    icon: ShoppingCart,
    roles: [UserRole.SELLER],
  },
  // {
  //   href: "/seller-dashboard/analytics",
  //   label: "Sales Analytics",
  //   icon: BarChart3,
  //   roles: [UserRole.SELLER],
  // },
  // {
  //   href: "/seller-dashboard/payments",
  //   label: "Payments",
  //   icon: Wallet,
  //   roles: [UserRole.SELLER],
  // },
  {
    href: "/seller-dashboard/profile",
    label: "My Profile",
    icon: User,
    roles: [UserRole.SELLER],
  },

  // Customer Routes
  {
    href: "/dashboard",
    label: "My Dashboard",
    icon: LayoutDashboard,
    roles: [UserRole.CUSTOMER],
  },
  {
    href: "/dashboard/orders",
    label: "My Orders",
    icon: ClipboardList,
    roles: [UserRole.CUSTOMER],
  },

  {
    href: "/dashboard/profile",
    label: "My Profile",
    icon: User,
    roles: [UserRole.CUSTOMER],
  },
];

export const getRoutesByRole = (role: UserRole): DashboardRoute[] => {
  return dashboardRoutes.filter((route) => route.roles.includes(role));
};

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return "/admin-dashboard";
    case UserRole.SELLER:
      return "/seller-dashboard";
    case UserRole.CUSTOMER:
      return "/dashboard";
    default:
      return "/";
  }
};
