"use client";

import {
    ArrowLeft,
    Heart,
    Pill,
    Search,
    Stethoscope,
    Syringe,
    Thermometer,
    Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { MedicineCard } from "@/components/modules/shared/MedicineCard";

// Category definitions — kept in sync with /categories page and FeaturedCategories
const CATEGORIES = {
    medicines: {
        name: "Medicines",
        icon: Pill,
        description: "Prescription & OTC drugs",
        subcategories: ["Pain Relief", "Antibiotics", "Allergy", "Digestive Health"],
    },
    devices: {
        name: "Health Devices",
        icon: Stethoscope,
        description: "Medical equipment",
        subcategories: [],
    },
    wellness: {
        name: "Wellness",
        icon: Heart,
        description: "Vitamins & supplements",
        subcategories: ["Vitamins"],
    },
    "personal-care": {
        name: "Personal Care",
        icon: Users,
        description: "Hygiene & beauty",
        subcategories: [],
    },
    "first-aid": {
        name: "First Aid",
        icon: Thermometer,
        description: "Emergency supplies",
        subcategories: [],
    },
    diabetes: {
        name: "Diabetes Care",
        icon: Syringe,
        description: "Blood sugar management",
        subcategories: [],
    },
} as const;

type CategorySlug = keyof typeof CATEGORIES;

// Mock products — replace with API call
const MOCK_MEDICINES = [
    {
        id: 1,
        name: "Paracetamol 500mg Tablets",
        category: "Pain Relief",
        manufacturer: "PharmaCorp",
        price: 8.99,
        originalPrice: 12.99,
        rating: 4.5,
        reviews: 128,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 2,
        name: "Ibuprofen 400mg Capsules",
        category: "Pain Relief",
        manufacturer: "HealthMed",
        price: 11.99,
        originalPrice: 15.99,
        rating: 4.7,
        reviews: 256,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 3,
        name: "Amoxicillin 250mg",
        category: "Antibiotics",
        manufacturer: "MediCare",
        price: 24.99,
        rating: 4.8,
        reviews: 89,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 4,
        name: "Vitamin D3 Supplements",
        category: "Vitamins",
        manufacturer: "VitaLife",
        price: 15.99,
        originalPrice: 19.99,
        rating: 4.6,
        reviews: 342,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 5,
        name: "Aspirin 75mg Tablets",
        category: "Pain Relief",
        manufacturer: "PharmaCorp",
        price: 6.99,
        rating: 4.4,
        reviews: 178,
        inStock: false,
        image: "/test.webp",
    },
    {
        id: 6,
        name: "Cetirizine 10mg",
        category: "Allergy",
        manufacturer: "HealthMed",
        price: 9.99,
        originalPrice: 13.99,
        rating: 4.5,
        reviews: 203,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 7,
        name: "Omeprazole 20mg",
        category: "Digestive Health",
        manufacturer: "MediCare",
        price: 18.99,
        rating: 4.7,
        reviews: 145,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 8,
        name: "Multivitamin Complex",
        category: "Vitamins",
        manufacturer: "VitaLife",
        price: 22.99,
        originalPrice: 29.99,
        rating: 4.8,
        reviews: 412,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 9,
        name: "Calcium Tablets 500mg",
        category: "Vitamins",
        manufacturer: "VitaLife",
        price: 12.99,
        rating: 4.3,
        reviews: 167,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 10,
        name: "Azithromycin 250mg",
        category: "Antibiotics",
        manufacturer: "PharmaCorp",
        price: 28.99,
        originalPrice: 34.99,
        rating: 4.9,
        reviews: 92,
        inStock: true,
        image: "/test.webp",
    },
];

export default function CategoryDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = React.use(params);
    const category = CATEGORIES[slug as CategorySlug];

    const [searchQuery, setSearchQuery] = React.useState("");

    // Filter medicines that belong to this category's subcategories
    const categoryProducts = React.useMemo(() => {
        if (!category) return [];
        return MOCK_MEDICINES.filter((m) =>
            category.subcategories.includes(m.category as never)
        );
    }, [category]);

    // Apply search on top of category filter
    const filteredProducts = React.useMemo(() => {
        if (!searchQuery) return categoryProducts;
        const q = searchQuery.toLowerCase();
        return categoryProducts.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.category.toLowerCase().includes(q)
        );
    }, [categoryProducts, searchQuery]);

    // Invalid slug
    if (!category) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="mb-2 text-2xl font-bold">Category Not Found</h2>
                <p className="mb-6 text-muted-foreground">
                    This category does not exist or has been removed.
                </p>
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Categories
                </Link>
            </div>
        );
    }

    const Icon = category.icon;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Link */}
            <Link
                href="/categories"
                className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Categories
            </Link>

            {/* Category Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                    <p className="text-muted-foreground">{category.description}</p>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={`Search in ${category.name}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Results count */}
            <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 rounded-full bg-muted p-6">
                        <Search className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">No products found</h3>
                    <p className="max-w-md text-sm text-muted-foreground">
                        {searchQuery
                            ? "No products match your search. Try different keywords."
                            : "This category has no products yet. Check back soon."}
                    </p>
                </div>
            )}
        </div>
    );
}
