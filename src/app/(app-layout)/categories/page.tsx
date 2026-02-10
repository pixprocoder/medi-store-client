import {
    ArrowRight,
    Heart,
    Pill,
    Stethoscope,
    Syringe,
    Thermometer,
    Users,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    {
        slug: "medicines",
        name: "Medicines",
        icon: Pill,
        description: "Prescription & OTC drugs",
        longDescription:
            "Browse a wide range of prescription and over-the-counter medications including pain relief, antibiotics, and more.",
        productCount: 48,
        href: "/categories/medicines",
    },
    {
        slug: "devices",
        name: "Health Devices",
        icon: Stethoscope,
        description: "Medical equipment",
        longDescription:
            "Find reliable medical devices and equipment for home health monitoring, diagnostics, and daily wellness.",
        productCount: 32,
        href: "/categories/devices",
    },
    {
        slug: "wellness",
        name: "Wellness",
        icon: Heart,
        description: "Vitamins & supplements",
        longDescription:
            "Support your health with high-quality vitamins, supplements, and wellness products for the whole family.",
        productCount: 56,
        href: "/categories/wellness",
    },
    {
        slug: "personal-care",
        name: "Personal Care",
        icon: Users,
        description: "Hygiene & beauty",
        longDescription:
            "Discover trusted hygiene, skincare, and beauty products crafted for everyday personal care routines.",
        productCount: 41,
        href: "/categories/personal-care",
    },
    {
        slug: "first-aid",
        name: "First Aid",
        icon: Thermometer,
        description: "Emergency supplies",
        longDescription:
            "Stock up on essential first aid supplies including bandages, antiseptics, and emergency kits for your home.",
        productCount: 24,
        href: "/categories/first-aid",
    },
    {
        slug: "diabetes",
        name: "Diabetes Care",
        icon: Syringe,
        description: "Blood sugar management",
        longDescription:
            "Manage blood sugar effectively with glucose monitors, test strips, insulin supplies, and related products.",
        productCount: 19,
        href: "/categories/diabetes",
    },
];

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Shop by Category</h1>
                <p className="mt-2 text-muted-foreground">
                    Explore our wide range of healthcare products organised by category
                </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.slug}
                            href={category.href}
                            className="group flex flex-col overflow-hidden rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary"
                        >
                            {/* Icon & Badge Row */}
                            <div className="flex items-start justify-between">
                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    {category.productCount} products
                                </span>
                            </div>

                            {/* Content */}
                            <div className="mt-4 flex-1">
                                <h3 className="text-lg font-semibold group-hover:text-primary">
                                    {category.name}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {category.description}
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground/70">
                                    {category.longDescription}
                                </p>
                            </div>

                            {/* Browse Link */}
                            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:gap-2">
                                Browse Category
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
