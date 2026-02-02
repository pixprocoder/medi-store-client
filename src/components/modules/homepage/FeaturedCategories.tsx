import Link from "next/link";
import { Heart, Pill, Stethoscope, Thermometer, Users, Syringe } from "lucide-react";

import { Button } from "@/components/ui/button";

const categories = [
    {
        name: "Medicines",
        icon: Pill,
        description: "Prescription & OTC drugs",
        href: "/categories/medicines",
    },
    {
        name: "Health Devices",
        icon: Stethoscope,
        description: "Medical equipment",
        href: "/categories/devices",
    },
    {
        name: "Wellness",
        icon: Heart,
        description: "Vitamins & supplements",
        href: "/categories/wellness",
    },
    {
        name: "Personal Care",
        icon: Users,
        description: "Hygiene & beauty",
        href: "/categories/personal-care",
    },
    {
        name: "First Aid",
        icon: Thermometer,
        description: "Emergency supplies",
        href: "/categories/first-aid",
    },
    {
        name: "Diabetes Care",
        icon: Syringe,
        description: "Blood sugar management",
        href: "/categories/diabetes",
    },
];

export function FeaturedCategories() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Shop by Category
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Find what you need from our wide range of healthcare products
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="hidden sm:flex">
                        <Link href="/products">View All</Link>
                    </Button>
                </div>



                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="group relative overflow-hidden rounded-lg  bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold group-hover:text-primary">
                                            {category.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 text-center ">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/categories">View All Categories</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
